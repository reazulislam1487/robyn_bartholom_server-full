"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const email_controller_1 = require("./email.controller");
const email_validation_1 = require("./email.validation");
const email_router = (0, express_1.Router)();
email_router.post("/create", (0, request_validator_1.default)(email_validation_1.email_validations.create), email_controller_1.email_controller.create_new_email);
email_router.post("/reply", (0, request_validator_1.default)(email_validation_1.email_validations.create), email_controller_1.email_controller.create_reply);
email_router.get("/get-all", email_controller_1.email_controller.get_all_emails);
// get email by id
email_router.get("/:id", email_controller_1.email_controller.get_email_by_id);
// delete email by id
email_router.delete("/:id", email_controller_1.email_controller.delete_email_by_id);
// get dashboard summery 
email_router.get("/dashboard/summary", email_controller_1.email_controller.get_dashboard_summary);
exports.default = email_router;
