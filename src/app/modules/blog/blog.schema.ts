import { Schema, model } from "mongoose";
import { T_Blog } from "./blog.interface";

const blog_schema = new Schema<T_Blog>({
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

export const blog_model = model("blog", blog_schema);
