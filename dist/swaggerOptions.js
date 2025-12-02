"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const path_1 = __importDefault(require("path"));
const configs_1 = require("./app/configs");
const auth_swagger_1 = require("./app/modules/auth/auth.swagger");
const user_swagger_1 = require("./app/modules/user/user.swagger");
const reviews_swagger_1 = require("./app/modules/reviews/reviews.swagger");
const portfolio_swagger_1 = require("./app/modules/portfolio/portfolio.swagger");
const blog_swagger_1 = require("./app/modules/blog/blog.swagger");
const booking_swagger_1 = require("./app/modules/booking/booking.swagger");
const email_swagger_1 = require("./app/modules/email/email.swagger");
const analytics_swagger_1 = require("./app/modules/analytics/analytics.swagger");
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Doc - Build with Express CLI",
            version: "1.0.0-Mahid",
            description: "Express API with auto-generated Swagger docs",
        },
        paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_swagger_1.authSwaggerDocs), user_swagger_1.userSwaggerDocs), reviews_swagger_1.reviewsSwaggerDocs), portfolio_swagger_1.portfolioSwaggerDocs), blog_swagger_1.blogSwaggerDocs), booking_swagger_1.bookingSwaggerDocs), email_swagger_1.emailSwaggerDocs), analytics_swagger_1.analyticsSwaggerDocs),
        servers: configs_1.configs.env === "production"
            ? [
                { url: "https://robyn-bartholom-server.onrender.com" },
                { url: "http://localhost:5000" },
            ]
            : [
                { url: "http://localhost:5000" },
                { url: "https://robyn-bartholom-server.onrender.com" },
            ],
        components: {
            securitySchemes: {
                AuthorizationToken: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Put your accessToken here ",
                },
            },
        },
        security: [
            {
                AuthorizationToken: [],
            },
        ],
    },
    apis: [
        path_1.default.join(__dirname, configs_1.configs.env === "production" ? "./**/*.js" : "./**/*.ts"),
    ],
};
