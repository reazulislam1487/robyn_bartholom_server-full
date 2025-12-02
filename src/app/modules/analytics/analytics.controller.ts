import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { analytics_service } from "./analytics.service";

const create_new_analytics = catchAsync(async (req, res) => {
  const result = await analytics_service.create_new_analytics_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New analytics created successfully!",
    data: result,
  });
});
const get_analytics = catchAsync(async (req, res) => {
  const result = await analytics_service.get_analytics_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Analytics fetched successfully!",
    data: result,
  });
});

export const analytics_controller = { create_new_analytics, get_analytics };
