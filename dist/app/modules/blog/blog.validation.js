"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog_validations = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
//  Create Blog Schema
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    readTime: zod_1.z.string().optional(),
    excerpt: zod_1.z.string().min(1, "Excerpt is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    status: zod_1.z.string().min(1, "Status is required"),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
    createdAt: zod_1.z.coerce.date().default(() => new Date()),
});
//  Update Blog Schema (Partial of Create)
exports.updateBlogSchema = exports.createBlogSchema.partial();
exports.blog_validations = { createBlogSchema: exports.createBlogSchema, updateBlogSchema: exports.updateBlogSchema };
