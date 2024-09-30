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
exports.UsersService = void 0;
const config_1 = __importDefault(require("../../config/config"));
const throwError_1 = __importDefault(require("../../utills/throwError"));
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegisterUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserexist = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserexist) {
        return (0, throwError_1.default)('this  email already Registered');
    }
    const createUser = user_model_1.User.create(payload);
    return createUser;
});
const logIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findOne({ email: payload.email });
    if (!users) {
        (0, throwError_1.default)('User not found');
    }
    const passwordMatcher = yield user_model_1.User.isMatchpass(payload.password, users === null || users === void 0 ? void 0 : users.password);
    if (!passwordMatcher) {
        (0, throwError_1.default)('password not match');
    }
    const tokenplayload = {
        id: users === null || users === void 0 ? void 0 : users._id,
        role: users === null || users === void 0 ? void 0 : users.role
    };
    const token = jsonwebtoken_1.default.sign(tokenplayload, config_1.default.JWT_sec_Token, { expiresIn: '365D' });
    return {
        token, users
    };
});
const updateUserDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
exports.UsersService = {
    RegisterUserDB,
    logIn,
    updateUserDB
};
