"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email_model = void 0;
const mongoose_1 = require("mongoose");
const email_schema = new mongoose_1.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    fullName: { type: String, required: false },
    replyTo: { type: String, required: true },
    replies: [
        {
            message: String,
            sentBy: String, // email or name
            sentAt: { type: Date, default: Date.now },
        },
    ],
    read: { type: Boolean, default: false },
    provider: {
        type: String,
        required: false,
    },
    status: { type: mongoose_1.Schema.Types.Mixed }, // SendGrid = 202, Nodemailer = 250 OK
    responseId: { type: String }, // messageId or sgMessageId
    sentAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.email_model = (0, mongoose_1.model)("email", email_schema);
