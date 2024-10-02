"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const post_validation_1 = require("./post.validation");
const router = (0, express_1.Router)();
router.post('/create-posts', (0, authMiddleware_1.default)('user'), (0, validateRequest_1.default)(post_validation_1.PostValidation.PostCreateSchema));
exports.postRoutes = router;
