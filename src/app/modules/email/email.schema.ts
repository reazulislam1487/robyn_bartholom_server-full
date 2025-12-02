import { Schema, model } from "mongoose";
import { T_Email } from "./email.interface";

const email_schema = new Schema<T_Email>(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    fullName: { type: String, required: false },
    replyTo: { type: String, required: true },
    replies: [
      {
        message: String,
        sentBy: String, // email or name
        sentAt: { type: Date, default: Date.now },
      },
    ],
    read: { type: Boolean, default: false },
    provider: {
      type: String,
      required: false,
    },
    status: { type: Schema.Types.Mixed }, // SendGrid = 202, Nodemailer = 250 OK
    responseId: { type: String }, // messageId or sgMessageId

    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const email_model = model("email", email_schema);
