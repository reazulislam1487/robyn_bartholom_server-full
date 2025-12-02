"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const multerUpload_1 = require("../../middlewares/multerUpload");
const userRoute = (0, express_1.Router)();
userRoute.patch("/update-profile", multerUpload_1.multerUpload.single("image"), (req, res, next) => {
    req.body = user_validation_1.user_validations.update_user.parse(JSON.parse(req === null || req === void 0 ? void 0 : req.body.data));
    user_controller_1.user_controllers.update_profile(req, res, next);
});
// update user Notification Preferences
userRoute.patch("/update-notification-preferences", (req, res, next) => {
    user_controller_1.user_controllers.update_notification_preferences(req, res, next);
});
exports.default = userRoute;
