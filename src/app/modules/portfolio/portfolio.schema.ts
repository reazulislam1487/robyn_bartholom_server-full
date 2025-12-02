import { Schema, model } from "mongoose";
import { T_Portfolio } from "./portfolio.interface";
import { string } from "zod";

const portfolio_schema = new Schema<T_Portfolio>({
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

export const portfolio_model = model("portfolio", portfolio_schema);
