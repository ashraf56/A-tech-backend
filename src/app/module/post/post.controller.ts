import httpStatus from "http-status";
import { tryCatchWrapper } from "../../utills/tryCatchWrapper";
import { Postservices } from "./post.service";

const CreatePostController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const {id}=req.user
        const result = await Postservices.createPostDB(payload,id)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Post Crated success",
            data: result
        })
    }
)



export const PostControllers ={
    CreatePostController
}