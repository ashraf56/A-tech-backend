/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config/config";
import { Errorsource } from "../random_Interface/terrorsource";
import { ZodError } from "zod";
import zodErrors from "../errors/zodErrors";

const globalErrorhandler: ErrorRequestHandler = ((error, req, res, next) => {
    let statusCode = error.statusCode || 500
    let message =  error.message || "something error"
    



    // default error path
    let errorSource: Errorsource = [
        {
            path: '',
            message: message
        }
    ]

    if (error instanceof ZodError) {
        const errs = zodErrors(error);
        statusCode = errs?.statusCode;
        message = errs?.message;
        errorSource = errs?.errorSource
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config.Node_Env === 'development' ? error?.stack : null
    })

})

export default globalErrorhandler;