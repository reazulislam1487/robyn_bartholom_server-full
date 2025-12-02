"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSwaggerDocs = void 0;
exports.authSwaggerDocs = {
    "/api/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Login a user",
            description: "Authenticate user with email and password.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email", "password"],
                            properties: {
                                email: { type: "string", example: "user@example.com" },
                                password: { type: "string", example: "secret123" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "User logged in successfully" },
                401: { description: "Invalid credentials" },
            },
        },
    },
    "/api/auth/me": {
        get: {
            tags: ["Auth"],
            summary: "Get logged-in user's profile",
            description: "Fetch the authenticated user's profile details.",
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: "Profile data retrieved successfully" },
                401: { description: "Unauthorized" },
            },
        },
    },
    "/api/auth/change-password": {
        post: {
            tags: ["Auth"],
            summary: "Change password (authenticated users)",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["oldPassword", "newPassword"],
                            properties: {
                                oldPassword: { type: "string", example: "oldPass123" },
                                newPassword: { type: "string", example: "newPass456" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Password changed successfully" },
                400: { description: "Invalid old password or bad request" },
            },
        },
    },
};
