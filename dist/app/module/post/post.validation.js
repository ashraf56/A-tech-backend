"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const commentSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().optional()
    })
});
const PostCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        image: zod_1.z.string(),
        description: zod_1.z.string(),
        subtitle: zod_1.z.string(),
        category: zod_1.z.string(),
        postType: zod_1.z.string(),
        comments: zod_1.z.array(commentSchema).optional(),
    })
});
exports.PostValidation = {
    PostCreateSchema
};
