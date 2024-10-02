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
exports.Blogservices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const blog_model_1 = require("./blog.model");
const throwError_1 = __importDefault(require("../../utills/throwError"));
const user_model_1 = require("../user/user.model");
const category_model_1 = require("../category/category.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const createBlogDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlogdata = {};
    const userinfo = yield user_model_1.User.findById(user);
    if (!userinfo) {
        return (0, throwError_1.default)('User not found');
    }
    newBlogdata.title = payload.title;
    newBlogdata.subtitle = payload.subtitle;
    newBlogdata.description = payload.description;
    newBlogdata.image = payload.image;
    newBlogdata.blogType = payload.blogType;
    newBlogdata.user = userinfo === null || userinfo === void 0 ? void 0 : userinfo._id;
    newBlogdata.category = payload.category;
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const bloginfo = yield blog_model_1.Blog.create([newBlogdata], { session });
        if (!bloginfo) {
            (0, throwError_1.default)("Blog creation faild");
        }
        const BlogCategorycount = yield category_model_1.Category.findByIdAndUpdate({ _id: payload.category }, {
            $inc: { postCount: 1 }
        }, {
            new: true,
            session
        });
        if (!BlogCategorycount) {
            (0, throwError_1.default)("Blog creation faild");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return bloginfo;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        (0, throwError_1.default)('Blog creation not success');
    }
});
const getAllBlogsDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const allBLogs = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('category').populate('user'), query)
        .search(blog_constant_1.SearchableFeilds).filter();
    const result = yield allBLogs.modelQuery;
    return result;
});
exports.Blogservices = {
    createBlogDB,
    getAllBlogsDB
};
