import { AnyZodObject } from "zod";
import { tryCatchWrapper } from "../utills/tryCatchWrapper";
import { NextFunction, Request, Response } from "express";


const validateRequest = (schema: AnyZodObject) => {
    return tryCatchWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            await schema.parseAsync({
                body: req.body
            })

            next()
        }
    )
}

export default validateRequest