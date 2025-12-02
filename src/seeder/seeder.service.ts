import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User_Model } from "../app/modules/user/user.schema";

dotenv.config();

export const seedAdmin = async (): Promise<void> => {
  try {
    // connect to MongoDB
    await mongoose.connect(process.env.DB_URL ? process.env.DB_URL : "");
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
    const existingAdmin = await User_Model.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✅ Admin already exists, skipping seeding.");
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // format Phone Number
    const convertPhone = parseInt(adminPhone ? adminPhone : "");

    // create new admin user
    await User_Model.create({
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail,
      phone: convertPhone,
      password: hashedPassword,
      imageUrl: adminProfileImg,
      location: adminLocation,
    });

    console.log(`🚀 Default admin created: ${adminEmail}`);
  } catch (error: any) {
    console.error("❌ Failed to seed admin:", error.message);
  } finally {
    // await mongoose.connection.close();
    // console.log("🔌 MongoDB connection closed.");
  }
};
