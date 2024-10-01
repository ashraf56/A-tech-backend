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
exports.Postservices = void 0;
const mongoose_1 = require("mongoose");
const post_model_1 = require("./post.model");
const throwError_1 = __importDefault(require("../../utills/throwError"));
const user_model_1 = require("../user/user.model");
const category_model_1 = require("../category/category.model");
const createPostDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const newPostdata = {};
    const userinfo = yield user_model_1.User.findById(user);
    if (!userinfo) {
        return (0, throwError_1.default)('User not found');
    }
    const categorys = yield category_model_1.Category.findById(payload.category);
    newPostdata.title = payload.title;
    newPostdata.subtitle = payload.subtitle;
    newPostdata.description = payload.description;
    newPostdata.image = payload.image;
    newPostdata.postType = payload.postType;
    newPostdata.userID = userinfo === null || userinfo === void 0 ? void 0 : userinfo._id;
    newPostdata.category = payload.category;
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const result = yield post_model_1.Post.create([newPostdata], { session });
        if (!result) {
            (0, throwError_1.default)("Post creation faild");
        }
        const postCategorycount = yield category_model_1.Category.findByIdAndUpdate({ _id: payload.category }, {
            $set: {
                postCount: categorys.postCount + 1
            }
        }, {
            new: true,
            session
        });
        if (!postCategorycount) {
            (0, throwError_1.default)("Post creation faild");
        }
        yield session.commitTransaction();
        yield session.endSession();
        const postdata = yield post_model_1.Post.findById(result[0]._id).populate('User').populate('Category');
        return postdata;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        (0, throwError_1.default)('Post creation not success');
    }
});
exports.Postservices = {
    createPostDB
};
