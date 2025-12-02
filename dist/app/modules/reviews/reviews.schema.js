"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews_model = void 0;
const mongoose_1 = require("mongoose");
const reviews_schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    yourReview: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
exports.reviews_model = (0, mongoose_1.model)("reviews", reviews_schema);
