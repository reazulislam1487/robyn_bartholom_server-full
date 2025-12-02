
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// =======================
// SendGrid Setup
// =======================
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not defined in .env");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Optional: from email
export const FROM_EMAIL = process.env.FROM_EMAIL || "";

export { sgMail };
