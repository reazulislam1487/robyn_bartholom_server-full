// Nodemailer transporter using SendGrid SMTP
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587, // TLS
  secure: false, // 465 হলে true
  auth: {
    user: "apikey", // fixed string
    pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
  },

});
export default transporter;
