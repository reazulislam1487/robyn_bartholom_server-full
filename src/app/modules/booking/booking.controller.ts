import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { booking_service } from "./booking.service";

// create a new booking
const create_new_booking = catchAsync(async (req, res) => {
   
  const result = await booking_service.create_new_booking_into_db(req);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New booking created successfully!",
    data: result,
  });
});

// Get all bookings
const get_all_booking = catchAsync(async (req, res) => {
  const status = req.query.status as
    | "pending"
    | "approved"
    | "rejected"
    | undefined;
  const search = req.query.search as string | undefined;
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

  const result = await booking_service.get_all_booking_from_db(
    status,
    search,
    page,
    limit
  );
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All booking successfully!",
    data: result,
  });
});
// Get recent bookings
const get_recent_booking = catchAsync(async (req, res) => {
  const result = await booking_service.get_recent_booking_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Recent booking successfully!",
    data: result,
  });
});

// get a specific booking by ID
const get_booking_by_id = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await booking_service.get_booking_by_id_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get booking by ID successfully!",
    data: result,
  });
});
// Update booking status
const patch_booking_status = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["accepted", "decline", "completed"];
  if (!validStatuses.includes(status)) {
    return manageResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Invalid status value",
    });
  }

  const result = await booking_service.update_booking_status_from_db(
    id,
    status as any
  );
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Booking status updated to ${status}`,
    data: result,
  });
});
// delete booking by ID
const delete_booking_by_id = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await booking_service.delete_booking_by_id_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully!",
    data: result,
  });
});
const get_booking_trends = catchAsync(async (req, res) => {
  // For simplicity, let's assume booking trends are calculated based on the number of bookings per status
  const trends = await booking_service.get_booking_trends_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking trends fetched successfully!",
    data: trends,
  });
});
const get_booking_consultation_types = catchAsync(async (req, res) => {
  // Fetch distinct consultation types from bookings
  const consultationTypes = await booking_service.get_booking_consultation_types_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultation types fetched successfully!",
    data: consultationTypes,
  });
});
export const booking_controller = {
  create_new_booking,
  get_all_booking,
  get_recent_booking,
  get_booking_by_id,
  patch_booking_status,
  delete_booking_by_id,
  get_booking_trends,
  get_booking_consultation_types
};
