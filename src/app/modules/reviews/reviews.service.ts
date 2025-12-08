import transporter from "../../utils/nodemailer";
import { User_Model } from "../user/user.schema";
import { reviews_model } from "./reviews.schema";

// const create_new_reviews_into_db = async (reviewData: any) => {
//   const { rating } = reviewData;
//   const data = reviewData;

//   if (!rating || rating < 1 || rating > 5) {
//     throw new Error("Rating must be between 1 and 5");
//   }

//   const result = await reviews_model.create(reviewData);

//   // 🔔 Notification Logic
//   if (result) {
//     const admin: any = await User_Model.findOne(); // Only 1 admin exists

//     if (admin?.notificationPreferences?.reviewNotifications === true) {
//       const adminEmail = admin.email;

//       try {
//         await transporter.sendMail({
//           from: process.env.FROM_EMAIL,
//           to: adminEmail,
//           subject: `New Review from ${data.name}`,
//           replyTo: data.email,
//           text: data.yourReview || "New Review request received.",

//           html: `
// <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px;">
//   <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

//     <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 20px; color: white;">
//       <h2 style="margin: 0; font-size: 20px;">New Review Received</h2>
//     </div>

//     <div style="padding: 25px; color: #333; font-size: 15px; line-height: 1.6;">
//       <p>Hello Robyn,</p>

//       <p>You have received a new review request. Here are the details:</p>

//       <div style="margin-top: 12px;">
//         <p><strong>Client Name:</strong> ${data.name}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Role:</strong> ${data.role || "Viewer"}</p>
//         <p><strong>Rating:</strong> ${data.rating}</p>
//         <p><strong>Additional Info:</strong><br/> ${
//           data.yourReview?.trim() || "No additional info provided."
//         }</p>
//       </div>

//       <p style="margin-top: 25px;">Best regards,<br>
//         <strong>Robyn Bartholom Website</strong>
//       </p>
//     </div>

//     <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
//       <p style="margin: 0;">Reply will go directly to: <strong>${
//         data.email
//       }</strong></p>
//     </div>

//   </div>
// </div>
// `,
//         });
//       } catch (error) {
//         console.error(" Email send failed:", error);
//       }
//     }
//   }

//   return result;
// };
// Get all reviews by status

const create_new_reviews_into_db = async (reviewData: any) => {
  const { rating } = reviewData;
  const data = reviewData;

  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const result = await reviews_model.create(reviewData);

  // 🔔 Notification Logic
  if (result) {
    const admin: any = await User_Model.findOne();

    if (admin?.notificationPreferences?.reviewNotifications === true) {
      const adminEmail = admin.email;

      try {
        // ===============================
        // TRY SENĐ VIA NODEMAILER (SMTP)
        // ===============================
        await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: adminEmail,
          subject: `New Review from ${data.name}`,
          replyTo: data.email,
          text: data.yourReview || "New Review request received.",
          html: buildHtmlTemplate(data),
        });
      } catch (smtpErr) {
        console.error("SMTP failed → switching to SendGrid API");

        // =======================================
        // IF SMTP FAILS → SENDGRID API FALLBACK
        // =======================================
        await sgMail.send({
          to: adminEmail,
          from: process.env.FROM_EMAIL,
          subject: `New Review from ${data.name}`,
          replyTo: data.email,
          text: data.yourReview,
          html: buildHtmlTemplate(data),
        });
      }
    }
  }

  return result;
};

// 🔧 Extracted template builder to avoid duplication
function buildHtmlTemplate(data: any) {
  return `
  ... (YOUR SAME HTML TEMPLATE GOES HERE — unchanged) ...
  `;
}

const get_all_reviews_from_db = async (
  status?: "pending" | "approved" | "rejected",
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  const query: any = {};

  /* ---------------------
     ✅ Filter by status
  --------------------- */
  if (status) {
    query.status = status;
  }

  /* ---------------------
     🔍 Search by fields
  --------------------- */
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
      { yourReview: { $regex: search, $options: "i" } },
    ];
  }

  /* ---------------------
     🧮 Pagination Math
  --------------------- */
  const skip = (page - 1) * limit;

  /* ---------------------
     📌 Fetch Data
  --------------------- */
  const data = await reviews_model
    .find(query)
    .sort({ createDate: -1 })
    .skip(skip)
    .limit(limit);

  /* ---------------------
     📊 Count Documents
  --------------------- */
  const total = await reviews_model.countDocuments(query);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Update review status by ID
const update_reviews_status_in_db = async (
  id: string,
  status: "approved" | "rejected" | "deleted"
) => {
  if (status === "deleted") {
    const result = await reviews_model.findByIdAndDelete(id);
    return result;
  }
  const result = await reviews_model.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return result;
};

// Get review by ID
const get_review_by_id_from_db = async (id: string) => {
  const result = await reviews_model.findById(id);
  return result;
};

export const reviews_service = {
  create_new_reviews_into_db,
  get_all_reviews_from_db,
  update_reviews_status_in_db,
  get_review_by_id_from_db,
};

//
