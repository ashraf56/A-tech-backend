"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const router = (0, express_1.Router)();
router.post('/create-blog', (0, authMiddleware_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.BlogCreateSchema), blog_controller_1.BlogControllers.CreateBlogController);
router.put('/:id', (0, authMiddleware_1.default)('user'), blog_controller_1.BlogControllers.commentPostController);
router.patch('/:id/upvote', blog_controller_1.BlogControllers.upVoteCOntroller);
router.get('/', blog_controller_1.BlogControllers.GetallBlogsController);
router.get('/:id', blog_controller_1.BlogControllers.GetSingleBlogsController);
router.delete('/:id', (0, authMiddleware_1.default)('user', 'admin'), blog_controller_1.BlogControllers.commentDeleteController);
exports.blogRoutes = router;
