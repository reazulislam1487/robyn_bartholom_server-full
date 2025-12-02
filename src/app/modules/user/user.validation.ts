import { z } from "zod";

const update_user = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  professionalTitle: z.string().optional(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  // Notification Preferences
  notificationPreferences: z.object().optional(),
});

export const user_validations = {
  update_user,
};
