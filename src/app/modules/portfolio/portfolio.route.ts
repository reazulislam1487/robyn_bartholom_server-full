import { Router } from "express";
import { portfolio_controller } from "./portfolio.controller";
import { multerUpload } from "../../middlewares/multerUpload";

const portfolio_router = Router();

// create new portfolio
portfolio_router.post(
  "/create",
  multerUpload.single("image"),
  portfolio_controller.create_new_portfolio
);
// Update a portfolio
portfolio_router.patch(
  "/update/:id",
  multerUpload.single("image"),
  portfolio_controller.update_portfolio
);

// get all portfolios
portfolio_router.get("/", portfolio_controller.get_all_portfolio);
// get 4 portfolios
portfolio_router.get(
  "/four-portfolios",
  portfolio_controller.get_four_portfolio
);
// get all portfolios
portfolio_router.get("/:id", portfolio_controller.get_specific_portfolio);

// delete portfolio
portfolio_router.delete("/delete/:id", portfolio_controller.delete_portfolio);
export default portfolio_router;
