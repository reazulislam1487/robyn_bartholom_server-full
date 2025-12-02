import { Schema, model } from "mongoose";
import { T_Booking } from "./booking.interface";

const booking_schema = new Schema<T_Booking>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: false },
    consultationType: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    additionalInfo: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "decline", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export const booking_model = model("booking", booking_schema);
