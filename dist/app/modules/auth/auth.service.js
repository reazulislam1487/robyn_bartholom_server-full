"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_services = exports.get_my_profile_from_db = exports.change_password_from_db = exports.login_user_from_db = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../user/user.schema");
const isAccountExist_1 = require("../../utils/isAccountExist");
const login_user_from_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. find user by email
    const user = yield user_schema_1.User_Model.findOne({
        email: payload.email,
    }).exec();
    // 2. if no user -> generic error
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // 3. compare hashed password using bcrypt
    const isMatch = yield bcrypt_1.default.compare(String(payload.password), String(user.password));
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    // 4. remove password before returning
    const userObj = user.toObject ? user.toObject() : Object.assign({}, user);
    delete userObj.password;
    // 5. success response
    return {
        message: "Login successful ",
        user: userObj,
    };
});
exports.login_user_from_db = login_user_from_db;
// change password
const change_password_from_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. find user
    const user = yield user_schema_1.User_Model.findOne({ email: payload.email }).exec();
    if (!user) {
        throw new Error("User not found");
    }
    // 2. verify old password
    const isMatch = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }
    // 3. confirm new passwords match
    if (payload.newPassword !== payload.confirmNewPassword) {
        throw new Error("New passwords do not match");
    }
    // 4. Old password and new password cannot be the same
    if (payload.oldPassword === payload.newPassword ||
        payload.oldPassword === payload.confirmNewPassword) {
        throw new Error("Old password and new password cannot be the same");
    }
    // 4. hash the new password
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 10);
    // 5. update password in DB
    user.password = hashedPassword;
    yield user.save();
    // 6. return success message
    return {
        message: "Password changed successfully ✅",
    };
});
exports.change_password_from_db = change_password_from_db;
const get_my_profile_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ Check if account exists
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(email);
    if (!isExistAccount) {
        throw new Error("Account not found");
    }
    // 4. remove password before returning
    const accountObj = isExistAccount.toObject
        ? isExistAccount.toObject()
        : Object.assign({}, isExistAccount);
    delete accountObj.password;
    // 4️⃣ Return object similar to your pattern
    return {
        profile: accountObj,
    };
});
exports.get_my_profile_from_db = get_my_profile_from_db;
exports.auth_services = {
    login_user_from_db: exports.login_user_from_db,
    get_my_profile_from_db: exports.get_my_profile_from_db,
    change_password_from_db: exports.change_password_from_db,
};
