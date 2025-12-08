// import dayjs from "dayjs";
// import transporter from "../../utils/nodemailer";
// import { T_Email } from "./email.interface";
// import { email_model } from "./email.schema";
// import { booking_model } from "../booking/booking.schema";
// import { reviews_model } from "../reviews/reviews.schema";
// import { analytics_service } from "../analytics/analytics.service";
// import { User_Model } from "../user/user.schema";

// const create_new_email_into_db = async ({
//   to,
//   subject,
//   text,
//   fullName,
//   replyTo,
// }: T_Email) => {
//   try {
//     // Save email to database
//     const savedEmail = await email_model.create({
//       to,
//       subject,
//       text,
//       replyTo,
//       fullName,
//       replies: [],
//       read: false,
//     });
//     if (savedEmail) {
//       // Send email

//       const admin: any = await User_Model.findOne(); // Only 1 user exists
//       if (admin?.notificationPreferences?.chatNotifications === true) {
//         // Send email via SendGrid SMTP
//         await transporter.sendMail({
//           from: process.env.FROM_EMAIL, // verified sender email
//           to,
//           subject,
//           text, // fallback plain text
//           replyTo, // client email
//           html: `
// <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">

//   <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">

//     <!-- Header -->
//     <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 18px 25px; color: white;">
//       <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Message Received</h2>
//     </div>

//     <!-- Body -->
//     <div style="padding: 25px; color: #333333; font-size: 16px; line-height: 1.7;">
//       <p>Hello,</p>

//       <p style="white-space: pre-line;">${text}</p>

//       <p style="margin-top: 24px;">Best regards,<br/>
//       <strong>${fullName}</strong></p>
//     </div>

//     <!-- Footer -->
//     <div style="background: #f1f5f9; padding: 18px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
//       <p style="margin: 0;">This email was sent via <strong>Robyn Bartholom</strong>.</p>
//       <p style="margin: 4px 0 0;">Replies will go to: <strong>${replyTo}</strong></p>
//     </div>

//   </div>

// </div>
// `,
//         });
//       }
//     }
//     return {
//       success: true,
//       provider: "sendgrid-smtp",
//       data: savedEmail,
//     };
//   } catch (err: any) {
//     console.error("❌ Email sending error:", err.message);
//     throw new Error(err.message || "Email sending failed");
//   }
// };
// // create replay email function
// const create_reply_in_db = async (emailId: string, replyMessage: string) => {
//   try {
//     // 1. Find email from database
//     const existingEmail = await email_model.findById(emailId);

//     if (!existingEmail) {
//       throw new Error("Email not found");
//     }

//     const userEmail = existingEmail.replyTo; // user email (client)
//     const originalSubject = existingEmail.subject;

//     // client full name
//     const firstName = process.env.APP_USER_FIRSTNAME || "";
//     const lastName = process.env.APP_USER_LASTNAME || " ";

//     const fullName = `${firstName} ${lastName}`.trim();
//     // 2. Send reply email to the client
//     const info = await transporter.sendMail({
//       from: process.env.FROM_EMAIL,
//       to: userEmail,
//       subject: `Re: ${originalSubject}`,
//       text: replyMessage,
//       replyTo: process.env.FROM_EMAIL,
//       html: `
// <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">

//   <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">

//     <!-- Header -->
//     <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 18px 25px; color: white;">
//       <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Response from ${fullName}</h2>
//     </div>

//     <!-- Body -->
//     <div style="padding: 25px; color: #333333; font-size: 16px; line-height: 1.7;">
//       <p>Hello,</p>

//       <p style="white-space: pre-line;">${replyMessage}</p>

//       <p style="margin-top: 24px;">Best regards,<br/>
//       <strong>${fullName}</strong></p>
//     </div>

//     <!-- Footer -->
//     <div style="background: #f1f5f9; padding: 18px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
//       <p style="margin: 0;">You are receiving a reply from <strong>${fullName}</strong>.</p>
//     </div>

