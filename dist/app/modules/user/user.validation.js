"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_validations = void 0;
const zod_1 = require("zod");
const update_user = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    professionalTitle: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    // Notification Preferences
    notificationPreferences: zod_1.z.object().optional(),
});
exports.user_validations = {
    update_user,
};
