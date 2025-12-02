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
exports.blog_service = void 0;
const cloudinary_config_1 = require("../../configs/cloudinary.config");
const cloudinaryUpload_1 = require("../../utils/cloudinaryUpload");
const deleteCloudinary_1 = __importDefault(require("../../utils/deleteCloudinary"));
const blog_schema_1 = require("./blog.schema");
// Create a new blog
const create_new_blog_into_db = (blogData, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // initial imageUrl set
        let newImageUrl = "";
        let newPublicId = "";
        // Upload image if exists
        if (file) {
            const uploaded = yield (0, cloudinaryUpload_1.uploadToCloudinaryBuffer)(file, "blog_images");
            if (uploaded) {
                newImageUrl = uploaded.secure_url;
                newPublicId = uploaded.public_id;
            }
        }
        // Save data
        const dataToSave = Object.assign(Object.assign({}, blogData), { imageUrl: newImageUrl || blogData.imageUrl, publicId: newPublicId });
        const result = yield blog_schema_1.blog_model.create(dataToSave);
        return result;
    }
    catch (error) {
        console.error("Blog creation error:", error);
        throw error;
    }
});
// update blog
const update_blog_into_db = (blogId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingBlog = yield blog_schema_1.blog_model.findOne({
            _id: blogId,
        });
        if (!existingBlog) {
            throw new Error("Blog not found");
        }
        // initial imageUrl form previous blog data
        let newImageUrl = existingBlog.imageUrl;
        let newPublicId = existingBlog.publicId;
        // Upload image if exists
        if (file) {
            // Delete old image (if exists)
            if (existingBlog.publicId) {
                yield (0, deleteCloudinary_1.default)(existingBlog.publicId);
            }
            const uploaded = yield (0, cloudinaryUpload_1.uploadToCloudinaryBuffer)(file, "blog_images");
            if (uploaded) {
                newImageUrl = uploaded.secure_url;
                newPublicId = uploaded.public_id;
            }
        }
        // Save data
        const dataToSave = Object.assign(Object.assign({}, payload), { imageUrl: newImageUrl || payload.imageUrl, publicId: newPublicId });
        const result = yield blog_schema_1.blog_model.findByIdAndUpdate(blogId, dataToSave, { new: true } // return updated document
        );
        return result;
    }
    catch (error) {
        console.error("Blog update error:", error);
        throw error;
    }
});
// Get all blogs
const get_all_blogs_from_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_schema_1.blog_model.find();
    return result;
});
const get_detail_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_schema_1.blog_model.findById(id);
    return result;
});
const get_three_blogs_from_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_schema_1.blog_model.find().limit(3);
    return result;
});
const delete_blog_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ Find the portfolio by ID
    const blog = yield blog_schema_1.blog_model.findById(id);
    if (!blog) {
        throw new Error("Portfolio not found");
    }
    if (blog.imageUrl) {
        const publicId = blog.publicId;
        // 3️⃣ Delete from Cloudinary
        yield cloudinary_config_1.cloudinary.uploader.destroy(publicId);
    }
    // 4️⃣ Delete from MongoDB
    const result = yield blog_schema_1.blog_model.findByIdAndDelete(id);
    return result;
});
exports.blog_service = {
    create_new_blog_into_db,
    update_blog_into_db,
    get_all_blogs_from_db,
    get_detail_from_db,
    get_three_blogs_from_db,
    delete_blog_from_db,
};
