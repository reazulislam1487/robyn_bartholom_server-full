"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog_model = void 0;
const mongoose_1 = require("mongoose");
const blog_schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: String, required: false },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true },
    imageUrl: { type: String, required: false },
    publicId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now, required: true },
});
exports.blog_model = (0, mongoose_1.model)("blog", blog_schema);
