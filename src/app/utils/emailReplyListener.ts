import Imap from "imap-simple";
import { simpleParser } from "mailparser";
import { email_model } from "../modules/email/email.schema";

/* ---------------------------------------------------
   CLEAN EMAIL BODY
--------------------------------------------------- */
function cleanBody(mail: any) {
  let body = mail.text?.trim() || "";

  if (!body && mail.html) {
    body = mail.html.replace(/<[^>]+>/g, "").trim();
  }

  body = body.split("\nOn ").shift()?.trim() || body;
  body = body.replace(/^>.*$/gm, "").trim();

  return body;
}

/* ---------------------------------------------------
   SKIP SOCIAL / PROMO MAILS
--------------------------------------------------- */
const BLOCKED_SENDERS = [
  "noreply",
  "no-reply",
  "donotreply",
  "notification",
  "notifications",
  "facebookmail",
  "linkedin",
  "instagram",
  "twitter",
  "x.com",
  "amazonses",
];

function isBlockedAddress(email: string) {
  const lower = email?.toLowerCase() || "";
  return BLOCKED_SENDERS.some((x) => lower.includes(x));
}

/* ---------------------------------------------------
   IMAP CONFIG
--------------------------------------------------- */
const getImapConfig = () => ({
  imap: {
    user: process.env.IMAP_EMAIL,
    password: process.env.IMAP_PASSWORD,
    host: process.env.IMAP_HOST || "imap.gmail.com",
    port: Number(process.env.IMAP_PORT) || 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 3000,
  },
});

/* ---------------------------------------------------
   ** MAIN FUNCTION — STRICT REPLY-ONLY MODE **
--------------------------------------------------- */
export const startEmailReplyListener = async () => {
  console.log("🚀 Starting Email Listener… (REPLY ONLY MODE)");

  /* CONNECT TO INBOX */
  const inbox = await Imap.connect(getImapConfig());
  await inbox.openBox("INBOX");
  console.log("📥 INBOX Ready");

  /* ==================================================
        PROCESS CLIENT EMAILS (REPLY ONLY)
  ================================================== */
  const processInbox = async () => {
    const messages = await inbox.search(["UNSEEN"], {
      bodies: ["HEADER", ""],
      markSeen: true,
    });

    if (!messages.length) return;

    for (const msg of messages) {
      try {
        const body = msg.parts.find((p: any) => p.which === "")?.body;
        if (!body) continue;

        const mail = await simpleParser(body);

        const from = mail.from?.value?.[0]?.address?.toLowerCase();
        if (!from) continue;

        /** ❌ Block promotional / social emails */
        if (isBlockedAddress(from)) continue;

        const subject = (mail.subject || "").replace(/^(Re:|Fwd:)/i, "").trim();
        const text = cleanBody(mail);

        console.log("📩 INCOMING MAIL FROM:", from);

        /* ---------------------------------------------------
           STRICT RULE 1:
           CHECK IF THIS SENDER EXISTS IN ANY THREAD
        --------------------------------------------------- */
        const senderThreadExists = await email_model.findOne({
          replyTo: from,
        });

        if (!senderThreadExists) {
          console.log("⛔ SKIPPED: Sender not found in DB →", from);
          continue; // DO NOT SAVE
        }

        /* ---------------------------------------------------
           STRICT RULE 2:
           MATCH EXACT THREAD BY subject OR messageId
        --------------------------------------------------- */
        let thread = await email_model.findOne({
          replyTo: from,
          subject,
        });

        if (!thread && mail.inReplyTo) {
          thread = await email_model.findOne({
            messageId: mail.inReplyTo,
          });
        }

        if (!thread) {
          console.log("⛔ SKIPPED: No matching thread →", subject);
          continue; // DO NOT SAVE
        }

        /* ---------------------------------------------------
           SAVE REPLY ONLY
        --------------------------------------------------- */

        if (!Array.isArray(thread.replies)) {
          thread.replies = [];
        }

        thread.replies.push({
          message: text,
          sentBy: "client",
          sentAt: new Date(),
        });

        await thread.save();

        console.log("💬 SAVED CLIENT REPLY → THREAD:", thread._id);
      } catch (e: any) {
        console.log("❌ INBOX error:", e.message);
      }
    }
  };

  /* LISTEN NEW MAIL EVENT */
  inbox.on("mail", async () => {
    console.log("🔔 INBOX new mail");
    await processInbox();
  });

  // Initial run
  await processInbox();

  console.log("✅ Email Listener ACTIVE (ONLY THREAD REPLIES SAVED)");
};
