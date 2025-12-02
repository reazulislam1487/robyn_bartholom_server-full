import multer from "multer";

// ✅ Memory-based storage (no local "uploads" folder)
const storage = multer.memoryStorage();

// const fileFilter = (
//   req: any,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const allowedImageTypes = [
//     // Images
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "image/gif",
//     "image/avif",

//     // Documents
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

//     // Excel
//     "application/vnd.ms-excel",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

//     // PowerPoint
//     "application/vnd.ms-powerpoint",
//     "application/vnd.openxmlformats-officedocument.presentationml.presentation",

//     // ZIP
//     "application/zip",
//     "application/x-zip-compressed",

//     // CSV
//     "text/csv",
//     // "image/jpeg",
//     // "image/jpg",
//     // "image/avif",
//     // "image/png",
//     // "image/webp",
//     // "image/gif",
//   ];

//   console.log("📥 Incoming File →", {
//     field: file.fieldname,
//     name: file.originalname,
//     mimetype: file.mimetype,
//     size: file.size,
//   });
//   if (file.mimetype.startsWith("image/")) {
//     allowedImageTypes.includes(file.mimetype)
//       ? cb(null, true)
//       : cb(new Error("Invalid image format"));
//   } else {
//     cb(new Error("Unsupported file type"));
//   }
// };

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",

    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Excel
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // PowerPoint
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    // ZIP
    "application/zip",
    "application/x-zip-compressed",

    // CSV
    "text/csv",
  ];

  // console.log("📥 Incoming File →", {
  //   field: file.fieldname,
  //   name: file.originalname,
  //   mimetype: file.mimetype,
  //   size: file.size,
  // });

  // 👉 FINAL FIX — now check ANY file type
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"));
  }
};

export const multerUpload = multer({
  storage, //  using memoryStorage instead of diskStorage
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024, files: 10 }, // 25MB, 10 files
});

/*
*? For video uploads
export const multerUploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024, files: 1 },
});
*/
