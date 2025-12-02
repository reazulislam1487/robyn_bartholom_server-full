import { Router } from "express";
import { auth_controllers } from "./auth.controller";
import RequestValidator from "../../middlewares/request_validator";
import { auth_validation } from "./auth.validation";

const authRoute = Router();
// Login route
authRoute.post(
  "/login",
  RequestValidator(auth_validation.login_validation),
  auth_controllers.login_user
);

authRoute.get(
  "/me",
  RequestValidator(auth_validation.getProfile),
  auth_controllers.get_my_profile
);

// change password route
authRoute.post(
  "/change-password",
  RequestValidator(auth_validation.changePassword),
  auth_controllers.change_password
);
export default authRoute;
