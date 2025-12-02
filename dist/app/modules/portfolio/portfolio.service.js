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
exports.portfolio_service = void 0;
const cloudinary_config_1 = require("../../configs/cloudinary.config");
const cloudinaryUpload_1 = require("../../utils/cloudinaryUpload");
const deleteCloudinary_1 = __importDefault(require("../../utils/deleteCloudinary"));
const portfolio_schema_1 = require("./portfolio.schema");
//  Create new portfolio data into DB
const create_new_portfolio_into_db = (portfolioData, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newImageUrl = "";
        let newPublicId = "";
        // Upload image if exists
        if (file) {
            const uploaded = yield (0, cloudinaryUpload_1.uploadToCloudinaryBuffer)(file, "portfolio_images");
            if (uploaded) {
                newImageUrl = uploaded.secure_url;
                newPublicId = uploaded.public_id;
            }
        }
        const dataToSave = Object.assign(Object.assign({}, portfolioData), { imageUrl: newImageUrl || portfolioData.imageUrl, publicId: newPublicId });
        const result = yield portfolio_schema_1.portfolio_model.create(dataToSave);
        return result;
    }
    catch (error) {
        console.error("Portfolio creation error:", error);
        throw error;
    }
});
// Update a portfolio
const update_portfolio_from_db = (portfolioId, portfolioData, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingPortfolio = yield portfolio_schema_1.portfolio_model.findOne({
            _id: portfolioId,
        });
        if (!existingPortfolio) {
            throw new Error("Portfolio not found");
        }
        let newImageUrl = existingPortfolio.imageUrl;
        let newPublicId = existingPortfolio.publicId;
        if (file) {
            // Delete old image (if exists)
            if (existingPortfolio.publicId) {
                yield (0, deleteCloudinary_1.default)(existingPortfolio.publicId);
            }
            // upload new file
            const uploaded = (yield (0, cloudinaryUpload_1.uploadToCloudinaryBuffer)(file, "portfolio_images"));
            newImageUrl = uploaded.secure_url;
            newPublicId = uploaded.public_id;
        }
        const dataToUpdate = Object.assign(Object.assign({}, portfolioData), { imageUrl: newImageUrl || portfolioData.imageUrl, publicId: newPublicId || undefined });
        // Update in MongoDB
        const updatedPortfolio = yield portfolio_schema_1.portfolio_model.findByIdAndUpdate(portfolioId, dataToUpdate, { new: true } // return updated document
        );
        if (!updatedPortfolio)
            throw new Error("Portfolio not found");
        return updatedPortfolio;
    }
    catch (error) {
        console.error("Portfolio update error:", error);
        throw error;
    }
});
// Get all portfolios with filtering + pagination
const get_all_portfolios_from_db = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, network = null }) {
    const query = {};
    // 🔍 FILTER BY NETWORK
    if (network) {
        query.network = network;
        // If you want partial match:
        // query.network = { $regex: network, $options: "i" };
    }
    // 📌 PAGINATION
    const skip = (page - 1) * limit;
    // 🗂️ MAIN QUERY
    const data = yield portfolio_schema_1.portfolio_model
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // newest first
    // 📊 TOTAL COUNT
    const total = yield portfolio_schema_1.portfolio_model.countDocuments(query);
    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
// const get_all_portfolios_from_db = async () => {
//   const result = await portfolio_model.find();
//   return result;
// };
const get_specific_portfolios_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_schema_1.portfolio_model.findById(id);
    return result;
});
//  Get 4 portfolios
const get_four_portfolios_from_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_schema_1.portfolio_model.find().limit(4);
    return result;
});
const delete_portfolio_from_db = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ Find the portfolio by ID
    const portfolio = yield portfolio_schema_1.portfolio_model.findById(id);
    if (!portfolio) {
        throw new Error("Portfolio not found");
    }
    if (portfolio.imageUrl) {
        const publicId = portfolio.publicId;
        // 3️⃣ Delete from Cloudinary
        yield cloudinary_config_1.cloudinary.uploader.destroy(publicId);
    }
    // 4️⃣ Delete from MongoDB
    const result = yield portfolio_schema_1.portfolio_model.findByIdAndDelete(id);
    return result;
});
exports.portfolio_service = {
    create_new_portfolio_into_db,
    update_portfolio_from_db,
    get_all_portfolios_from_db,
    get_specific_portfolios_from_db,
    get_four_portfolios_from_db,
    delete_portfolio_from_db,
};
