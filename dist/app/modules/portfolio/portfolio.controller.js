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
exports.portfolio_controller = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const http_status_1 = __importDefault(require("http-status"));
const portfolio_service_1 = require("./portfolio.service");
const portfolio_validation_1 = require("./portfolio.validation");
// create new portfolio
const create_new_portfolio = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 1️⃣ Parse JSON from FormData
    const parsedData = JSON.parse(((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) || "{}");
    // 2️⃣ Validate with Zod
    const validatedData = portfolio_validation_1.portfolio_validations.create.parse(parsedData);
    // 3️⃣ Call service with validated data + optional file
    const result = yield portfolio_service_1.portfolio_service.create_new_portfolio_into_db(validatedData, req.file);
    // 4️⃣ Send response
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "New portfolio created successfully!",
        data: result,
    });
}));
// update a portfolio
const update_portfolio = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const portfolioId = req.params.id;
    // 1️⃣ Parse JSON from FormData
    const parsedData = JSON.parse(((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) || "{}");
    // 2️⃣ Validate with Zod (partial for update)
    const validatedData = portfolio_validation_1.portfolio_validations.update.parse(parsedData);
    // 3️⃣ Call service with validated data + optional file
    const result = yield portfolio_service_1.portfolio_service.update_portfolio_from_db(portfolioId, validatedData, req.file);
    // 4️⃣ Send response
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Portfolio updated successfully!",
        data: result,
    });
}));
// Get all portfolios
const get_all_portfolio = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const network = req.query.network || null;
    const result = yield portfolio_service_1.portfolio_service.get_all_portfolios_from_db({
        page,
        limit,
        network: network,
    });
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get all portfolios successfully!",
        data: result,
    });
}));
const get_specific_portfolio = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield portfolio_service_1.portfolio_service.get_specific_portfolios_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get a Specific portfolio successfully!",
        data: result,
    });
}));
// get 4 portfolio
const get_four_portfolio = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.portfolio_service.get_four_portfolios_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get only 4 portfolios successfully!",
        data: result,
    });
}));
const delete_portfolio = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield portfolio_service_1.portfolio_service.delete_portfolio_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Deleted portfolio successfully!",
        data: result,
    });
}));
exports.portfolio_controller = {
    create_new_portfolio,
    update_portfolio,
    get_all_portfolio,
    get_specific_portfolio,
    get_four_portfolio,
    delete_portfolio,
};
