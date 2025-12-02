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
exports.user_services = void 0;
const user_schema_1 = require("./user.schema");
const cloudinaryUpload_1 = require("../../utils/cloudinaryUpload");
const deleteCloudinary_1 = __importDefault(require("../../utils/deleteCloudinary"));
// Optional: delete previous image
// const deleteFromCloudinary = async (publicId: string) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error(" Cloudinary delete error:", error);
//   }
// };
const update_profile_into_db = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // Find existing user
    const existingUser = yield user_schema_1.User_Model.findOne({
        email: ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email),
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
            yield (0, deleteCloudinary_1.default)(existingUser.publicId);
        }
        // Upload new image
        const uploaded = (yield (0, cloudinaryUpload_1.uploadToCloudinaryBuffer)(req.file, "user_photos"));
        // Set new values
        newImageUrl = uploaded.secure_url;
        newPublicId = uploaded.public_id;
    }
    // ✅ Update user info in DB
    const result = yield user_schema_1.User_Model.findOneAndUpdate({ email: ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email) || ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.email) }, Object.assign(Object.assign({}, req.body), { imageUrl: newImageUrl, publicId: newPublicId }), { new: true });
    console.log(req.body);
    if (!result) {
        throw new Error("User not found");
    }
    // Remove password before returning
    const resultObj = result.toObject ? result.toObject() : Object.assign({}, result);
    delete resultObj.password;
    return resultObj;
});
const update_notification_preferences_into_db = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // Find existing user
    const existingUser = yield user_schema_1.User_Model.findOne({
        email: ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email),
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    // ✅ Update user info in DB
    const result = yield user_schema_1.User_Model.findOneAndUpdate({ email: ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email) || ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.email) }, {
        notificationPreferences: req.body.notificationPreferences,
    }, { new: true });
    if (!result) {
        throw new Error("User not found");
    }
    // Remove password before returning
    const resultObj = result.toObject ? result.toObject() : Object.assign({}, result);
    delete resultObj.password;
    return resultObj;
});
exports.user_services = {
    update_profile_into_db,
    update_notification_preferences_into_db,
};
