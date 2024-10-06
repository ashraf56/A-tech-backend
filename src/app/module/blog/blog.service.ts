/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from "mongoose";
import { BlogInterface } from "./blog.interface";
import { Blog } from "./blog.model";
import throwError from "../../utills/throwError";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { SearchableFeilds } from "./blog.constant";

const createBlogDB = async (payload: BlogInterface, user: string) => {

    const newBlogdata: Partial<BlogInterface> = {}

    const userinfo = await User.findById(user)
    if (!userinfo) {
        return throwError('User not found')
    }

    newBlogdata.title = payload.title
    newBlogdata.subtitle = payload.subtitle
    newBlogdata.description = payload.description
    newBlogdata.image = payload.image
    newBlogdata.blogType = payload.blogType
    newBlogdata.user = userinfo?._id
    newBlogdata.category = payload.category

    const session = await startSession()


    try {
        session.startTransaction()

        const bloginfo = await Blog.create([newBlogdata], { session })
        if (!bloginfo) {
            throwError("Blog creation faild")
        }

        const BlogCategorycount = await Category.findByIdAndUpdate({ _id: payload.category },
            {

                $inc: { postCount: 1 }

            },
            {
                new: true,
                session
            }
        )
        if (!BlogCategorycount) {
            throwError("Blog creation faild")
        }





        await session.commitTransaction()
        await session.endSession()



        return bloginfo

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throwError('Blog creation not success')
    }

}



const getAllBlogsDB = async (query: any) => {

    const allBLogs = new QueryBuilder(Blog.find().populate('category').populate('user'), query)
        .search(SearchableFeilds).filter()

    const result = await allBLogs.modelQuery
    return result
}

const commentPostDB = async (payload: Partial<BlogInterface>, id: string, userid: string) => {

    if (!payload.comments || !Array.isArray(payload.comments)) {
        throwError('No comments provided ');
    }

    const commentData = payload.comments?.map(comment => ({
        userid,
        content: comment.content

    }))

    const postAcomment = await Blog.findByIdAndUpdate(
        id,
        {
            $addToSet: {
                comments: {
                    $each: commentData
                }
            }
        },
        { new: true }
    );

    if (!postAcomment) {
        throwError('Blog post not found');
    }

    // Return the updated blog with comments
    return postAcomment;

}
const DeleteCommentDB = async (commentId: string, id: string) => {


    const removeComment = await Blog.findByIdAndUpdate(id,
        { $pull: { comments: { _id:commentId  } } }, { new: true }
    )

    if (!removeComment) {
        throwError('something error')
    }

    const result = await Blog.findById(id)
    return result

}



export const Blogservices = {
    createBlogDB,
    getAllBlogsDB,
    commentPostDB,
    DeleteCommentDB
}