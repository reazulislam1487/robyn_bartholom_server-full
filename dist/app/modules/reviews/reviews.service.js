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
exports.reviews_service = void 0;
const nodemailer_1 = __importDefault(require("../../utils/nodemailer"));
const user_schema_1 = require("../user/user.schema");
const reviews_schema_1 = require("./reviews.schema");
const create_new_reviews_into_db = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { rating } = reviewData;
    const data = reviewData;
    if (!rating || rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    // Optional: Check if this user already submitted a review
    // const existingReview = await reviews_model.findOne({ email });
    // if (existingReview) {
    //   throw new Error("You have already submitted a review!");
    // }
    const result = yield reviews_schema_1.reviews_model.create(reviewData);
    // 🔔 Notification Logic
    // 🔔 Notification Logic
    if (result) {
        const admin = yield user_schema_1.User_Model.findOne(); // Only 1 user exists
        if (((_a = admin === null || admin === void 0 ? void 0 : admin.notificationPreferences) === null || _a === void 0 ? void 0 : _a.reviewNotifications) === true) {
            const adminEmail = admin.email;
            try {
                yield nodemailer_1.default.sendMail({
                    from: process.env.FROM_EMAIL,
                    to: adminEmail,
                    subject: `New Review from ${data.name}`,
                    replyTo: data.email,
                    text: data.yourReview || "New Review request received.",
                    html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4c6ef5, #15aabf); padding: 20px; color: white;">
      <h2 style="margin: 0; font-size: 20px;">New Review Received</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px; color: #333; font-size: 15px; line-height: 1.6;">
      <p>Hello Robyn,</p>

      <p>You have received a new review request. Here are the details:</p>

      <div style="margin-top: 12px;">
        <p><strong>Client Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role :</strong> ${data.role || "Viewer"}</p>
        <p><strong>Rating is:</strong> ${data.rating}</p>
        <p><strong>Additional Info:</strong><br/> ${((_b = data.yourReview) === null || _b === void 0 ? void 0 : _b.trim()) || "No additional info provided."}</p>
      </div>

      <p style="margin-top: 25px;">Best regards,<br>
        <strong>Robyn Bartholom Website</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">Reply will go directly to: <strong>${data.email}</strong></p>
    </div>

  </div>
</div>
`,
                });
            }
            catch (error) {
                console.error(" Email send failed:", error);
            }
        }
    }
    return result;
});
// Get all reviews by status
const get_all_reviews_from_db = (status_1, search_1, ...args_1) => __awaiter(void 0, [status_1, search_1, ...args_1], void 0, function* (status, search, page = 1, limit = 10) {
    const query = {};
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
    const data = yield reviews_schema_1.reviews_model
        .find(query)
        .sort({ createDate: -1 })
        .skip(skip)
        .limit(limit);
    /* ---------------------
       📊 Count Documents
    --------------------- */
    const total = yield reviews_schema_1.reviews_model.countDocuments(query);
    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
// Update review status by ID
const update_reviews_status_in_db = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === "deleted") {
        const result = yield reviews_schema_1.reviews_model.findByIdAndDelete(id);
        return result;
    }
    const result = yield reviews_schema_1.reviews_model.findByIdAndUpdate(id, { status }, { new: true });
    return result;
});
// Get review by ID
const get_review_by_id_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_schema_1.reviews_model.findById(id);
    return result;
});
exports.reviews_service = {
    create_new_reviews_into_db,
    get_all_reviews_from_db,
    update_reviews_status_in_db,
    get_review_by_id_from_db,
};
//
