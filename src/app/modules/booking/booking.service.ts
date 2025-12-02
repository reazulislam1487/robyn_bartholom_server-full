import dayjs from "dayjs";
import { booking_model } from "./booking.schema";
import { User_Model } from "../user/user.schema";
import transporter from "../../utils/nodemailer";

// Create new Booking
const create_new_booking_into_db = async (bookingData: any) => {
  const data = bookingData.body;

  // Combine date + time
  const combinedDateTimeString = `${data.preferredDate} ${data.preferredTime}`;
  const formattedDateTime = new Date(combinedDateTimeString);

  const dataToSave = {
    ...data,
    preferredDate: formattedDateTime,
  };

  const result = await booking_model.create(dataToSave);

  // 🔔 Notification Logic

  if (result) {
    const admin: any = await User_Model.findOne(); // Only 1 user exists

    if (admin?.notificationPreferences?.bookingNotifications === true) {
      const adminEmail = admin.email;

      // Send email
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: adminEmail,
          subject: `New Booking from ${data.fullName}`,
          replyTo: data.email,
          text: data.additionalInfo || "New booking request received.",

          html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px;">

  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 20px; color: white;">
      <h2 style="margin: 0; font-size: 20px;">New Booking Received</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px; color: #333; font-size: 15px; line-height: 1.6;">
      <p>Hello Robyn,</p>

      <p>You have received a new booking request. Here are the details:</p>

      <div style="margin-top: 12px;">
        <p><strong>Client Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Consultation Type:</strong> ${data.consultationType}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        <p><strong>Additional Info:</strong><br/> ${
          data.additionalInfo || "No additional info provided."
        }</p>
      </div>

      <p style="margin-top: 25px;">Best regards,<br><strong>Robyn Bartholom Website</strong></p>
    </div>

    <!-- Footer -->
    <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">Reply will go directly to: <strong>${
        data.email
      }</strong></p>
    </div>

  </div>

</div>
`,
        });
      } catch (error) {
        console.error("❌ Email send failed:", error);
      }
    }
  }

  return result;
};

//  Get all Bookings
// const get_all_booking_from_db = async (
//   status?: "pending" | "approved" | "rejected",
//   search?: string,
//   page?: number,
//   limit?: number
// ) => {
//   let query: any = {};
//   // Filter by status if provided
//   if (status) {
//     query.status = status;
//   }

//   // Pagination logic
//   const pageNumber = page || 1;
//   const limitNumber = limit || 10;
//   const skip = (pageNumber - 1) * limitNumber;
//   // Search by fullName, company, or consultationType

//   if (search) {
//     // ✅ Remove extra white spaces & make case-insensitive regex
//     const cleanedSearch = search.trim().replace(/\s+/g, " ");
//     query = {
//       $or: [
//         { fullName: { $regex: cleanedSearch, $options: "i" } },
//         { company: { $regex: cleanedSearch, $options: "i" } },
//         { consultationType: { $regex: cleanedSearch, $options: "i" } },
//       ],
//     };
//   }
//   const result = await booking_model
//     .find(query)
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limitNumber);
//   // Total count for frontend
//   const totalDocuments = await booking_model.countDocuments(query);
//   const totalPages = Math.ceil(totalDocuments / limitNumber);

//   return {
//     meta: {
//       totalDocuments,
//       totalPages,
//       currentPage: pageNumber,
//       limit: limitNumber,
//     },
//     data: result,
//   };
// };
const get_all_booking_from_db = async (
  status?: "pending" | "approved" | "rejected",
  search?: string,
  page?: number,
  limit?: number
) => {
  let query: any = {};

  // -----------------------------
  // Filter by status
  // -----------------------------
  if (status) {
    query.status = status;
  }

  // -----------------------------
  // Search filter
  // -----------------------------
  if (search) {
    const cleanedSearch = search.trim().replace(/\s+/g, " ");

    query.$or = [
      { fullName: { $regex: cleanedSearch, $options: "i" } },
      { company: { $regex: cleanedSearch, $options: "i" } },
      { consultationType: { $regex: cleanedSearch, $options: "i" } },
    ];
  }

  // -----------------------------
  // Pagination
  // -----------------------------
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  // -----------------------------
  // Database Query
  // -----------------------------
  const result = await booking_model
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  const totalDocuments = await booking_model.countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / limitNumber);

  return {
    meta: {
      totalDocuments,
      totalPages,
      currentPage: pageNumber,
      limit: limitNumber,
    },
    data: result,
  };
};

//  Get recent Bookings
const get_recent_booking_from_db = async () => {
  const result = await booking_model
    .find()
    .limit(4)
    .sort({ preferredDate: -1 }); // 1 = ascending (earliest first); // 1 = ASC, -1 = DESC;
  return result;
};
// Get booking by ID
const get_booking_by_id_from_db = async (bookingId: string) => {
  const booking = await booking_model.findById(bookingId);
  if (!booking) throw new Error("Booking not found");
  return booking;
};
// Update booking status (pending → accepted | rejected | completed)
const update_booking_status_from_db = async (
  bookingId: string,
  status: "accepted" | "decline" | "completed"
) => {
  const booking = await booking_model.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  booking.status = status;
  return await booking.save();
};
// Delete booking by ID
const delete_booking_by_id_from_db = async (bookingId: string) => {
  const booking = await booking_model.findByIdAndDelete(bookingId);
  if (!booking) throw new Error("Booking not found");
  return booking;
};

const get_booking_trends_from_db = async () => {
  const currentYear = dayjs().year();

  const trends = await booking_model.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.month": 1 } },
  ]);

  // Create empty array for all 12 months
  const monthlyData = Array(12).fill(0);

  // Fill actual months
  trends.forEach((item) => {
    const monthIndex = item._id.month - 1; // convert to 0-index
    monthlyData[monthIndex] = item.count;
  });

  return monthlyData; // ➜ perfect for frontend chart
};

// Get distinct consultation types
const get_booking_consultation_types_from_db = async () => {
  const result = await booking_model.aggregate([
    {
      $group: {
        _id: "$consultationType",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Total bookings in all categories
  const total = result.reduce((sum, item) => sum + item.count, 0);

  const formatted: any = {};

  result.forEach((item) => {
    const percent = (item.count / total) * 100;
    formatted[item._id] = `${percent.toFixed(0)}%`; // Rounded like UI
  });

  return formatted;
};

export const booking_service = {
  create_new_booking_into_db,
  get_all_booking_from_db,
  get_recent_booking_from_db,
  get_booking_by_id_from_db,
  update_booking_status_from_db,
  delete_booking_by_id_from_db,
  get_booking_trends_from_db,
  get_booking_consultation_types_from_db,
};
