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
exports.user_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const update_profile = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.user_services.update_profile_into_db(req);
    (0, manage_response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Profile update successful.",
        data: result,
    });
}));
const update_notification_preferences = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.user_services.update_notification_preferences_into_db(req);
    (0, manage_response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Profile update successful.",
        data: result,
    });
}));
exports.user_controllers = {
    update_profile,
    update_notification_preferences,
};
