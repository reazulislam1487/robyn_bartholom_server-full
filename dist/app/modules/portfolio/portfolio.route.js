"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("./portfolio.controller");
const multerUpload_1 = require("../../middlewares/multerUpload");
const portfolio_router = (0, express_1.Router)();
// create new portfolio
portfolio_router.post("/create", multerUpload_1.multerUpload.single("image"), portfolio_controller_1.portfolio_controller.create_new_portfolio);
// Update a portfolio
portfolio_router.patch("/update/:id", multerUpload_1.multerUpload.single("image"), portfolio_controller_1.portfolio_controller.update_portfolio);
// get all portfolios
portfolio_router.get("/", portfolio_controller_1.portfolio_controller.get_all_portfolio);
// get 4 portfolios
portfolio_router.get("/four-portfolios", portfolio_controller_1.portfolio_controller.get_four_portfolio);
// get all portfolios
portfolio_router.get("/:id", portfolio_controller_1.portfolio_controller.get_specific_portfolio);
// delete portfolio
portfolio_router.delete("/delete/:id", portfolio_controller_1.portfolio_controller.delete_portfolio);
exports.default = portfolio_router;
