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





export const PostValidation = {
    PostCreateSchema
}