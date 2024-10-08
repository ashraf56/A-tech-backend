"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const commentSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().optional()
    })
});
const BlogCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        image: zod_1.z.string(),
        description: zod_1.z.string(),
        subtitle: zod_1.z.string(),
        category: zod_1.z.string(),
        date: zod_1.z.string(),
        blogType: zod_1.z.string(),
        comments: zod_1.z.array(commentSchema).optional(),
    })
});
const BlogUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        subtitle: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        blogType: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        comments: zod_1.z.array(commentSchema).optional(),
        upvote: zod_1.z.string().optional()
    })
});
exports.BlogValidation = {
    BlogCreateSchema,
    BlogUpdateSchema
};
