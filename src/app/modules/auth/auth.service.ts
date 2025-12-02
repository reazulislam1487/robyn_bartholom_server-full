import { TLoginPayload } from "./auth.interface";
import bcrypt from "bcrypt";
import { User_Model } from "../user/user.schema";
import { isAccountExist } from "../../utils/isAccountExist";

export const login_user_from_db = async (payload: TLoginPayload) => {
  // 1. find user by email
  const user = await User_Model.findOne({
    email: payload.email,
  }).exec();

  // 2. if no user -> generic error
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 3. compare hashed password using bcrypt
  const isMatch = await bcrypt.compare(
    String(payload.password),
    String(user.password)
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // 4. remove password before returning
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete (userObj as any).password;

  // 5. success response
  return {
    message: "Login successful ",
    user: userObj,
  };
};

// change password
export const change_password_from_db = async (payload: {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  // 1. find user
  const user = await User_Model.findOne({ email: payload.email }).exec();

  if (!user) {
    throw new Error("User not found");
  }

  // 2. verify old password
  const isMatch = await bcrypt.compare(payload.oldPassword, user.password!);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }
  // 3. confirm new passwords match
  if (payload.newPassword !== payload.confirmNewPassword) {
    throw new Error("New passwords do not match");
  }

  // 4. Old password and new password cannot be the same
  if (
    payload.oldPassword === payload.newPassword ||
    payload.oldPassword === payload.confirmNewPassword
  ) {
    throw new Error("Old password and new password cannot be the same");
  }

  // 4. hash the new password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  // 5. update password in DB
  user.password = hashedPassword;
  await user.save();

  // 6. return success message
  return {
    message: "Password changed successfully ✅",
  };
};

export const get_my_profile_from_db = async (email: string) => {
  // 1️⃣ Check if account exists
  const isExistAccount = await isAccountExist(email);

  if (!isExistAccount) {
    throw new Error("Account not found");
  }

  // 4. remove password before returning
  const accountObj = isExistAccount.toObject
    ? isExistAccount.toObject()
    : { ...isExistAccount };
  delete (accountObj as any).password;

  // 4️⃣ Return object similar to your pattern
  return {
    profile: accountObj,
  };
};
export const auth_services = {
  login_user_from_db,
  get_my_profile_from_db,
  change_password_from_db,
};
