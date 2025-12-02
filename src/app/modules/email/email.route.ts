import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { email_controller } from "./email.controller";
import { email_validations } from "./email.validation";
import { email } from "zod";

const email_router = Router();

email_router.post(
  "/create",
  RequestValidator(email_validations.create),
  email_controller.create_new_email
);
email_router.post(
  "/reply",
  RequestValidator(email_validations.create),
  email_controller.create_reply
);
email_router.get("/get-all", email_controller.get_all_emails);
// get email by id
email_router.get("/:id", email_controller.get_email_by_id);
// delete email by id
email_router.delete("/:id", email_controller.delete_email_by_id);
// get dashboard summery 
email_router.get("/dashboard/summary", email_controller.get_dashboard_summary);
export default email_router;
