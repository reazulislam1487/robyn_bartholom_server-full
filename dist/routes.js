"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const reviews_route_1 = __importDefault(require("./app/modules/reviews/reviews.route"));
const portfolio_route_1 = __importDefault(require("./app/modules/portfolio/portfolio.route"));
const blog_route_1 = __importDefault(require("./app/modules/blog/blog.route"));
const booking_route_1 = __importDefault(require("./app/modules/booking/booking.route"));
const email_route_1 = __importDefault(require("./app/modules/email/email.route"));
const analytics_route_1 = __importDefault(require("./app/modules/analytics/analytics.route"));
const appRouter = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/analytics", route: analytics_route_1.default },
    { path: "/email", route: email_route_1.default },
    { path: "/booking", route: booking_route_1.default },
    { path: "/blog", route: blog_route_1.default },
    { path: "/portfolio", route: portfolio_route_1.default },
    { path: "/reviews", route: reviews_route_1.default },
    { path: "/auth", route: auth_route_1.default },
    { path: "/user", route: user_route_1.default },
];
moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
exports.default = appRouter;
