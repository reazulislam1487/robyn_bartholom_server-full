"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification_model = void 0;
const mongoose_1 = require("mongoose");
const notification_schema = new mongoose_1.Schema({
    emailNotifications: { type: Boolean, default: true },
    bookingNotifications: { type: Boolean, default: true },
    reviewNotifications: { type: Boolean, default: true },
    chatNotifications: { type: Boolean, default: true },
}, { timestamps: true });
exports.notification_model = (0, mongoose_1.model)("NotificationPreferences", notification_schema);
