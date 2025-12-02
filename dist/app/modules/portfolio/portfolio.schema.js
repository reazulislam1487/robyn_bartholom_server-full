"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolio_model = void 0;
const mongoose_1 = require("mongoose");
const portfolio_schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    network: { type: String, required: true },
    year: { type: Number, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    imageUrl: { type: String, required: false },
    publicId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now, required: true },
});
exports.portfolio_model = (0, mongoose_1.model)("portfolio", portfolio_schema);
