"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsSwaggerDocs = void 0;
exports.analyticsSwaggerDocs = {
    "/api/analytics/create": {
        post: {
            tags: ["analytics"],
            summary: "analytics create",
            description: "This is auto generated analytics create API",
            requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "John Doe" } } } } } },
            responses: { 201: { description: "analytics created successfully" }, 400: { description: "Validation error" } }
        }
    }
};
