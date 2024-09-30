"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUservalidationSchema), user_controller_1.UserControllers.RegisterUserController);
router.put('/:id', (0, authMiddleware_1.default)('admin', 'user'), user_controller_1.UserControllers.updateUserController);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidations.LoginvalidationSchema), user_controller_1.UserControllers.LoginUserController);
exports.userRoutes = router;
