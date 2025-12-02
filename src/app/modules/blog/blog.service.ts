import { cloudinary } from "../../configs/cloudinary.config";
import { uploadToCloudinaryBuffer } from "../../utils/cloudinaryUpload";
import deleteFromCloudinary from "../../utils/deleteCloudinary";
import { T_Blog } from "./blog.interface";
import { blog_model } from "./blog.schema";

// Create a new blog
const create_new_blog_into_db = async (
  blogData: T_Blog,
  file?: Express.Multer.File
) => {
  try {
    // initial imageUrl set
    let newImageUrl = "";
    let newPublicId = "";

    // Upload image if exists
    if (file) {
      const uploaded = await uploadToCloudinaryBuffer(file, "blog_images");
      if (uploaded) {
        newImageUrl = uploaded.secure_url;
        newPublicId = uploaded.public_id;
      }
    }
    // Save data
    const dataToSave = {
      ...blogData,
      imageUrl: newImageUrl || blogData.imageUrl,
      publicId: newPublicId,
    };
    const result = await blog_model.create(dataToSave);
    return result;
  } catch (error) {
    console.error("Blog creation error:", error);
    throw error;
  }
};

// update blog

const update_blog_into_db = async (
  blogId: string,
  payload: Partial<T_Blog>,
  file?: Express.Multer.File
) => {
  try {
    const existingBlog = await blog_model.findOne({
      _id: blogId,
    });
    if (!existingBlog) {
      throw new Error("Blog not found");
    }
    // initial imageUrl form previous blog data
    let newImageUrl = existingBlog.imageUrl;
    let newPublicId = existingBlog.publicId;

    // Upload image if exists
    if (file) {
      // Delete old image (if exists)
      if (existingBlog.publicId) {
        await deleteFromCloudinary(existingBlog.publicId);
      }
      const uploaded = await uploadToCloudinaryBuffer(file, "blog_images");
      if (uploaded) {
        newImageUrl = uploaded.secure_url;
        newPublicId = uploaded.public_id;
      }
    }
    // Save data
    const dataToSave = {
      ...payload,
      imageUrl: newImageUrl || payload.imageUrl,
      publicId: newPublicId,
    };
    const result = await blog_model.findByIdAndUpdate(
      blogId,
      dataToSave,
      { new: true } // return updated document
    );
    return result;
  } catch (error) {
    console.error("Blog update error:", error);
    throw error;
  }
};

// Get all blogs
const get_all_blogs_from_db = async () => {
  const result = await blog_model.find();
  return result;
};
const get_detail_from_db = async (id: string) => {
  const result = await blog_model.findById(id);
  return result;
};

const get_three_blogs_from_db = async () => {
  const result = await blog_model.find().limit(3);
  return result;
};

const delete_blog_from_db = async (id: string) => {
  // 1️⃣ Find the portfolio by ID
  const blog = await blog_model.findById(id);
  if (!blog) {
    throw new Error("Portfolio not found");
  }

  if (blog.imageUrl) {
    const publicId = blog.publicId;
    // 3️⃣ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId!);
  }

  // 4️⃣ Delete from MongoDB
  const result = await blog_model.findByIdAndDelete(id);
  return result;
};
export const blog_service = {
  create_new_blog_into_db,
  update_blog_into_db,
  get_all_blogs_from_db,
  get_detail_from_db,
  get_three_blogs_from_db,
  delete_blog_from_db,
};
