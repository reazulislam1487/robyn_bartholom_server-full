export const reviewsSwaggerDocs = {
  "/api/reviews/create": {
    post: {
      tags: ["reviews"],
      summary: "reviews create",
      description: "This is auto generated reviews create API",
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "John Doe" } } } } } },
      responses: { 201: { description: "reviews created successfully" }, 400: { description: "Validation error" } }
    }
  },
  
  "/api/reviews": {
    get: {
      tags: ["reviews"],
      summary: "Get all reviews",
      description: "Fetch all reviews from the database.",
      responses: {
        200: {
          description: "List of all reviews",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: { type: "string", example: "674f2bda2c8b9b45d1e88888" },
                    userId: { type: "string", example: "674f2a8e2c8b9b45d1e12345" },
                    productId: { type: "string", example: "674f2ab92c8b9b45d1e67890" },
                    comment: { type: "string", example: "Great product and fast delivery." },
                    createdAt: { type: "string", example: "2025-11-04T10:00:00.000Z" },
                  },
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
  },
};