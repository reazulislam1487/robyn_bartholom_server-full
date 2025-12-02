import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { reviews_service } from "./reviews.service";

const create_new_reviews = catchAsync(async (req, res) => {
  const result = await reviews_service.create_new_reviews_into_db(req.body);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New reviews created successfully!",
    data: result,
  });
});
const get_all_reviews = catchAsync(async (req, res) => {
  const status = req.query.status as
    | "pending"
    | "approved"
    | "rejected"
    | undefined;
  const search = req.query.search as string | undefined;
  const page = req.query.page
    ? parseInt(req.query.page as string, 10)
    : undefined;
     const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;
  const result = await reviews_service.get_all_reviews_from_db(
    status,
    search,
    page,
    limit
  );
  // console.log("Get all Reviews:", result);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews successfully get !",
    data: result,
  });
});

const update_reviews_status_by_id = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["approved", "rejected", "deleted"];
  if (!validStatuses.includes(status)) {
    return manageResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Invalid status. Valid statuses are: ${validStatuses.join(
        ", "
      )}`,
    });
  }

  const result = await reviews_service.update_reviews_status_in_db(id, status);
  if (!result) {
    return manageResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Review not found",
      data: null,
    });
  }
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review status updated successfully!",
    data: result,
  });
});
const get_review_by_id = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviews_service.get_review_by_id_from_db(id);
  if (!result) {
    return manageResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Review not found",
      data: null,
    });
  }
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review successfully retrieved!",
    data: result,
  });
});


export const reviews_controller = {
  create_new_reviews,
  get_all_reviews,
  update_reviews_status_by_id,
  get_review_by_id,
  
};
