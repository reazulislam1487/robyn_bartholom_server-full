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
exports.analytics_service = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const analytics_schema_1 = require("./analytics.schema");
const create_new_analytics_into_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentMonth = (0, dayjs_1.default)().format("YYYY-MM");
    // const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");
    const result = yield analytics_schema_1.analytics_model.findOneAndUpdate({ month: currentMonth }, { $inc: { views: 1 } }, { new: true, upsert: true });
    return result.views || 0;
});
const get_analytics_into_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentMonth = (0, dayjs_1.default)().format("YYYY-MM");
    const lastMonth = (0, dayjs_1.default)().subtract(1, "month").format("YYYY-MM");
    const thisMonthDoc = yield analytics_schema_1.analytics_model.findOne({
        month: currentMonth,
    });
    const lastMonthDoc = yield analytics_schema_1.analytics_model.findOne({
        month: lastMonth,
    });
    const thisMonthViews = (thisMonthDoc === null || thisMonthDoc === void 0 ? void 0 : thisMonthDoc.views) || 0;
    const lastMonthViews = (lastMonthDoc === null || lastMonthDoc === void 0 ? void 0 : lastMonthDoc.views) || 0;
    return { thisMonthViews, lastMonthViews };
});
exports.analytics_service = {
    create_new_analytics_into_db,
    get_analytics_into_db,
};
