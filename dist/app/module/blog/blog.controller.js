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
exports.BlogControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const tryCatchWrapper_1 = require("../../utills/tryCatchWrapper");
const blog_service_1 = require("./blog.service");
const CreateBlogController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield blog_service_1.Blogservices.createBlogDB(payload, req.user.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Blog Crated success",
        data: result
    });
}));
const GetallBlogsController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.Blogservices.getAllBlogsDB(req.query);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Blogs retrived successfully",
        data: result
    });
}));
const GetSingleBlogsController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.Blogservices.getSingleBlogsDB(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Blog retrived successfully",
        data: result
    });
}));
const commentPostController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    console.log(payload);
    const result = yield blog_service_1.Blogservices.commentPostDB(payload, id, req.user.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "your comment successfully posted",
        data: result
    });
}));
const commentDeleteController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const commentId = req.body;
    const result = yield blog_service_1.Blogservices.DeleteCommentDB(commentId, id);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "your comment successfully deleted",
        data: result
    });
}));
exports.BlogControllers = {
    CreateBlogController,
    GetallBlogsController,
    commentPostController,
    commentDeleteController,
    GetSingleBlogsController
};
