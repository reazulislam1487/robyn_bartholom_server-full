"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const booking_router = (0, express_1.Router)();
booking_router.post("/create", (0, request_validator_1.default)(booking_validation_1.booking_validations.create), booking_controller_1.booking_controller.create_new_booking);
booking_router.get("/", booking_controller_1.booking_controller.get_all_booking);
booking_router.get("/recent", booking_controller_1.booking_controller.get_recent_booking);
// get booking trends
booking_router.get("/trends", booking_controller_1.booking_controller.get_booking_trends);
// get Consultation Types
booking_router.get("/consultation", booking_controller_1.booking_controller.get_booking_consultation_types);
// update booking status
booking_router.patch("/:id", booking_controller_1.booking_controller.patch_booking_status);
booking_router.get("/:id", booking_controller_1.booking_controller.get_booking_by_id);
booking_router.delete("/:id", booking_controller_1.booking_controller.delete_booking_by_id);
exports.default = booking_router;
