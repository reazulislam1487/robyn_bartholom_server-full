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
exports.uploadToCloudinaryBuffer = void 0;
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_config_1 = require("../configs/cloudinary.config");
const uploadToCloudinaryBuffer = (file_1, ...args_1) => __awaiter(void 0, [file_1, ...args_1], void 0, function* (file, folder = "products") {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_config_1.cloudinary.uploader.upload_stream({
            folder,
            resource_type: "image", // ✅ Only for images
        }, (error, result) => {
            if (error)
                return reject(error);
            if (result && result.secure_url && result.public_id) {
                // ✅ Return both values
                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
            else {
                reject(new Error("Upload failed"));
            }
        });
        streamifier_1.default.createReadStream(file.buffer).pipe(uploadStream);
    });
});
exports.uploadToCloudinaryBuffer = uploadToCloudinaryBuffer;
