"use strict";
// import Imap from "imap-simple";
// import { simpleParser } from "mailparser";
// import { email_model } from "../modules/email/email.schema";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailReplyListener = void 0;
// /* ---------------------------------------------------
//    CLEAN EMAIL BODY
// --------------------------------------------------- */
// function cleanBody(mail: any) {
//   let body = mail.text?.trim() || "";
//   if (!body && mail.html)
//     body = mail.html.replace(/<[^>]+>/g, "").trim();
//   body = body.split("\nOn ").shift()?.trim() || body;
//   body = body.replace(/^>.*$/gm, "").trim();
//   return body;
// }
// /* ---------------------------------------------------
//    SKIP social / promo mails
// --------------------------------------------------- */
// const BLOCKED_SENDERS = [
//   "noreply",
//   "no-reply",
//   "donotreply",
//   "notification",
//   "notifications",
//   "facebookmail",
//   "linkedin",
//   "instagram",
//   "twitter",
//   "x.com",
//   "amazonses"
// ];
// function isBlockedAddress(email: string) {
//   const lower = email?.toLowerCase() || "";
//   return BLOCKED_SENDERS.some(x => lower.includes(x));
// }
// /* ---------------------------------------------------
//    IMAP CONFIG
// --------------------------------------------------- */
// const getImapConfig = () => ({
//   imap: {
//     user: process.env.IMAP_EMAIL,
//     password: process.env.IMAP_PASSWORD,
//     host: process.env.IMAP_HOST || "imap.gmail.com",
//     port: Number(process.env.IMAP_PORT) || 993,
//     tls: true,
//     tlsOptions: { rejectUnauthorized: false },
//     authTimeout: 2000,
//   },
// });
// /* ---------------------------------------------------
//    DETECT SENT MAILBOX
// --------------------------------------------------- */
// async function detectSentFolder(imap: any) {
//   const boxes = await imap.getBoxes();
//   const search = (tree: any, prefix = ""): string | null => {
//     for (const box in tree) {
//       const full = prefix ? `${prefix}/${box}` : box;
//       if (/sent/i.test(box)) return full;
//       if (tree[box].children) {
//         const nested = search(tree[box].children, full);
//         if (nested) return nested;
//       }
//     }
//     return null;
//   };
//   const sentFolder = search(boxes);
//   console.log("📤 SENT Folder Detected:", sentFolder || "NOT FOUND");
//   return sentFolder;
// }
// /* ---------------------------------------------------
//    MAIN FUNCTION
// --------------------------------------------------- */
// export const startEmailReplyListener = async () => {
//   console.log("🚀 Starting Email Listener…");
//   // Connect to INBOX
//   const inbox = await Imap.connect(getImapConfig());
//   await inbox.openBox("INBOX");
//   console.log("📥 INBOX Ready");
//   // Connect to SENT
//   const sent = await Imap.connect(getImapConfig());
//   const sentFolder = await detectSentFolder(sent);
//   if (sentFolder) {
//     await sent.openBox(sentFolder, true);
//     console.log("📤 SENT Ready");
//   }
//   /* ==================================================
//       PROCESS INBOX (CLIENT EMAILS)
//   ================================================== */
//   const processInbox = async () => {
//     const messages = await inbox.search(["UNSEEN"], {
//       bodies: ["HEADER", ""],
//       markSeen: true,
//     });
//     if (!messages.length) return;
//     for (const msg of messages) {
//       try {
//         const body = msg.parts.find((p:any) => p.which === "")?.body;
//         if (!body) continue;
//         const mail = await simpleParser(body);
//         const from = mail.from?.value?.[0]?.address?.toLowerCase();
//         if (!from) continue;
//         const subject = (mail.subject || "").replace(/^(Re:|Fwd:)/i, "").trim();
//         const text = cleanBody(mail);
//         // Skip social/promo
//         if (isBlockedAddress(from)) continue;
//         console.log("📩 INCOMING from:", from);
//         // FIND ORIGINAL
//         let original = await email_model.findOne({
//           subject,
//           replyTo: from,
//         });
//         if (!original && mail.inReplyTo) {
//           original = await email_model.findOne({ messageId: mail.inReplyTo });
//         }
//         if (!original) {
//           await email_model.create({
//             to: process.env.IMAP_EMAIL,
//             subject,
//             text,
//             replyTo: from,
//             fullName: mail.from?.value?.[0]?.name || "Unknown",
//             messageId: mail.messageId,
//             replies: [],
//             read: false,
//           });
//           console.log("📥 Saved NEW incoming email");
//         } else {
//           original.replies.push({
//             message: text,
//             sentBy: "client",
//             sentAt: new Date(),
//           });
//           await original.save();
//           console.log("💬 Saved CLIENT reply");
//         }
//       } catch (e: any) {
//         console.log("❌ INBOX error:", e.message);
//       }
//     }
//   };
//   /* ==================================================
//       PROCESS SENT (ADMIN EMAILS)
//       — Gmail UI reply supported
//   ================================================== */
//   let lastProcessedUid = 0;
//   const processSent = async () => {
//     if (!sentFolder) return;
//     const messages = await sent.search(["ALL"], {
//       bodies: ["HEADER", ""],
//       markSeen: false,
//     });
//     if (!messages.length) return;
//     for (const msg of messages.slice(-10)) {
//       try {
//         const uid = msg.attributes.uid;
//         if (uid <= lastProcessedUid) continue;
//         lastProcessedUid = uid;
//         const body = msg.parts.find((p:any) => p.which === "")?.body;
//         if (!body) continue;
//         const mail = await simpleParser(body);
//         const adminEmail = process.env.IMAP_EMAIL?.toLowerCase();
//         const from =
//           mail.envelope?.from?.[0]?.toLowerCase() ||
//           mail.from?.value?.[0]?.address?.toLowerCase();
//         if (from !== adminEmail) continue;
//         const to =
//           mail.envelope?.to?.[0]?.toLowerCase() ||
//           mail.to?.value?.[0]?.address?.toLowerCase();
//         if (!to || isBlockedAddress(to)) continue;
//         const rawSubject = mail.subject || "";
//         const subject = rawSubject.replace(/^(Re:|Fwd:)/i, "").trim();
//         const text = cleanBody(mail);
//         // Duplicate check
//         const exists = await email_model.findOne({
//           messageId: mail.messageId || uid.toString(),
//         });
//         if (exists) continue;
//         console.log("📤 ADMIN SENT:", subject, "→", to);
//         await email_model.create({
//           to,
//           subject,
//           text,
//           replyTo: to,
//           fullName: "Admin",
//           messageId: mail.messageId || uid.toString(),
//           replies: [],
//           read: true,
//         });
//         console.log("💾 Saved ADMIN email");
//       } catch (e: any) {
//         console.log("❌ SENT error:", e.message);
//       }
//     }
//   };
//   /* ==================================================
//       LISTENERS
//   ================================================== */
//   inbox.on("mail", async () => {
//     console.log("🔔 INBOX new mail");
//     await processInbox();
//   });
//   if (sentFolder) {
//     sent.on("mail", async () => {
//       console.log("📤 SENT new admin mail");
//       await processSent();
//     });
//     // Fallback interval every 5 sec
// setInterval(async () => {
//   console.log("⏳ SENT fallback scan…");
//   await processSent();
// }, 5000);
//   }
//   // Initial scan
//   await processInbox();
//   await processSent();
//   // Fallback interval every 5 sec
//   setInterval(async () => {
//     console.log("⏳ SENT fallback scan…");
//     await processSent();
//   }, 5000);
//   console.log("✅ Email Listener ACTIVE");
// };
const imap_simple_1 = __importDefault(require("imap-simple"));
const mailparser_1 = require("mailparser");
const email_schema_1 = require("../modules/email/email.schema");
/* ---------------------------------------------------
   CLEAN EMAIL BODY
--------------------------------------------------- */
function cleanBody(mail) {
  var _a, _b;
  let body =
    ((_a = mail.text) === null || _a === void 0 ? void 0 : _a.trim()) || "";
  if (!body && mail.html) body = mail.html.replace(/<[^>]+>/g, "").trim();
  body =
    ((_b = body.split("\nOn ").shift()) === null || _b === void 0
      ? void 0
      : _b.trim()) || body;
  body = body.replace(/^>.*$/gm, "").trim();
  return body;
}
/* ---------------------------------------------------
   SKIP social / promo mails
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
function isBlockedAddress(email) {
  const lower =
    (email === null || email === void 0 ? void 0 : email.toLowerCase()) || "";
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
    authTimeout: 2000,
  },
});
/* ---------------------------------------------------
   MAIN FUNCTION — CLIENT ONLY
--------------------------------------------------- */
const startEmailReplyListener = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀 Starting Email Listener… (CLIENT ONLY)");
    /* ==============================
       CONNECT TO INBOX (CLIENT)
    =============================== */
    const inbox = yield imap_simple_1.default.connect(getImapConfig());
    yield inbox.openBox("INBOX");
    console.log("📥 INBOX Ready");
    /* ==============================
       PROCESS CLIENT EMAILS
    =============================== */
    const processInbox = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const messages = yield inbox.search(["UNSEEN"], {
          bodies: ["HEADER", ""],
          markSeen: true,
        });
        if (!messages.length) return;
        for (const msg of messages) {
          try {
            const body =
              (_a = msg.parts.find((p) => p.which === "")) === null ||
              _a === void 0
                ? void 0
                : _a.body;
            if (!body) continue;
            const mail = yield (0, mailparser_1.simpleParser)(body);
            const from =
              (_e =
                (_d =
                  (_c =
                    (_b = mail.from) === null || _b === void 0
                      ? void 0
                      : _b.value) === null || _c === void 0
                    ? void 0
                    : _c[0]) === null || _d === void 0
                  ? void 0
                  : _d.address) === null || _e === void 0
                ? void 0
                : _e.toLowerCase();
            if (!from) continue;
            const subject = (mail.subject || "")
              .replace(/^(Re:|Fwd:)/i, "")
              .trim();
            const text = cleanBody(mail);
            // Skip unwanted mails
            if (isBlockedAddress(from)) continue;
            console.log("📩 INCOMING CLIENT MAIL:", from);
            /* FIND EXISTING THREAD */
            let original = yield email_schema_1.email_model.findOne({
              subject,
              replyTo: from,
            });
            // Also match threaded reply
            if (!original && mail.inReplyTo) {
              original = yield email_schema_1.email_model.findOne({
                messageId: mail.inReplyTo,
              });
            }
            /* SAVE NEW MAIL */
            if (!original) {
              yield email_schema_1.email_model.create({
                to: process.env.IMAP_EMAIL,
                subject,
                text,
                replyTo: from,
                fullName:
                  ((_h =
                    (_g =
                      (_f = mail.from) === null || _f === void 0
                        ? void 0
                        : _f.value) === null || _g === void 0
                      ? void 0
                      : _g[0]) === null || _h === void 0
                    ? void 0
                    : _h.name) || "Unknown",
                messageId: mail.messageId,
                replies: [],
                read: false,
              });
              console.log("📥 Saved NEW client email");
            } else {
              /* SAVE REPLY */
              // Save as reply
              if (!Array.isArray(original.replies)) {
                original.replies = [];
              }
              original.replies.push({
                message: text,
                sentBy: "client",
                sentAt: new Date(),
              });
              yield original.save();
              console.log("💬 Saved CLIENT reply");
            }
          } catch (e) {
            console.log("❌ INBOX error:", e.message);
          }
        }
      });
    /* ==============================
       INBOX EVENT LISTENER
    =============================== */
    inbox.on("mail", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        console.log("🔔 INBOX new mail");
        yield processInbox();
      })
    );
    // Initial load
    yield processInbox();
    console.log("✅ Email Listener ACTIVE — ONLY CLIENT EMAILS SAVED");
  });
exports.startEmailReplyListener = startEmailReplyListener;
