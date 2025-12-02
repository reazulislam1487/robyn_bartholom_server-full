"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
// ✅ Memory-based storage (no local "uploads" folder)
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/avif",
        "image/png",
        "image/webp",
        "image/gif",
    ];
    if (file.mimetype.startsWith("image/")) {
        allowedImageTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Invalid image format"));
    }
    else {
        cb(new Error("Unsupported file type"));
    }
};
exports.multerUpload = (0, multer_1.default)({
    storage, //  using memoryStorage instead of diskStorage
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024, files: 5 },
});
/*
*? For video uploads
export const multerUploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024, files: 1 },
});
*/
