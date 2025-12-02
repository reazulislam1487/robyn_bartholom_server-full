"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSwaggerDocs = void 0;
exports.emailSwaggerDocs = {
    "/api/email/create": {
        post: {
            tags: ["email"],
            summary: "email create",
            description: "This is auto generated email create API",
            requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "John Doe" } } } } } },
            responses: { 201: { description: "email created successfully" }, 400: { description: "Validation error" } }
        }
    }
};
