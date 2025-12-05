import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { portfolio_service } from "./portfolio.service";
import { Request } from "express";
import { portfolio_validations } from "./portfolio.validation";

// create new portfolio
const create_new_portfolio = catchAsync(async (req: Request, res) => {
  // 1️⃣ Parse JSON from FormData
  const parsedData = JSON.parse((req.body as any)?.data || "{}");

  // 2️⃣ Validate with Zod
  const validatedData = portfolio_validations.create.parse(parsedData);

  // 3️⃣ Call service with validated data + optional file
  const result = await portfolio_service.create_new_portfolio_into_db(
    validatedData,
    (req as any).file
  );

  // 4️⃣ Send response
  manageResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New portfolio created successfully!",
    data: result,
  });
});

// update a portfolio
const update_portfolio = catchAsync(async (req: Request, res) => {
  const portfolioId = req.params.id;

  // 1️⃣ Parse JSON from FormData
  const parsedData = JSON.parse((req.body as any)?.data || "{}");

  // 2️⃣ Validate with Zod (partial for update)
  const validatedData = portfolio_validations.update.parse(parsedData);

  // 3️⃣ Call service with validated data + optional file
  const result = await portfolio_service.update_portfolio_from_db(
    portfolioId,
    validatedData,
    (req as any).file
  );

  // 4️⃣ Send response
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Portfolio updated successfully!",
    data: result,
  });
});

// Get all portfolios
const get_all_portfolio = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const network = req.query.network || null;

  const result = await portfolio_service.get_all_portfolios_from_db({
    page,
    limit,
    network: network as any,
  });

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all portfolios successfully!",
    data: result,
  });
});

const get_specific_portfolio = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await portfolio_service.get_specific_portfolios_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a Specific portfolio successfully!",
    data: result,
  });
});

// get 4 portfolio
const get_four_portfolio = catchAsync(async (req, res) => {
  const result = await portfolio_service.get_four_portfolios_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get only 4 portfolios successfully!",
    data: result,
  });
});

const delete_portfolio = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await portfolio_service.delete_portfolio_from_db(id);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted portfolio successfully!",
    data: result,
  });
});
export const portfolio_controller = {
  create_new_portfolio,
  update_portfolio,
  get_all_portfolio,
  get_specific_portfolio,
  get_four_portfolio,
  delete_portfolio,
};
