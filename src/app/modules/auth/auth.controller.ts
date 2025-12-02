import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { auth_services } from "./auth.service";
import httpStatus from "http-status";

const login_user = catchAsync(async (req, res) => {
  const result = await auth_services.login_user_from_db(req.body);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successful !",
    data: {
      result,
    },
  });
});

const get_my_profile = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await auth_services.get_my_profile_from_db(email);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully!",
    data: result,
  });
});

const change_password = catchAsync(async (req, res) => {
  const result = await auth_services.change_password_from_db(req.body);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully!",
    data: result,
  });
});

export const auth_controllers = {
  login_user,
  get_my_profile,
  change_password,
};
