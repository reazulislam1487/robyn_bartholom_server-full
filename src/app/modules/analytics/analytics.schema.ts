import { Schema, model } from "mongoose";
import { T_Analytics } from "./analytics.interface";

const analytics_schema = new Schema<T_Analytics>(
  {
    month: {
      type: String, // Example: "2025-11"
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const analytics_model = model("analytics", analytics_schema);
