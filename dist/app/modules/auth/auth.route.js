"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const auth_validation_1 = require("./auth.validation");
const authRoute = (0, express_1.Router)();
// Login route
authRoute.post("/login", (0, request_validator_1.default)(auth_validation_1.auth_validation.login_validation), auth_controller_1.auth_controllers.login_user);
authRoute.get("/me", (0, request_validator_1.default)(auth_validation_1.auth_validation.getProfile), auth_controller_1.auth_controllers.get_my_profile);
// change password route
authRoute.post("/change-password", (0, request_validator_1.default)(auth_validation_1.auth_validation.changePassword), auth_controller_1.auth_controllers.change_password);
exports.default = authRoute;