//   </div>

// </div>
// `,
//     });

//     console.log("✔ Reply email sent:", info.response);

//     // 3. Push reply into replies array
//     existingEmail.replies!.push({
//       message: replyMessage,
//       sentBy: "admin",
//       sentAt: new Date(),
//     });

//     // 4. Save updated email doc
//     await existingEmail.save();

//     return {
//       success: true,
//       provider: "sendgrid-smtp",
//       responseId: info.messageId,
//       status: info.response,
//       data: existingEmail,
//     };
//   } catch (err: any) {
//     console.error("❌ Reply sending error:", err.message);
//     throw new Error(err.message || "Reply sending failed");
//   }
// };

// //
// const get_all_emails_from_db = async (
//   search?: string,

//   limit?: number
// ) => {
//   let query: any = {};

//   if (search) {
//     // ✅ Remove extra white spaces & make case-insensitive regex
//     const cleanedSearch = search.trim().replace(/\s+/g, " ");
//     query = {
//       $or: [
//         { subject: { $regex: cleanedSearch, $options: "i" } },
//         { replyTo: { $regex: cleanedSearch, $options: "i" } },
//         { text: { $regex: cleanedSearch, $options: "i" } },
//         { fullName: { $regex: cleanedSearch, $options: "i" } },
//       ],
//     };
//   }
//   const emails = await email_model
//     .find(query)
//     .sort({ read: 1, createdAt: -1 })
//     .limit(limit || 4);
//   return {
//     meta: {
//       limit: limit || 4,
//     },
//     data: emails,
//   };
// };
// const get_email_by_id_from_db = async (id: string) => {
//   // Fetch email
//   const email = await email_model.findById(id);

//   if (!email) {
//     throw new Error("Email not found");
//   }

//   // Auto mark as read
//   if (!email.read) {
//     await email_model.updateOne({ _id: id }, { read: true });
//     email.read = true; // also update local state for response
//   }

//   return email;
// };

// // Delete email by id from db
// const delete_email_by_id_from_db = async (id: string) => {
//   const email = await email_model.findByIdAndDelete(id);
//   if (!email) {
//     throw new Error("Email not found");
//   }
//   return email;
// };

// const get_dashboard_summary_from_db = async () => {
//   // ---------- Current Values ----------
//   const totalBookings = await booking_model.countDocuments();

//   const pendingReviews = await reviews_model.countDocuments({
//     status: "pending",
//   });

//   const unreadMessages = await email_model.countDocuments({
//     read: false,
//   });

//   // ---------- Monthly Views (Method 2) ----------
//   const { thisMonthViews, lastMonthViews } =
//     await analytics_service.get_analytics_into_db();

//   const totalViews = thisMonthViews;

//   // ---------- Last Month Range ----------
//   const startOfLastMonth = dayjs()
//     .subtract(1, "month")
//     .startOf("month")
//     .toDate();

//   const endOfLastMonth = dayjs().subtract(1, "month").endOf("month").toDate();

//   // ---------- Last Month Stats ----------
//   const lastMonthBookings = await booking_model.countDocuments({
//     createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
//   });

//   const lastMonthPendingReviews = await reviews_model.countDocuments({
//     status: "pending",
//     createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
//   });

//   const lastMonthUnreadMessages = await email_model.countDocuments({
//     read: false,
//     createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
//   });

//   // ---------- Percent Calculation ----------
//   const calcChange = (current: number, last: number) => {
//     if (last === 0 && current === 0) return 0;
//     if (last === 0 && current > 0) return 100;

//     const percent = ((current - last) / last) * 100;

//     if (percent > 100) return 100;
//     if (percent < -100) return -100;

//     return Number(percent.toFixed(2));
//   };

//   return {
//     totalBookings,
//     pendingReviews,
//     unreadMessages,
//     totalViews,

