"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booking_model = void 0;
const mongoose_1 = require("mongoose");
const booking_schema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: false },
    consultationType: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    additionalInfo: { type: String },
    status: {
        type: String,
        enum: ["pending", "accepted", "decline", "completed"],
        default: "pending",
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});
exports.booking_model = (0, mongoose_1.model)("booking", booking_schema);
