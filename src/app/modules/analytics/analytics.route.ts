import { Router } from "express";
import { analytics_controller } from "./analytics.controller";

const analytics_router = Router();

analytics_router.post("/create", analytics_controller.create_new_analytics);
analytics_router.get("", analytics_controller.get_analytics);

export default analytics_router;