//     statsChange: {
//       bookings: calcChange(totalBookings, lastMonthBookings),
//       reviews: calcChange(pendingReviews, lastMonthPendingReviews),
//       unread: calcChange(unreadMessages, lastMonthUnreadMessages),
//       views: calcChange(thisMonthViews, lastMonthViews),
//     },
//   };
// };

// export const email_service = {
//   create_new_email_into_db,
//   get_all_emails_from_db,
//   create_reply_in_db,
//   get_email_by_id_from_db,
//   delete_email_by_id_from_db,
//   get_dashboard_summary_from_db,
// };

import dayjs from "dayjs";
import transporter from "../../utils/nodemailer"; // NOT USED but untouched (as you said)
import { T_Email } from "./email.interface";
import { email_model } from "./email.schema";
import { booking_model } from "../booking/booking.schema";
import { reviews_model } from "../reviews/reviews.schema";
import { analytics_service } from "../analytics/analytics.service";
import { User_Model } from "../user/user.schema";
import { sgMail } from "../../configs/emailConfig";

// ======================================================
// SendGrid Email Sender (safe, fast, non-blocking)
// ======================================================
const sendWithSendGrid = async ({ to, subject, text, html, replyTo }: any) => {
  return await sgMail.send({
    to,
    from: process.env.FROM_EMAIL!,
    subject,
    text,
    html,
    replyTo,
  });
};

