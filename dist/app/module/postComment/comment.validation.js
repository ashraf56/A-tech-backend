"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentValidation = void 0;
const zod_1 = require("zod");
const CreateCommentvalidation = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string()
    })
});
exports.PostCommentValidation = {
    CreateCommentvalidation
};
