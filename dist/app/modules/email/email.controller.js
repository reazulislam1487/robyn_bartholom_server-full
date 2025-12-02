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
exports.email_controller = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const http_status_1 = __importDefault(require("http-status"));
const email_service_1 = require("./email.service");
const create_new_email = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield email_service_1.email_service.create_new_email_into_db(req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New email created successfully!",
        data: result,
    });
}));
const create_reply = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, replyMessage } = req.body;
    console.log(id, replyMessage);
    const result = yield email_service_1.email_service.create_reply_in_db(id, replyMessage);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reply sent successfully!",
        data: result,
    });
}));
const get_all_emails = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const limit = req.query.limit ? parseInt(req.query.limit, 4) : 4;
    const result = yield email_service_1.email_service.get_all_emails_from_db(search, limit);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All emails fetched successfully!",
        data: result,
    });
}));
// get email by id
const get_email_by_id = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield email_service_1.email_service.get_email_by_id_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Email fetched successfully!",
        data: result,
    });
}));
// delete email by id
const delete_email_by_id = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield email_service_1.email_service.delete_email_by_id_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Email deleted successfully!",
        data: result,
    });
}));
// get dashboard summery
const get_dashboard_summary = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield email_service_1.email_service.get_dashboard_summary_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Dashboard summary fetched successfully!",
        data: result,
    });
}));
exports.email_controller = {
    create_new_email,
    get_all_emails,
    create_reply,
    get_email_by_id,
    delete_email_by_id,
    get_dashboard_summary
};
