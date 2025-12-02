"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSwaggerDocs = void 0;
exports.blogSwaggerDocs = {
    "/api/blog/create": {
        post: {
            tags: ["blog"],
            summary: "Create a blog",
            description: "This API creates a new blog entry.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["title", "category", "readTime", "excerpt", "content"],
                            properties: {
                                title: { type: "string", example: "Understanding MERN Stack" },
                                category: { type: "string", example: "Web Development" },
                                readTime: { type: "string", example: "8 min read" },
                                excerpt: {
                                    type: "string",
                                    example: "A quick intro to MERN...",
                                },
                                content: { type: "string", example: "The MERN stack is..." },
                                imageUrl: {
                                    type: "string",
                                    example: "https://i.ibb.co/example/mern-blog.jpg",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: "Blog created successfully" },
                400: { description: "Validation error" },
                500: { description: "Internal server error" },
            },
        },
    },
    "/api/blog": {
        get: {
            tags: ["blog"],
            summary: "Get all blogs",
            description: "Fetch all blog entries from the database.",
            responses: {
                200: {
                    description: "List of all blogs",
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
                                        title: {
                                            type: "string",
                                            example: "Understanding MERN Stack",
                                        },
                                        category: { type: "string", example: "Web Development" },
                                        readTime: { type: "string", example: "8 min read" },
                                        excerpt: {
                                            type: "string",
                                            example: "A quick introduction to the MERN stack...",
                                        },
                                        content: {
                                            type: "string",
                                            example: "The MERN stack is a combination of MongoDB, Express.js, React, and Node.js...",
                                        },
                                        imageUrl: {
                                            type: "string",
                                            example: "https://i.ibb.co/example/mern-blog.jpg",
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
    "/api/blog/{id}": {
        get: {
            tags: ["blog"],
            summary: "Get blog details by ID",
            description: "Fetch a specific blog using its ID.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the blog",
                },
            ],
            responses: {
                200: {
                    description: "Blog detail fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    _id: { type: "string", example: "674f2bda2c8b9b45d1e88888" },
                                    title: {
                                        type: "string",
                                        example: "Understanding MERN Stack",
                                    },
                                    category: { type: "string", example: "Web Development" },
                                    readTime: { type: "string", example: "8 min read" },
                                    excerpt: { type: "string", example: "A quick intro..." },
                                    content: { type: "string", example: "The MERN stack is..." },
                                    imageUrl: {
                                        type: "string",
                                        example: "https://i.ibb.co/example/mern-blog.jpg",
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
                404: { description: "Blog not found" },
                500: { description: "Internal server error" },
            },
        },
        patch: {
            tags: ["blog"],
            summary: "Update a blog",
            description: "Update an existing blog by ID. All fields are optional.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the blog to update",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string", example: "Updated Title" },
                                category: { type: "string", example: "Updated Category" },
                                readTime: { type: "string", example: "10 min read" },
                                excerpt: { type: "string", example: "Updated excerpt..." },
                                content: { type: "string", example: "Updated content..." },
                                imageUrl: {
                                    type: "string",
                                    example: "https://i.ibb.co/example/updated-blog.jpg",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Blog updated successfully" },
                400: { description: "Validation error" },
                404: { description: "Blog not found" },
                500: { description: "Internal server error" },
            },
        },
        delete: {
            tags: ["blog"],
            summary: "Delete a blog",
            description: "Delete a blog by its ID.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the blog to delete",
                },
            ],
            responses: {
                200: { description: "Blog deleted successfully" },
                404: { description: "Blog not found" },
                500: { description: "Internal server error" },
            },
        },
    },
    "/api/blog/latest": {
        get: {
            tags: ["blog"],
            summary: "Get 3 latest blogs",
            description: "Fetch the 3 most recent blogs from the database.",
            responses: {
                200: {
                    description: "List of 3 latest blogs",
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
                                        title: { type: "string", example: "Latest Blog Title" },
                                        category: { type: "string", example: "Tech" },
                                        readTime: { type: "string", example: "5 min read" },
                                        excerpt: { type: "string", example: "Quick intro..." },
                                        content: {
                                            type: "string",
                                            example: "Blog content here...",
                                        },
                                        imageUrl: {
                                            type: "string",
                                            example: "https://i.ibb.co/example/latest-blog.jpg",
                                        },
                                        createdAt: {
                                            type: "string",
                                            example: "2025-11-08T12:00:00.000Z",
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
};
