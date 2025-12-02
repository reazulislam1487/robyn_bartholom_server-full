"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_schema_1 = require("../app/modules/user/user.schema");
dotenv_1.default.config();
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect to MongoDB
        yield mongoose_1.default.connect(process.env.DB_URL ? process.env.DB_URL : "");
        console.log("📦 MongoDB connected successfully.");
        // full name
        const adminFirstName = process.env.APP_USER_FIRSTNAME;
        const adminLastName = process.env.APP_USER_LASTNAME;
        // data from env
        const adminEmail = process.env.APP_USER_EMAIL;
        const adminPhone = process.env.APP_USER_PHONE;
        const adminPassword = process.env.APP_PASSWORD;
        const adminProfileImg = process.env.IMAGE_URL;
        const adminLocation = process.env.LOCATION;
        if (!adminEmail || !adminPassword) {
            throw new Error("❗ Missing admin credentials in environment variables");
        }
        // check if admin already exists
        const existingAdmin = yield user_schema_1.User_Model.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("✅ Admin already exists, skipping seeding.");
            return;
        }
        // hash password
        const hashedPassword = yield bcrypt_1.default.hash(adminPassword, 10);
        // format Phone Number
        const convertPhone = parseInt(adminPhone ? adminPhone : "");
        // create new admin user
        yield user_schema_1.User_Model.create({
            firstName: adminFirstName,
            lastName: adminLastName,
            email: adminEmail,
            phone: convertPhone,
            password: hashedPassword,
            imageUrl: adminProfileImg,
            location: adminLocation,
        });
        console.log(`🚀 Default admin created: ${adminEmail}`);
    }
    catch (error) {
        console.error("❌ Failed to seed admin:", error.message);
    }
    finally {
        // await mongoose.connection.close();
        // console.log("🔌 MongoDB connection closed.");
    }
});
exports.seedAdmin = seedAdmin;
