import { z } from "zod";


const login_validation = z.object({
  email: z.string({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }),
});

const changePassword = z.object({
  oldPassword: z.string({ message: "Old Password is required" }),
  newPassword: z.string({ message: "New Password is required" }),
  confirmNewPassword: z.string({ message: "Confirm New Password is required" }),
});
const getProfile = z.object({
  email: z.string({ message: "Email is required" }),
});

export const auth_validation = {
  login_validation,
  changePassword,
  getProfile,
};
