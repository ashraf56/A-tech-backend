"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post('/create-category', (0, authMiddleware_1.default)('admin'), (0, validateRequest_1.default)(category_validation_1.Categoryvalidation.CreateCategoryvalidationSchema), category_controller_1.CategoryControllers.CreateCategoryController);
router.get('/:id', (0, authMiddleware_1.default)('admin'), category_controller_1.CategoryControllers.SingleCategoryController);
router.get('/', category_controller_1.CategoryControllers.getAllCategoryController);
exports.categoryRoutes = router;
