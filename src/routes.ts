import { Router } from "express";
import authRoute from "./app/modules/auth/auth.route";
import userRoute from "./app/modules/user/user.route";
import reviewsRoute from "./app/modules/reviews/reviews.route";
import portfolioRoute from "./app/modules/portfolio/portfolio.route";
import blogRoute from "./app/modules/blog/blog.route";
import bookingRoute from './app/modules/booking/booking.route';
import emailRoute from './app/modules/email/email.route';
import analyticsRoute from './app/modules/analytics/analytics.route';
import caseReviewRequtestRoute from './app/modules/caseReviewRequtest/caseReviewRequtest.route';

const appRouter = Router();

const moduleRoutes = [
    { path: "/caseReviewRequtest", route: caseReviewRequtestRoute },
  { path: "/analytics", route: analyticsRoute },
  { path: "/email", route: emailRoute },
  { path: "/booking", route: bookingRoute },
  { path: "/blog", route: blogRoute },
  { path: "/portfolio", route: portfolioRoute },
  { path: "/reviews", route: reviewsRoute },
  { path: "/auth", route: authRoute },
  { path: "/user", route: userRoute },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;
