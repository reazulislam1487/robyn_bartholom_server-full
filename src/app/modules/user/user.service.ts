import { Request } from "express";
import { User_Model } from "./user.schema";
import { uploadToCloudinaryBuffer } from "../../utils/cloudinaryUpload";
import deleteFromCloudinary from "../../utils/deleteCloudinary";

// Optional: delete previous image
// const deleteFromCloudinary = async (publicId: string) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error(" Cloudinary delete error:", error);
//   }
// };

const update_profile_into_db = async (req: Request) => {
  // Find existing user
  const existingUser = await User_Model.findOne({
    email: req?.body?.email || req?.user?.email,
  });
  if (!existingUser) {
    throw new Error("User not found");
  }

  let newImageUrl = existingUser.imageUrl;
  let newPublicId = existingUser.publicId;

  // ✅ If new file uploaded
  if (req.file) {
    // Delete old image (if exists)
    if (existingUser.publicId) {
      await deleteFromCloudinary(existingUser.publicId);
    }

    // Upload new image
    const uploaded = (await uploadToCloudinaryBuffer(
      req.file,
      "user_photos"
    )) as any;

    // Set new values
    newImageUrl = uploaded.secure_url;
    newPublicId = uploaded.public_id;
  }

  // ✅ Update user info in DB
  const result = await User_Model.findOneAndUpdate(
    { email: req?.body?.email || req?.user?.email },
    {
      ...req.body,
      imageUrl: newImageUrl,
      publicId: newPublicId,
    },
    { new: true }
  );
  console.log(req.body);
  if (!result) {
    throw new Error("User not found");
  }

  // Remove password before returning
  const resultObj = result.toObject ? result.toObject() : { ...result };
  delete (resultObj as any).password;

  return resultObj;
};
const update_notification_preferences_into_db = async (req: Request) => {
  // Find existing user
  const existingUser = await User_Model.findOne({
    email: req?.body?.email || req?.user?.email,
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  // ✅ Update user info in DB
  const result = await User_Model.findOneAndUpdate(
    { email: req?.body?.email || req?.user?.email },
    {
      notificationPreferences: req.body.notificationPreferences,
    },
    { new: true }
  );
  if (!result) {
    throw new Error("User not found");
  }
  // Remove password before returning
  const resultObj = result.toObject ? result.toObject() : { ...result };
  delete (resultObj as any).password;
  return resultObj;
};

export const user_services = {
  update_profile_into_db,
  update_notification_preferences_into_db,
};
