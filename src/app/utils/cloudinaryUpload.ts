// import streamifier from "streamifier";
// import { cloudinary } from "../configs/cloudinary.config";

// export const uploadToCloudinaryBuffer = async (
//   file: Express.Multer.File,
//   folder: string = "products"
// ): Promise<{ secure_url: string; public_id: string }> => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         // resource_type: "image", // ✅ Only for images
//         resource_type: "auto", // 🔥 FIX — allow ANY file type
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         if (result && result.secure_url && result.public_id) {
//           // ✅ Return both values
//           resolve({
//             secure_url: result.secure_url,
//             public_id: result.public_id,
//           });
//         } else {
//           reject(new Error("Upload failed"));
//         }
//       }
//     );

//     streamifier.createReadStream(file.buffer).pipe(uploadStream);
//   });
// };

import streamifier from "streamifier";
import { cloudinary } from "../configs/cloudinary.config";

export const uploadToCloudinaryBuffer = async (
  file: Express.Multer.File,
  folder: string = "case_docs"
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    // Detect file type

    const isImage = file.mimetype.startsWith("image/");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isImage ? "image" : "raw", // ⭐ Auto detect
      },
      (error, result) => {
        if (error) return reject(error);

        if (result?.secure_url && result?.public_id) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          reject(new Error("Cloudinary upload failed"));
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
