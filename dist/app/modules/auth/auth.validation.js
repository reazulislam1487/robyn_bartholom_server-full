"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_validation = void 0;
const zod_1 = require("zod");
const login_validation = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
    password: zod_1.z.string({ message: "Password is required" }),
});
const changePassword = zod_1.z.object({
    oldPassword: zod_1.z.string({ message: "Old Password is required" }),
    newPassword: zod_1.z.string({ message: "New Password is required" }),
    confirmNewPassword: zod_1.z.string({ message: "Confirm New Password is required" }),
});
const getProfile = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
});
exports.auth_validation = {
    login_validation,
    changePassword,
    getProfile,
};
