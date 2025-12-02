"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sgMail = exports.FROM_EMAIL = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
exports.sgMail = mail_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// =======================
// SendGrid Setup
// =======================
if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not defined in .env");
}
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
// Optional: from email
exports.FROM_EMAIL = process.env.FROM_EMAIL || "";
