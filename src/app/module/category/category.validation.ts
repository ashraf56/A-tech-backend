import { z } from "zod";


const CreateCategoryvalidationSchema = z.object({
    body: z.object({

        name: z.string()
    })


})


export const Categoryvalidation = {
    CreateCategoryvalidationSchema
}