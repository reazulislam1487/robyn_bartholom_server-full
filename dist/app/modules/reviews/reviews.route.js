"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const reviews_controller_1 = require("./reviews.controller");
const reviews_validation_1 = require("./reviews.validation");
const reviews_router = (0, express_1.Router)();
reviews_router.post("/create", (0, request_validator_1.default)(reviews_validation_1.reviews_validations.create), reviews_controller_1.reviews_controller.create_new_reviews);
// Get all reviews with optional status and search query
reviews_router.get("/", reviews_controller_1.reviews_controller.get_all_reviews);
// update reviews status by ID
reviews_router.patch("/:id", reviews_controller_1.reviews_controller.update_reviews_status_by_id);
// get review by
reviews_router.get("/:id", reviews_controller_1.reviews_controller.get_review_by_id);
exports.default = reviews_router;
