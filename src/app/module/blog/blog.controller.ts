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
const GetallBlogsController = tryCatchWrapper(
    async (req, res) => {
       
        const result = await Blogservices.getAllBlogsDB(req.query)


        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Blogs retrived successfully",
            data: result
        })
    }
)
const GetSingleBlogsController = tryCatchWrapper(
    async (req, res) => {
       const {id}=req.params
        const result = await Blogservices.getSingleBlogsDB(id)


        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog retrived successfully",
            data: result
        })
    }
)

const commentPostController = tryCatchWrapper(
    async (req, res) => {
        const { id } = req.params;
        const payload = req.body;


        const result = await Blogservices.commentPostDB(payload,id,req.user.id);

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "your comment successfully posted",
            data: result
        })

    }
)
const commentDeleteController = tryCatchWrapper(
    async (req, res) => {
        const { id } = req.params;
        const commentId = req.body;
        
        const result = await Blogservices.DeleteCommentDB(commentId,id);

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "your comment successfully deleted",
            data: result
        })

    }
)



export const BlogControllers ={
    CreateBlogController,
    GetallBlogsController,
    commentPostController,
    commentDeleteController,
    GetSingleBlogsController
}