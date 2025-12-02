import { Schema, model } from "mongoose";
import { TNotification } from "./notification.interface";

const notification_schema = new Schema<TNotification>(
  {
    emailNotifications: { type: Boolean, default: true },
    bookingNotifications: { type: Boolean, default: true },
    reviewNotifications: { type: Boolean, default: true },
    chatNotifications: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const notification_model = model(
  "NotificationPreferences",
  notification_schema
);
