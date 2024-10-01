import { z } from "zod";


const commentSchema = z.object({
    body: z.object({
    content: z.string().optional()
})
});


const PostCreateSchema = z.object({
    body: z.object({

        title: z.string(),
        image: z.string(),
        description: z.string(),
        subtitle: z.string(),
        category: z.string(),
        postType: z.string(),
        comments: z.array(commentSchema).optional(),
    })


})
const PostUpdateSchema = z.object({
    body: z.object({

        title: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        subtitle: z.string().optional(),
        category: z.string().optional(),
        postType: z.string().optional(),
        comments: z.array(commentSchema).optional(),
    })


})





export const PostValidation = {
    PostCreateSchema,
    PostUpdateSchema
}