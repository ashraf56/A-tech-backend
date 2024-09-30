"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = void 0;
const tryCatchWrapper = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error));
    };
};
exports.tryCatchWrapper = tryCatchWrapper;
