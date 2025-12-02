"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Nodemailer transporter using SendGrid SMTP
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.sendgrid.net",
    port: 587, // TLS
    secure: false, // 465 হলে true
    auth: {
        user: "apikey", // fixed string
        pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
    },
});
exports.default = transporter;
