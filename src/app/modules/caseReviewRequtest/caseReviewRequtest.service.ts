// import transporter from "../../utils/nodemailer";

import { FROM_EMAIL, sgMail } from "../../configs/emailConfig";

// export const send_case_review_request_email = async (payload: any) => {
//   const {
//     attorneyName,
//     firm,
//     email,
//     phone,
//     caseType,
//     retainerInterest,
//     briefCaseSummary,

//     documents = [],
//   } = payload;
//   if (!process.env.CLIENT_EMAIL) {
//     throw new Error("CLIENT_EMAIL missing in .env");
//   }

//   // -----------------------------------------------------
//   // ⭐ Convert Cloudinary URLs → Safe View Mode (PDF/Docs)
//   // -----------------------------------------------------
//   const attachments = documents.map((fileUrl: string) => {
//     // Cloudinary direct-view URL (instead of forced download)
//     const viewUrl = fileUrl.replace("/upload/", "/upload/fl_attachment:false/");

//     return {
//       filename: fileUrl.split("/").pop(),
//       path: viewUrl, // ⭐ Gmail/Outlook will OPEN the file, not download it
//     };
//   });

//   // -----------------------------------------------------
//   // ⭐ Send Email
//   // -----------------------------------------------------
//   const info = await transporter.sendMail({
//     from: `"Robyn Law Office" <${process.env.CLIENT_EMAIL}>`,
//     to: process.env.CLIENT_EMAIL,
//     replyTo: email,
//     subject: `New Case Review Request – ${attorneyName}`,

//     text: `
// New Case Review Request:

// Attorney Name: ${attorneyName}
// Firm: ${firm}
// Email: ${email}
// Phone: ${phone}

// Case Type: ${caseType}
// Retainer Interest: ${retainerInterest}

// Summary:
// ${briefCaseSummary}

// Documents: ${documents.length} attached.
//     `,

//     html: `
//       <h2>New Case Review Request</h2>
//       <p><strong>Name:</strong> ${attorneyName}</p>
//       <p><strong>Firm:</strong> ${firm}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone}</p>
//       <p><strong>Case Type:</strong> ${caseType}</p>
//       <p><strong>Retainer Interest:</strong> ${retainerInterest}</p>

//       <h3>Case Summary:</h3>
//       <p>${briefCaseSummary}</p>

//       <h4>Uploaded Documents (${documents.length})</h4>
//       <ul>
//         ${documents
//           .map(
//             (file: string) =>
//               `<li><a href="${file.replace(
//                 "/upload/",
//                 "/upload/fl_attachment:false/"
//               )}" target="_blank">View File</a></li>`
//           )
//           .join("")}
//       </ul>
//     `,

//     attachments,
//   });

//   return {
//     success: true,
//     message: "Email sent to admin successfully!",
//     messageId: info.messageId,
//   };
// };

// export const case_review_requtest_service = {
//   send_case_review_request_email,
// };

export const send_case_review_request_email = async (payload: any) => {
  const {
    attorneyName = "",
    firm = "",
    email = "",
    phone = "",
    caseType = "",
    retainerInterest = "",
    briefCaseSummary = "",
    documents = [],
  } = payload;

  if (!process.env.CLIENT_EMAIL) {
    throw new Error("CLIENT_EMAIL is missing in .env");
  }

  // --------------------------------------------------------------------
  // ⭐ Convert Cloudinary URLs to Preview Mode (No Forced Download)
  // --------------------------------------------------------------------
  const previewDocuments = (documents as string[]).map((url: string) =>
    url.replace("/upload/", "/upload/fl_attachment:false/")
  );

  // --------------------------------------------------------------------
  // ⭐ HTML EMAIL TEMPLATE
  // --------------------------------------------------------------------
  const htmlBody = `
    <h2>New Case Review Request</h2>

    <p><strong>Name:</strong> ${attorneyName}</p>
    <p><strong>Firm:</strong> ${firm}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>

    <p><strong>Case Type:</strong> ${caseType}</p>
    <p><strong>Retainer Interest:</strong> ${retainerInterest}</p>

    <h3>Case Summary</h3>
    <p>${briefCaseSummary}</p>

    <h3>Uploaded Documents (${documents.length})</h3>
    <ul>
      ${previewDocuments
        .map(
          (file: string) =>
            `<li><a href="${file}" target="_blank">View File</a></li>`
        )
        .join("")}
    </ul>
  `;

  // --------------------------------------------------------------------
  // ⭐ TEXT VERSION FOR SAFETY / SPAM FILTERS
  // --------------------------------------------------------------------
  const textBody = `
New Case Review Request

Name: ${attorneyName}
Firm: ${firm}
Email: ${email}
Phone: ${phone}

Case Type: ${caseType}
Retainer Interest: ${retainerInterest}

Summary:
${briefCaseSummary}

Documents: ${documents.length} file(s)
`;

  // --------------------------------------------------------------------
  // ⭐ SENDGRID API PAYLOAD
  // --------------------------------------------------------------------
  const msg = {
    to: process.env.CLIENT_EMAIL,
    from: FROM_EMAIL || process.env.CLIENT_EMAIL,
    replyTo: email,
    subject: `New Case Review Request – ${attorneyName || "Client"}`,
    text: textBody,
    html: htmlBody,
  };

  // --------------------------------------------------------------------
  // ⭐ EXECUTE SENDGRID SEND REQUEST
  // --------------------------------------------------------------------
  try {
    await sgMail.send(msg);

    return {
      success: true,
      message: "Case review email sent successfully!",
    };
  } catch (error: any) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);

    return {
      success: false,
      message: "Failed to send email",
      error: error.response?.body || error.message,
    };
  }
};

export const case_review_requtest_service = {
  send_case_review_request_email,
};
