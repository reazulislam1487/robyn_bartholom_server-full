import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { case_review_requtest_validations } from "./caseReviewRequtest.validation";
import { case_review_requtest_controller } from "./caseReviewRequtest.controller";
import { multerUpload } from "../../middlewares/multerUpload";

const router = Router();

router.post(
  "/create",
  multerUpload.array("documents", 10), // accept multiple files
  // RequestValidator(case_review_requtest_validations.create), // optional
  case_review_requtest_controller.create_new_case_review_requtest
);

export default router;
