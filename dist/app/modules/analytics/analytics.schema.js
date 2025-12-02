"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics_model = void 0;
const mongoose_1 = require("mongoose");
const analytics_schema = new mongoose_1.Schema({
    month: {
        type: String, // Example: "2025-11"
        required: true,
        unique: true,
    },
    views: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.analytics_model = (0, mongoose_1.model)("analytics", analytics_schema);
