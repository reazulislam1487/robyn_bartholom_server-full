"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioSwaggerDocs = void 0;
exports.portfolioSwaggerDocs = {
    // API to create a new portfolio
    "/api/portfolio/create": {
        post: {
            tags: ["portfolio"],
            summary: "portfolio create",
            description: "This is auto generated portfolio create API",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["name"],
                            properties: { name: { type: "string", example: "John Doe" } },
                        },
                    },
                },
            },
            responses: {
                201: { description: "portfolio created successfully" },
                400: { description: "Validation error" },
            },
        },
    },
    // Update
    "/api/portfolio/update/{id}": {
        patch: {
            tags: ["portfolio"],
            summary: "Update portfolio",
            description: "This is auto generated portfolio update API",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the portfolio to update",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string", example: "My Portfolio Title" },
                                network: { type: "string", example: "LinkedIn" },
                                year: { type: "number", example: 2025 },
                                role: { type: "string", example: "Developer" },
                                description: {
                                    type: "string",
                                    example: "Portfolio description here",
                                },
                                imageUrl: {
                                    type: "string",
                                    example: "https://example.com/image.png",
                                },
                                status: { type: "string", example: "active" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Portfolio updated successfully" },
                400: { description: "Validation error" },
                404: { description: "Portfolio not found" },
            },
        },
    },
    // API to get all portfolios
    "/api/portfolio": {
        get: {
            tags: ["portfolio"],
            summary: "Get all portfolios",
            description: "Fetch all portfolio entries from the database.",
            responses: {
                200: {
                    description: "List of all portfolios",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string",
                                            example: "674f2bda2c8b9b45d1e88888",
                                        },
                                        title: { type: "string", example: "GreenCircle Web App" },
                                        network: { type: "string", example: "Freelancer" },
                                        year: { type: "number", example: 2025 },
                                        role: { type: "string", example: "Full Stack Developer" },
                                        description: {
                                            type: "string",
                                            example: "Developed a MERN stack gardening platform.",
                                        },
                                        image: {
                                            type: "string",
                                            example: "https://i.ibb.co/greencircle.jpg",
                                        },
                                        createdAt: {
                                            type: "string",
                                            example: "2025-11-04T10:00:00.000Z",
                                        },
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
    //get 4 portfolio
    "/api/portfolio/four-portfolios": {
        get: {
            tags: ["portfolio"],
            summary: "Get Only Four portfolios",
            description: "Fetch Only Four portfolios entries from the database.",
            responses: {
                200: {
                    description: "List of Only Four portfolios",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string",
                                            example: "674f2bda2c8b9b45d1e88888",
                                        },
                                        title: { type: "string", example: "GreenCircle Web App" },
                                        network: { type: "string", example: "Freelancer" },
                                        year: { type: "number", example: 2025 },
                                        role: { type: "string", example: "Full Stack Developer" },
                                        description: {
                                            type: "string",
                                            example: "Developed a MERN stack gardening platform.",
                                        },
                                        image: {
                                            type: "string",
                                            example: "https://i.ibb.co/greencircle.jpg",
                                        },
                                        createdAt: {
                                            type: "string",
                                            example: "2025-11-04T10:00:00.000Z",
                                        },
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
    // delete portfolio
    "/api/portfolio/delete/{id}": {
        delete: {
            tags: ["portfolio"],
            summary: "Delete portfolio",
            description: "This endpoint deletes a portfolio by its ID.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "The ID of the portfolio to delete",
                    schema: {
                        type: "string",
                        example: "654a1b2c3d4e5f6g7h8i9j0k",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Portfolio deleted successfully",
                },
                404: {
                    description: "Portfolio not found",
                },
                500: {
                    description: "Internal server error",
                },
            },
        },
    },
};
