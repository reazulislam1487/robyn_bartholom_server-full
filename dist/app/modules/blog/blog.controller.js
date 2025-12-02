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
exports.blog_controller = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const http_status_1 = __importDefault(require("http-status"));
const blog_service_1 = require("./blog.service");
const blog_validation_1 = require("./blog.validation");
// create new blog
const create_new_blog = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 1️⃣ Parse JSON from FormData
    const parsedData = JSON.parse(((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) || "{}");
    // 2️⃣ Validate with Zod
    const validatedData = blog_validation_1.blog_validations.createBlogSchema.parse(parsedData);
    const result = yield blog_service_1.blog_service.create_new_blog_into_db(validatedData, req.file);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New blog created successfully!",
        data: result,
    });
}));
// update a blog
const update_blog = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = req.params.id;
    const parsedData = JSON.parse(((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) || "{}");
    const validatedData = blog_validation_1.blog_validations.updateBlogSchema.parse(parsedData);
    const result = yield blog_service_1.blog_service.update_blog_into_db(blogId, validatedData, req.file);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog updated successfully!",
        data: result,
    });
}));
// Get all blogs
const get_all_blog = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blog_service.get_all_blogs_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get all blogs successfully!",
        data: result,
    });
}));
const get_detail = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blog_service.get_detail_from_db(id);
    if (!result) {
        return (0, manage_response_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Blog not found",
            data: null,
        });
    }
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get a specific blog successfully!",
        data: result,
    });
}));
const get_three_blogs = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blog_service.get_three_blogs_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get only Three successfully!",
        data: result,
    });
}));
const delete_blog = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blog_service.delete_blog_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog Deleted successfully!",
        data: result,
    });
}));
exports.blog_controller = {
    create_new_blog,
    update_blog,
    get_all_blog,
    get_detail,
    get_three_blogs,
    delete_blog,
};
