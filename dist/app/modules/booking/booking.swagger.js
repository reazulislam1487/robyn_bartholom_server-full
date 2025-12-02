"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSwaggerDocs = void 0;
exports.bookingSwaggerDocs = {
    "/api/booking/create": {
        post: {
            tags: ["booking"],
            summary: "booking create",
            description: "This is auto generated booking create API",
            requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "John Doe" } } } } } },
            responses: { 201: { description: "booking created successfully" }, 400: { description: "Validation error" } }
        }
    }
};
