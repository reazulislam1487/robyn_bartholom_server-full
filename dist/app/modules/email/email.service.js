"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email_service = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const nodemailer_1 = __importDefault(require("../../utils/nodemailer"));
const email_schema_1 = require("./email.schema");
const booking_schema_1 = require("../booking/booking.schema");
const reviews_schema_1 = require("../reviews/reviews.schema");
const analytics_service_1 = require("../analytics/analytics.service");
const user_schema_1 = require("../user/user.schema");
const create_new_email_into_db = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text, fullName, replyTo, }) {
    var _b;
    try {
        // Save email to database
        const savedEmail = yield email_schema_1.email_model.create({
            to,
            subject,
            text,
            replyTo,
            fullName,
            replies: [],
            read: false,
        });
        if (savedEmail) {
            // Send email
            const admin = yield user_schema_1.User_Model.findOne(); // Only 1 user exists
            if (((_b = admin === null || admin === void 0 ? void 0 : admin.notificationPreferences) === null || _b === void 0 ? void 0 : _b.chatNotifications) === true) {
                // Send email via SendGrid SMTP
                yield nodemailer_1.default.sendMail({
                    from: process.env.FROM_EMAIL, // verified sender email
                    to,
                    subject,
                    text, // fallback plain text
                    replyTo, // client email
                    html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">
  
  <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 18px 25px; color: white;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Message Received</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px; color: #333333; font-size: 16px; line-height: 1.7;">
      <p>Hello,</p>

      <p style="white-space: pre-line;">${text}</p>

      <p style="margin-top: 24px;">Best regards,<br/>
      <strong>${fullName}</strong></p>
    </div>

    <!-- Footer -->
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
            provider: "sendgrid-smtp",
            data: savedEmail,
        };
    }
    catch (err) {
        console.error("❌ Email sending error:", err.message);
        throw new Error(err.message || "Email sending failed");
    }
});
// create replay email function
const create_reply_in_db = (emailId, replyMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Find email from database
        const existingEmail = yield email_schema_1.email_model.findById(emailId);
        if (!existingEmail) {
            throw new Error("Email not found");
        }
        const userEmail = existingEmail.replyTo; // user email (client)
        const originalSubject = existingEmail.subject;
        // client full name
        const firstName = process.env.APP_USER_FIRSTNAME || "";
        const lastName = process.env.APP_USER_LASTNAME || " ";
        const fullName = `${firstName} ${lastName}`.trim();
        // 2. Send reply email to the client
        const info = yield nodemailer_1.default.sendMail({
            from: process.env.FROM_EMAIL,
            to: userEmail,
            subject: `Re: ${originalSubject}`,
            text: replyMessage,
            replyTo: process.env.FROM_EMAIL,
            html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">
  
  <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.12);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 18px 25px; color: white;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Response from ${fullName}</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px; color: #333333; font-size: 16px; line-height: 1.7;">
      <p>Hello,</p>

      <p style="white-space: pre-line;">${replyMessage}</p>

      <p style="margin-top: 24px;">Best regards,<br/>
      <strong>${fullName}</strong></p>
    </div>

    <!-- Footer -->
    <div style="background: #f1f5f9; padding: 18px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">You are receiving a reply from <strong>${fullName}</strong>.</p>
    </div>

  </div>

</div>
`,
        });
        console.log("✔ Reply email sent:", info.response);
        // 3. Push reply into replies array
        existingEmail.replies.push({
            message: replyMessage,
            sentBy: "admin",
            sentAt: new Date(),
        });
        // 4. Save updated email doc
        yield existingEmail.save();
        return {
            success: true,
            provider: "sendgrid-smtp",
            responseId: info.messageId,
            status: info.response,
            data: existingEmail,
        };
    }
    catch (err) {
        console.error("❌ Reply sending error:", err.message);
        throw new Error(err.message || "Reply sending failed");
    }
});
//
const get_all_emails_from_db = (search, limit) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (search) {
        // ✅ Remove extra white spaces & make case-insensitive regex
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
    const emails = yield email_schema_1.email_model
        .find(query)
        .sort({ read: 1, createdAt: -1 })
        .limit(limit || 4);
    return {
        meta: {
            limit: limit || 4,
        },
        data: emails,
    };
});
const get_email_by_id_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch email
    const email = yield email_schema_1.email_model.findById(id);
    if (!email) {
        throw new Error("Email not found");
    }
    // Auto mark as read
    if (!email.read) {
        yield email_schema_1.email_model.updateOne({ _id: id }, { read: true });
        email.read = true; // also update local state for response
    }
    return email;
});
// Delete email by id from db
const delete_email_by_id_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield email_schema_1.email_model.findByIdAndDelete(id);
    if (!email) {
        throw new Error("Email not found");
    }
    return email;
});
const get_dashboard_summary_from_db = () => __awaiter(void 0, void 0, void 0, function* () {
    // ---------- Current Values ----------
    const totalBookings = yield booking_schema_1.booking_model.countDocuments();
    const pendingReviews = yield reviews_schema_1.reviews_model.countDocuments({
        status: "pending",
    });
    const unreadMessages = yield email_schema_1.email_model.countDocuments({
        read: false,
    });
    // ---------- Monthly Views (Method 2) ----------
    const { thisMonthViews, lastMonthViews } = yield analytics_service_1.analytics_service.get_analytics_into_db();
    const totalViews = thisMonthViews;
    // ---------- Last Month Range ----------
    const startOfLastMonth = (0, dayjs_1.default)()
        .subtract(1, "month")
        .startOf("month")
        .toDate();
    const endOfLastMonth = (0, dayjs_1.default)().subtract(1, "month").endOf("month").toDate();
    // ---------- Last Month Stats ----------
    const lastMonthBookings = yield booking_schema_1.booking_model.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    const lastMonthPendingReviews = yield reviews_schema_1.reviews_model.countDocuments({
        status: "pending",
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    const lastMonthUnreadMessages = yield email_schema_1.email_model.countDocuments({
        read: false,
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    // ---------- Percent Calculation ----------
    const calcChange = (current, last) => {
        if (last === 0 && current === 0)
            return 0;
        if (last === 0 && current > 0)
            return 100;
        const percent = ((current - last) / last) * 100;
        if (percent > 100)
            return 100;
        if (percent < -100)
            return -100;
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
});
exports.email_service = {
    create_new_email_into_db,
    get_all_emails_from_db,
    create_reply_in_db,
    get_email_by_id_from_db,
    delete_email_by_id_from_db,
    get_dashboard_summary_from_db,
};
