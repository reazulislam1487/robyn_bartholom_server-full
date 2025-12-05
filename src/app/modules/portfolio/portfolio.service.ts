import { cloudinary } from "../../configs/cloudinary.config";
import { uploadToCloudinaryBuffer } from "../../utils/cloudinaryUpload";
import deleteFromCloudinary from "../../utils/deleteCloudinary";
import { T_Portfolio } from "./portfolio.interface";
import { portfolio_model } from "./portfolio.schema";

//  Create new portfolio data into DB

const create_new_portfolio_into_db = async (
  portfolioData: T_Portfolio,
  file?: Express.Multer.File
) => {
  try {
    let newImageUrl = "";
    let newPublicId = "";

    // Upload image if exists
    if (file) {
      const uploaded = await uploadToCloudinaryBuffer(file, "portfolio_images");
      if (uploaded) {
        newImageUrl = uploaded.secure_url;
        newPublicId = uploaded.public_id;
      }
    }

    const dataToSave = {
      ...portfolioData,
      imageUrl: newImageUrl || portfolioData.imageUrl,
      publicId: newPublicId,
    };
    const result = await portfolio_model.create(dataToSave);
    return result;
  } catch (error) {
    console.error("Portfolio creation error:", error);
    throw error;
  }
};

// Update a portfolio

const update_portfolio_from_db = async (
  portfolioId: string,
  portfolioData: Partial<T_Portfolio>,
  file?: Express.Multer.File
) => {
  try {
    const existingPortfolio = await portfolio_model.findOne({
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
        await deleteFromCloudinary(existingPortfolio.publicId);
      }
      // upload new file
      const uploaded = (await uploadToCloudinaryBuffer(
        file,
        "portfolio_images"
      )) as any;
      newImageUrl = uploaded.secure_url;
      newPublicId = uploaded.public_id;
    }

    const dataToUpdate: any = {
      ...portfolioData,
      imageUrl: newImageUrl || portfolioData.imageUrl,
      publicId: newPublicId || undefined,
    };

    // Update in MongoDB
    const updatedPortfolio = await portfolio_model.findByIdAndUpdate(
      portfolioId,
      dataToUpdate,
      { new: true } // return updated document
    );

    if (!updatedPortfolio) throw new Error("Portfolio not found");
    return updatedPortfolio;
  } catch (error) {
    console.error("Portfolio update error:", error);
    throw error;
  }
};
// Get all portfolios with filtering + pagination
const get_all_portfolios_from_db = async ({
  page = 1,
  limit = 6,
  network = null,
}) => {
  const query: any = {};

  // 🔍 FILTER BY NETWORK
  if (network) {
    query.network = network;
    // If you want partial match:
    // query.network = { $regex: network, $options: "i" };
  }

  // 📌 PAGINATION
  const skip = (page - 1) * limit;

  // 🗂️ MAIN QUERY
  const data = await portfolio_model
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // newest first

  // 📊 TOTAL COUNT
  const total = await portfolio_model.countDocuments(query);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// const get_all_portfolios_from_db = async () => {

//   const result = await portfolio_model.find();
//   return result;
// };
const get_specific_portfolios_from_db = async (id: string) => {
  const result = await portfolio_model.findById(id);
  return result;
};
//  Get 4 portfolios
const get_four_portfolios_from_db = async () => {
  const result = await portfolio_model.find().limit(4);
  return result;
};

const delete_portfolio_from_db = async (id: string) => {
  // 1️⃣ Find the portfolio by ID
  const portfolio = await portfolio_model.findById(id);
  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  if (portfolio.imageUrl) {
    const publicId = portfolio.publicId;
    // 3️⃣ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId!);
  }

  // 4️⃣ Delete from MongoDB
  const result = await portfolio_model.findByIdAndDelete(id);

  return result;
};
export const portfolio_service = {
  create_new_portfolio_into_db,
  update_portfolio_from_db,
  get_all_portfolios_from_db,
  get_specific_portfolios_from_db,
  get_four_portfolios_from_db,
  delete_portfolio_from_db,
};
