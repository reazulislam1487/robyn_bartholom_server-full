"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Model = void 0;
const mongoose_1 = require("mongoose");
const user_schema = new mongoose_1.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    professionalTitle: { type: String, required: false },
    imageUrl: { type: String, required: false },
    location: { type: String },
    phone: { type: String, required: false },
    password: { type: String, required: false },
    bio: { type: String, required: false },
    publicId: { type: String, required: false },
    // Notification Preferences
    notificationPreferences: {
        emailNotifications: { type: Boolean, default: true },
        bookingNotifications: { type: Boolean, default: true },
        reviewNotifications: { type: Boolean, default: true },
        chatNotifications: { type: Boolean, default: true },
    },
}, { timestamps: true });
exports.User_Model = (0, mongoose_1.model)("user", user_schema);
