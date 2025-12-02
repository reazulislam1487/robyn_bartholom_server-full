"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const global_error_handler_1 = __importDefault(require("./app/middlewares/global_error_handler"));
const not_found_api_1 = __importDefault(require("./app/middlewares/not_found_api"));
const routes_1 = __importDefault(require("./routes"));
const swaggerOptions_1 = require("./swaggerOptions");
const seeder_service_1 = require("./seeder/seeder.service");
// define app
(0, seeder_service_1.seedAdmin)();
const app = (0, express_1.default)();
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions_1.swaggerOptions);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// middleware
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
}));
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.raw());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
// stating point
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running successful !!",
        data: null,
    });
});
// global error handler
app.use(global_error_handler_1.default);
app.use(not_found_api_1.default);
// export app
exports.default = app;
