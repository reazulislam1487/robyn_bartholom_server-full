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
exports.auth_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const login_user = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.login_user_from_db(req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successful !",
        data: {
            result,
        },
    });
}));
const get_my_profile = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.auth_services.get_my_profile_from_db(email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile fetched successfully!",
        data: result,
    });
}));
const change_password = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.change_password_from_db(req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password changed successfully!",
        data: result,
    });
}));
exports.auth_controllers = {
    login_user,
    get_my_profile,
    change_password,
};
