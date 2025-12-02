import { z } from "zod";

//  Create Blog Schema
export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  readTime: z.string().optional(),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  status: z.string().min(1, "Status is required"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  createdAt: z.coerce.date().default(() => new Date()),
});

//  Update Blog Schema (Partial of Create)
export const updateBlogSchema = createBlogSchema.partial();

export const blog_validations = { createBlogSchema, updateBlogSchema };