// ======================================================
// Create New Email
// ======================================================
const create_new_email_into_db = async ({
  to,
  subject,
  text,
  fullName,
  replyTo,
}: T_Email) => {
  try {
    // Save to DB
    const savedEmail = await email_model.create({
      to,
      subject,
      text,
      replyTo,
      fullName,
      replies: [],
      read: false,
    });

    if (savedEmail) {
      // Check admin notifications
      const admin: any = await User_Model.findOne();

      if (admin?.notificationPreferences?.chatNotifications === true) {
        // 👉 Replaced transporter.sendMail with SendGrid API
        await sendWithSendGrid({
          to,
          subject,
          text,
          replyTo,
          html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">
  
  <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
    
    <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 18px 25px; color: white;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Message Received</h2>
    </div>

    <div style="padding: 25px; color: #333333; font-size: 16px; line-height: 1.7;">
      <p>Hello,</p>
      <p style="white-space: pre-line;">${text}</p>
      <p style="margin-top: 24px;">Best regards,<br/><strong>${fullName}</strong></p>
    </div>

    <div style="background: #f1f5f9; padding: 18px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">This email was sent via <strong>Robyn Bartholom</strong>.</p>
      <p style="margin: 4px 0 0;">Replies will go to: <strong>${replyTo}</strong></p>
    </div>

  </div>

</div>
`,
        });
      }
    }

    return {
      success: true,
      provider: "sendgrid-api",
      data: savedEmail,
    };
  } catch (err: any) {
    console.error("❌ Email sending error:", err.message);
    throw new Error(err.message || "Email sending failed");
  }
};

// ======================================================
// Create Reply
// ======================================================
const create_reply_in_db = async (emailId: string, replyMessage: string) => {
  try {
    const existingEmail = await email_model.findById(emailId);

    if (!existingEmail) {
      throw new Error("Email not found");
    }

    const userEmail = existingEmail.replyTo;
    const originalSubject = existingEmail.subject;

    const firstName = process.env.APP_USER_FIRSTNAME || "";
    const lastName = process.env.APP_USER_LASTNAME || "";
    const fullName = `${firstName} ${lastName}`.trim();

    // 👉 Replace transporter with SendGrid API
    const info = await sendWithSendGrid({
      to: userEmail,
      subject: `Re: ${originalSubject}`,
      text: replyMessage,
      replyTo: process.env.FROM_EMAIL,
      html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">
  
  <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
    
    <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 18px 25px; color: white;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Response from ${fullName}</h2>
    </div>

    <div style="padding: 25px; color: #333333; font-size: 16px; line-height: 1.7;">
      <p>Hello,</p>
      <p style="white-space: pre-line;">${replyMessage}</p>
      <p style="margin-top: 24px;">Best regards,<br/><strong>${fullName}</strong></p>
    </div>

    <div style="background: #f1f5f9; padding: 18px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">You are receiving a reply from <strong>${fullName}</strong>.</p>
    </div>

  </div>

</div>
`,
    });

    // Save reply inside DB
    existingEmail.replies!.push({
      message: replyMessage,
      sentBy: "admin",
      sentAt: new Date(),
    });

    await existingEmail.save();

    return {
      success: true,
      provider: "sendgrid-api",
      data: existingEmail,
    };
  } catch (err: any) {
    console.error("❌ Reply sending error:", err.message);
    throw new Error(err.message || "Reply sending failed");
  }
};

// ======================================================
// Remaining services unchanged
// ======================================================
const get_all_emails_from_db = async (search?: string, limit?: number) => {
  let query: any = {};

  if (search) {
    const cleanedSearch = search.trim().replace(/\s+/g, " ");
    query = {
      $or: [
        { subject: { $regex: cleanedSearch, $options: "i" } },
        { replyTo: { $regex: cleanedSearch, $options: "i" } },
        { text: { $regex: cleanedSearch, $options: "i" } },
        { fullName: { $regex: cleanedSearch, $options: "i" } },
      ],
    };
  }

  const emails = await email_model
    .find(query)
    .sort({ read: 1, createdAt: -1 })
    .limit(limit || 4);

  return {
    meta: {
      limit: limit || 4,
    },
    data: emails,
  };
};

const get_email_by_id_from_db = async (id: string) => {
  const email = await email_model.findById(id);

  if (!email) {
    throw new Error("Email not found");
  }

  if (!email.read) {
    await email_model.updateOne({ _id: id }, { read: true });
    email.read = true;
  }

  return email;
};

const delete_email_by_id_from_db = async (id: string) => {
  const email = await email_model.findByIdAndDelete(id);
  if (!email) throw new Error("Email not found");
  return email;
};

const get_dashboard_summary_from_db = async () => {
  const totalBookings = await booking_model.countDocuments();
  const pendingReviews = await reviews_model.countDocuments({
    status: "pending",
  });
  const unreadMessages = await email_model.countDocuments({ read: false });

  const { thisMonthViews, lastMonthViews } =
    await analytics_service.get_analytics_into_db();

  const totalViews = thisMonthViews;

  const startOfLastMonth = dayjs()
    .subtract(1, "month")
    .startOf("month")
    .toDate();
  const endOfLastMonth = dayjs().subtract(1, "month").endOf("month").toDate();

  const lastMonthBookings = await booking_model.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
  });

  const lastMonthPendingReviews = await reviews_model.countDocuments({
    status: "pending",
    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
  });

  const lastMonthUnreadMessages = await email_model.countDocuments({
    read: false,
    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
  });

  const calcChange = (current: number, last: number) => {
    if (last === 0 && current === 0) return 0;
    if (last === 0 && current > 0) return 100;

    const percent = ((current - last) / last) * 100;

    if (percent > 100) return 100;
    if (percent < -100) return -100;

    return Number(percent.toFixed(2));
  };

  return {
    totalBookings,
    pendingReviews,
    unreadMessages,
    totalViews,
    statsChange: {
      bookings: calcChange(totalBookings, lastMonthBookings),
      reviews: calcChange(pendingReviews, lastMonthPendingReviews),
      unread: calcChange(unreadMessages, lastMonthUnreadMessages),
      views: calcChange(thisMonthViews, lastMonthViews),
    },
  };
};

export const email_service = {
  create_new_email_into_db,
  get_all_emails_from_db,
  create_reply_in_db,
  get_email_by_id_from_db,
  delete_email_by_id_from_db,
  get_dashboard_summary_from_db,
};
