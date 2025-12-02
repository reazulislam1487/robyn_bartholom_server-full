"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolio_validations = exports.update = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    title: zod_1.z.string("Title is required"),
    network: zod_1.z.string("Network is required"),
    year: zod_1.z.coerce
        .number("Year is required") // coerce string -> number
        .int("Year must be an integer")
        .min(1900, "Year must be valid")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
    role: zod_1.z.string("Role is required"),
    description: zod_1.z.string("Description is required"),
    status: zod_1.z.string().default("published"),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
    createdAt: zod_1.z.preprocess(() => new Date(), zod_1.z.date()).default(() => new Date()),
});
// ✅ Update Blog Schema (Partial of Create)
exports.update = create.partial();
exports.portfolio_validations = { create, update: exports.update };
