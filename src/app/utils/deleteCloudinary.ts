// Update a portfolio

import { cloudinary } from "../configs/cloudinary.config";

//? Optional: delete previous image
const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(" Cloudinary delete error:", error);
  }
};
export default deleteFromCloudinary;
