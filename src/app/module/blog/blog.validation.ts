import { z } from "zod";


const commentSchema = z.object({
    body: z.object({
        content: z.string().optional()
    })
});


const BlogCreateSchema = z.object({
    body: z.object({

        title: z.string(),
        image: z.string(),
        description: z.string(),
        subtitle: z.string(),
        category: z.string(),
        date: z.string(),
        blogType: z.string(),
        comments: z.array(commentSchema).optional(),
    })


})
const BlogUpdateSchema = z.object({
    body: z.object({

        title: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        subtitle: z.string().optional(),
        category: z.string().optional(),
        blogType: z.string().optional(),
        date: z.string().optional(),
        comments: z.array(commentSchema).optional(),
        upvote: z.number().optional()
    })


})





export const BlogValidation = {
    BlogCreateSchema,
    BlogUpdateSchema
}