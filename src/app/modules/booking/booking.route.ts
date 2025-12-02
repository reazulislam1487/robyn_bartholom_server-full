import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { booking_controller } from "./booking.controller";
import { booking_validations } from "./booking.validation";

const booking_router = Router();

booking_router.post(
  "/create",
  RequestValidator(booking_validations.create),
  booking_controller.create_new_booking
);
booking_router.get("/", booking_controller.get_all_booking);
booking_router.get("/recent", booking_controller.get_recent_booking);
// get booking trends
booking_router.get("/trends", booking_controller.get_booking_trends);
// get Consultation Types
booking_router.get("/consultation", booking_controller.get_booking_consultation_types);
// update booking status
booking_router.patch("/:id", booking_controller.patch_booking_status);
booking_router.get("/:id", booking_controller.get_booking_by_id);
booking_router.delete("/:id", booking_controller.delete_booking_by_id);

export default booking_router;
