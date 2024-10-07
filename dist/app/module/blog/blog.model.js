"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const CommentsShcema = new mongoose_1.Schema({
    userid: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String }
});
const BlogSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
    comments: [CommentsShcema],
    image: { type: String, required: true },
    date: { type: String, required: true },
    blogType: { type: String, required: true, default: 'random' },
    subtitle: { type: String, required: true },
    title: { type: String, required: true }
}, {
    timestamps: true
});
exports.Blog = (0, mongoose_1.model)('Blog', BlogSchema);
