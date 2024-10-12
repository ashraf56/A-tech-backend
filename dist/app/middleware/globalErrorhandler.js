"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const zod_1 = require("zod");
const zodErrors_1 = __importDefault(require("../errors/zodErrors"));
const globalErrorhandler = ((error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "something error";
    // default error path
    let errorSource = [
        {
            path: '',
            message: message
        }
    ];
    if (error instanceof zod_1.ZodError) {
        const errs = (0, zodErrors_1.default)(error);
        statusCode = errs === null || errs === void 0 ? void 0 : errs.statusCode;
        message = errs === null || errs === void 0 ? void 0 : errs.message;
        errorSource = errs === null || errs === void 0 ? void 0 : errs.errorSource;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config_1.default.Node_Env === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null
    });
});
exports.default = globalErrorhandler;
