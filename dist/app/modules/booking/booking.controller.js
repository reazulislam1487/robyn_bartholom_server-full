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
exports.booking_controller = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const http_status_1 = __importDefault(require("http-status"));
const booking_service_1 = require("./booking.service");
// create a new booking
const create_new_booking = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.booking_service.create_new_booking_into_db(req);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New booking created successfully!",
        data: result,
    });
}));
// Get all bookings
const get_all_booking = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status;
    const search = req.query.search;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const result = yield booking_service_1.booking_service.get_all_booking_from_db(status, search, page, limit);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get All booking successfully!",
        data: result,
    });
}));
// Get recent bookings
const get_recent_booking = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.booking_service.get_recent_booking_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get Recent booking successfully!",
        data: result,
    });
}));
// get a specific booking by ID
const get_booking_by_id = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.booking_service.get_booking_by_id_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get booking by ID successfully!",
        data: result,
    });
}));
// Update booking status
const patch_booking_status = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["accepted", "decline", "completed"];
    if (!validStatuses.includes(status)) {
        return (0, manage_response_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Invalid status value",
        });
    }
    const result = yield booking_service_1.booking_service.update_booking_status_from_db(id, status);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Booking status updated to ${status}`,
        data: result,
    });
}));
// delete booking by ID
const delete_booking_by_id = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.booking_service.delete_booking_by_id_from_db(id);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking deleted successfully!",
        data: result,
    });
}));
const get_booking_trends = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // For simplicity, let's assume booking trends are calculated based on the number of bookings per status
    const trends = yield booking_service_1.booking_service.get_booking_trends_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking trends fetched successfully!",
        data: trends,
    });
}));
const get_booking_consultation_types = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch distinct consultation types from bookings
    const consultationTypes = yield booking_service_1.booking_service.get_booking_consultation_types_from_db();
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Consultation types fetched successfully!",
        data: consultationTypes,
    });
}));
exports.booking_controller = {
    create_new_booking,
    get_all_booking,
    get_recent_booking,
    get_booking_by_id,
    patch_booking_status,
    delete_booking_by_id,
    get_booking_trends,
    get_booking_consultation_types
};
