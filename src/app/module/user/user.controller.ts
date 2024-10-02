import httpStatus from "http-status";
import { tryCatchWrapper } from "../../utills/tryCatchWrapper";
import { UsersService } from "./user.service";

const RegisterUserController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const result = await UsersService.RegisterUserDB(payload)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User registered successfully",
            data: result
        })
    }
)
const LoginUserController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const result = await UsersService.logIn(payload)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Logged in successfully",
            data: result,
            
        })
    }
)
const updateUserController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const { id } = req.params
        const result = await UsersService.updateUserDB(id, payload)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User info updated successfully",
            data: result,

        })
    }
)
const SingleUserController = tryCatchWrapper(
    async (req, res) => {

        const { id } = req.params
        const result = await UsersService.SingleUserDB(id)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User info rettrived successfully",
            data: result,

        })
    }
)




export const UserControllers = {
    RegisterUserController,
    LoginUserController,
    updateUserController,
    SingleUserController
}