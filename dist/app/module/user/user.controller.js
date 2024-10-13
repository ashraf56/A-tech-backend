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
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const tryCatchWrapper_1 = require("../../utills/tryCatchWrapper");
const user_service_1 = require("./user.service");
const RegisterUserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.UsersService.RegisterUserDB(payload);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User registered successfully",
        data: result
    });
}));
const LoginUserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.UsersService.logIn(payload);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Logged in successfully",
        data: result,
    });
}));
const updateUserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const result = yield user_service_1.UsersService.updateUserDB(id, payload);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User info updated successfully",
        data: result,
    });
}));
const SingleUserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UsersService.SingleUserDB(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User info rettrived successfully",
        data: result,
    });
}));
const AllUsersController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UsersService.AllUsers();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users info rettrived successfully",
        data: result,
    });
}));
exports.UserControllers = {
    RegisterUserController,
    LoginUserController,
    updateUserController,
    SingleUserController,
    AllUsersController
};
