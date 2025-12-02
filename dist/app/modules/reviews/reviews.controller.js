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
exports.reviews_controller = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const http_status_1 = __importDefault(require("http-status"));
const reviews_service_1 = require("./reviews.service");
const create_new_reviews = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.reviews_service.create_new_reviews_into_db(req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New reviews created successfully!",
        data: result,
    });
}));
const get_all_reviews = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status;
    const search = req.query.search;
    const page = req.query.page
        ? parseInt(req.query.page, 10)
        : undefined;
    const limit = req.query.limit
        ? parseInt(req.query.limit, 10)
        : undefined;
    const result = yield reviews_service_1.reviews_service.get_all_reviews_from_db(status, search, page, limit);
    // console.log("Get all Reviews:", result);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reviews successfully get !",
        data: result,
    });
}));
const update_reviews_status_by_id = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["approved", "rejected", "deleted"];
    if (!validStatuses.includes(status)) {
        return (0, manage_response_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: `Invalid status. Valid statuses are: ${validStatuses.join(", ")}`,
        });
    }
    const result = yield reviews_service_1.reviews_service.update_reviews_status_in_db(id, status);
    if (!result) {
        return (0, manage_response_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Review not found",
            data: null,
        });
    }
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review status updated successfully!",
        data: result,
    });
}));
const get_review_by_id = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield reviews_service_1.reviews_service.get_review_by_id_from_db(id);
    if (!result) {
        return (0, manage_response_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Review not found",
            data: null,
        });
    }
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review successfully retrieved!",
        data: result,
    });
}));
exports.reviews_controller = {
    create_new_reviews,
    get_all_reviews,
    update_reviews_status_by_id,
    get_review_by_id,
};
