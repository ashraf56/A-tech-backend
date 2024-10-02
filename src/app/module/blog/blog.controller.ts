import httpStatus from "http-status";
import { tryCatchWrapper } from "../../utills/tryCatchWrapper";
import { Blogservices } from "./blog.service";

const CreateBlogController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
       
        const result = await Blogservices.createBlogDB(payload,req.user.id)


        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog Crated success",
            data: result
        })
    }
)



export const BlogControllers ={
    CreateBlogController
}