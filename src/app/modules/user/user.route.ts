import { NextFunction, Request, Response, Router } from "express";
import { user_controllers } from "./user.controller";
import { user_validations } from "./user.validation";
import { multerUpload } from "../../middlewares/multerUpload";

const userRoute = Router();

userRoute.patch(
  "/update-profile",
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = user_validations.update_user.parse(JSON.parse(req?.body.data));
    user_controllers.update_profile(req, res, next);
  }
);
// update user Notification Preferences
userRoute.patch(
  "/update-notification-preferences",
  (req: Request, res: Response, next: NextFunction) => {
    user_controllers.update_notification_preferences(req, res, next);
  }
);
export default userRoute;
