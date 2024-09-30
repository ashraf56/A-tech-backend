"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodValidateErrors = (error) => {
    const errorSource = error.issues.map((i) => {
        return {
            // finding last index from path
            path: i.path[(i === null || i === void 0 ? void 0 : i.path.length) - 1],
            message: i.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "our validation error",
        errorSource
    };
};
exports.default = zodValidateErrors;
