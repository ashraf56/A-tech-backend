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
    const CategoryID = yield category_model_1.Category.findById(payload.category);
    if (!CategoryID) {
        return (0, throwError_1.default)('CategoryID not found');
    }
    newBlogdata.title = payload.title;
    newBlogdata.subtitle = payload.subtitle;
    newBlogdata.description = payload.description;
    newBlogdata.image = payload.image;
    newBlogdata.blogType = payload.blogType;
    newBlogdata.user = userinfo === null || userinfo === void 0 ? void 0 : userinfo._id;
    newBlogdata.category = CategoryID === null || CategoryID === void 0 ? void 0 : CategoryID._id;
    newBlogdata.date = payload.date;
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
            upsert: true,
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
        console.log(error);
        (0, throwError_1.default)(error._message);
    }
});
const getAllBlogsDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const allBLogs = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('category').populate('user'), query)
        .search(blog_constant_1.SearchableFeilds).filter();
    const result = yield allBLogs.modelQuery;
    return result;
});
const getSingleBlogsDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id).populate('user').populate('category');
    return result;
});
const commentPostDB = (payload, id, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = [{ userid, content: payload.content }];
    const postAcomment = yield blog_model_1.Blog.findByIdAndUpdate(id, {
        $addToSet: {
            comments: {
                $each: commentData
            }
        }
    }, { new: true });
    if (!postAcomment) {
        (0, throwError_1.default)('Blog post not found');
    }
    return postAcomment;
});
const DeleteCommentDB = (commentId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const removeComment = yield blog_model_1.Blog.findByIdAndUpdate(id, { $pull: { comments: { _id: commentId } } }, { new: true });
    if (!removeComment) {
        (0, throwError_1.default)('something error');
    }
    const result = yield blog_model_1.Blog.findById(id);
    return result;
});
const Updateblogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Post = yield blog_model_1.Blog.findById(id);
    if (!Post) {
        (0, throwError_1.default)('Post not availabel');
    }
    const newUpvotecount = Post === null || Post === void 0 ? void 0 : Post.upvote;
    const upvotecount = yield blog_model_1.Blog.findByIdAndUpdate(id, {
        $set: {
            upvote: newUpvotecount + 1
        }
    }, { new: true });
    return upvotecount;
});
const getmyBlogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.find({ user: id }).populate('user').populate('category');
    return result;
});
exports.Blogservices = {
    createBlogDB,
    getAllBlogsDB,
    commentPostDB,
    DeleteCommentDB,
    getSingleBlogsDB,
    Updateblogs,
    getmyBlogs
};
