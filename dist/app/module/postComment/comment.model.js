"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComment = void 0;
const mongoose_1 = require("mongoose");
const PostCommentShcema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    content: { type: String, required: true }
}, {
    timestamps: true
});
exports.PostComment = (0, mongoose_1.model)('PostComment', PostCommentShcema);
