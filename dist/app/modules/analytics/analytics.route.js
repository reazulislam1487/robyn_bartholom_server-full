"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const analytics_router = (0, express_1.Router)();
analytics_router.post("/create", analytics_controller_1.analytics_controller.create_new_analytics);
analytics_router.get("", analytics_controller_1.analytics_controller.get_analytics);
exports.default = analytics_router;
