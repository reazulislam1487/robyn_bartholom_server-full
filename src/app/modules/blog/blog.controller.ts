import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { blog_service } from "./blog.service";
import { blog_validations } from "./blog.validation";
import { T_Blog } from "./blog.interface";
// create new blog
const create_new_blog = catchAsync(async (req, res) => {
  // 1️⃣ Parse JSON from FormData
  const parsedData = JSON.parse((req.body as any)?.data || "{}");

  // 2️⃣ Validate with Zod
  const validatedData = blog_validations.createBlogSchema.parse(parsedData);

  const result = await blog_service.create_new_blog_into_db(
    validatedData,
    (req as any).file
  );
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New blog created successfully!",
    data: result,
  });
});

// update a blog
const update_blog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const parsedData = JSON.parse((req.body as any)?.data || "{}");

  const validatedData = blog_validations.updateBlogSchema.parse(parsedData);

  const result = await blog_service.update_blog_into_db(
    blogId,
    validatedData as Partial<T_Blog>,
    (req as any).file
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully!",
    data: result,
  });
});

// Get all blogs
const get_all_blog = catchAsync(async (req, res) => {
  const result = await blog_service.get_all_blogs_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all blogs successfully!",
    data: result,
  });
});
const get_detail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blog_service.get_detail_from_db(id);
  if (!result) {
    return manageResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Blog not found",
      data: null,
    });
  }
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a specific blog successfully!",
    data: result,
  });
});

const get_three_blogs = catchAsync(async (req, res) => {
  const result = await blog_service.get_three_blogs_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get only Three successfully!",
    data: result,
  });
});
const delete_blog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blog_service.delete_blog_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Deleted successfully!",
    data: result,
  });
});

export const blog_controller = {
  create_new_blog,
  update_blog,
  get_all_blog,
  get_detail,
  get_three_blogs,
  delete_blog,
};
