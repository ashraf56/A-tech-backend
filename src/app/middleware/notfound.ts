/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const noRoutefound = ((req: Request, res: Response, next: NextFunction) => {

    return res.status(httpStatus.OK).json({
        success: false,
        statusCode: 404,
        message: "Not Found"
    })
})



export default noRoutefound