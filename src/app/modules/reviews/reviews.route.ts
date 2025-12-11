import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { reviews_controller } from "./reviews.controller";
import { reviews_validations } from "./reviews.validation";

const reviews_router = Router();

reviews_router.post(
  "/create",
  RequestValidator(reviews_validations.create),
  reviews_controller.create_new_reviews
);
// Get all reviews with optional status and search query
reviews_router.get("/", reviews_controller.get_all_reviews);
// update reviews status by ID
reviews_router.patch("/:id", reviews_controller.update_reviews_status_by_id);
// get review by
reviews_router.get("/:id", reviews_controller.get_review_by_id);
reviews_router.delete("/:id", reviews_controller.delete_review_by_id);

export default reviews_router;
