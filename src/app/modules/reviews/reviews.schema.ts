import { Schema, model } from "mongoose";
import { T_Reviews } from "./reviews.interface";
import { string } from "zod";

const reviews_schema = new Schema<T_Reviews>(
  {
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
  },
  { timestamps: true }
);

export const reviews_model = model("reviews", reviews_schema);
