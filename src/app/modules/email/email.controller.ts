import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { email_service } from "./email.service";

const create_new_email = catchAsync(async (req, res) => {
  const result = await email_service.create_new_email_into_db(req.body);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New email created successfully!",
    data: result,
  });
});
const create_reply = catchAsync(async (req, res) => {
  const { id, replyMessage } = req.body;
  console.log(id, replyMessage);

  const result = await email_service.create_reply_in_db(id, replyMessage);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply sent successfully!",
    data: result,
  });
});

const get_all_emails = catchAsync(async (req, res) => {
  const search = req.query.search as string | undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 4) : 4;
  const result = await email_service.get_all_emails_from_db(search, limit);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All emails fetched successfully!",
    data: result,
  });
});
// get email by id
const get_email_by_id = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await email_service.get_email_by_id_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Email fetched successfully!",
    data: result,
  });
});
// delete email by id
const delete_email_by_id = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await email_service.delete_email_by_id_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Email deleted successfully!",
    data: result,
  });
});
// get dashboard summery
const get_dashboard_summary =   catchAsync(async (req, res) => {
  const result = await email_service.get_dashboard_summary_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard summary fetched successfully!",
    data: result,
  });
});
export const email_controller = {
  create_new_email,
  get_all_emails,
  create_reply,
  get_email_by_id,
  delete_email_by_id,
  get_dashboard_summary
};
