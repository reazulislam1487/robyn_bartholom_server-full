import path from "path";
import { configs } from "./app/configs";
import { authSwaggerDocs } from "./app/modules/auth/auth.swagger";
import { userSwaggerDocs } from "./app/modules/user/user.swagger";
import { reviewsSwaggerDocs } from "./app/modules/reviews/reviews.swagger";
import { portfolioSwaggerDocs } from "./app/modules/portfolio/portfolio.swagger";
import { blogSwaggerDocs } from "./app/modules/blog/blog.swagger";
import { bookingSwaggerDocs } from "./app/modules/booking/booking.swagger";
import { emailSwaggerDocs } from "./app/modules/email/email.swagger";
import { analyticsSwaggerDocs } from "./app/modules/analytics/analytics.swagger";
import { caseReviewRequtestSwaggerDocs } from "./app/modules/caseReviewRequtest/caseReviewRequtest.swagger";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Doc - Build with Express CLI",
      version: "1.0.0-Mahid",
      description: "Express API with auto-generated Swagger docs",
    },
    paths: {
      ...authSwaggerDocs,
      ...userSwaggerDocs,
      ...reviewsSwaggerDocs,
      ...portfolioSwaggerDocs,
      ...blogSwaggerDocs,
      ...bookingSwaggerDocs,

            ...emailSwaggerDocs,
            ...analyticsSwaggerDocs,
            ...caseReviewRequtestSwaggerDocs,},
    servers:
      configs.env === "production"
        ? [
            { url: "https://robyn-bartholom-server.onrender.com" },
            { url: "http://localhost:5000" },
          ]
        : [
            { url: "http://localhost:5000" },
            { url: "https://robyn-bartholom-server.onrender.com" },
          ],
    components: {
      securitySchemes: {
        AuthorizationToken: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Put your accessToken here ",
        },
      },
    },
    security: [
      {
        AuthorizationToken: [],
      },
    ],
  },
  apis: [
    path.join(
      __dirname,
      configs.env === "production" ? "./**/*.js" : "./**/*.ts"
    ),
  ],
};
