import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const user_schema = new Schema<TUser>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    professionalTitle: { type: String, required: false },
    imageUrl: { type: String, required: false },
    location: { type: String },
    phone: { type: String, required: false },
    password: { type: String, required: false },
    bio: { type: String, required: false },
    publicId: { type: String, required: false },
    // Notification Preferences
    notificationPreferences: {
      emailNotifications: { type: Boolean, default: true },
      bookingNotifications: { type: Boolean, default: true },
      reviewNotifications: { type: Boolean, default: true },
      chatNotifications: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export const User_Model = model("user", user_schema);
