/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { tryCatchWrapper } from "../utills/tryCatchWrapper"
import config from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRoletypes } from "../module/user/user.interface";
import throwError from "../utills/throwError";
import { User } from "../module/user/user.model";

const authMiddleware = (...authorizeRole: UserRoletypes[]) => {
    return tryCatchWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization as string;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                throwError('You have no access to this route ')
            }
            // ensure that token included with Bearer
            const formatedToken = authHeader.startsWith('Bearer') ? authHeader : `Bearer ${authHeader}`
            const finalToken = formatedToken.split(' ')[1]

            if (!finalToken) {
                throwError('You have no access to this route ')
            }
            const decoded = jwt.verify(finalToken, config.JWT_sec_Token as string) as JwtPayload
            const { id, role } = decoded

            const user = await User.findById({ _id: id })
            if (!user) {
                throwError("You have no access to this route")
            }



            // set role based authorization
            if (authorizeRole && !authorizeRole.includes(role)) {
                throwError("You have no access to this route")
            }

            req.user = decoded as JwtPayload
            next()
        }


    )


}


export default authMiddleware