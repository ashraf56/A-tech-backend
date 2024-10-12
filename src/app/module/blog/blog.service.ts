/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from "mongoose";
import { BlogInterface, Comments } from "./blog.interface";
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
    const CategoryID = await Category.findById(payload.category)
    if (!CategoryID) {
        return throwError('CategoryID not found')
    }

    newBlogdata.title = payload.title
    newBlogdata.subtitle = payload.subtitle
    newBlogdata.description = payload.description
    newBlogdata.image = payload.image
    newBlogdata.blogType = payload.blogType
    newBlogdata.user = userinfo?._id
    newBlogdata.category = CategoryID?._id
    newBlogdata.date = payload.date



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
                upsert: true,
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

    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        console.log(error);
        throwError(error!._message!)

    }

}



const getAllBlogsDB = async (query: any) => {

    const allBLogs = new QueryBuilder(Blog.find().populate('category').populate('user'), query)
        .search(SearchableFeilds).filter()

    const result = await allBLogs.modelQuery
    return result
}
const getSingleBlogsDB = async (id:string) => {

    
    const result = await  Blog.findById(id).populate('user').populate('category')
    return result
}

const commentPostDB = async (payload: Comments, id: string, userid: string) => {


    const commentData =   [{userid,content: payload.content}]

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
    
    return postAcomment;

}
const DeleteCommentDB = async (commentId: string, id: string) => {


    const removeComment = await Blog.findByIdAndUpdate(id,
        { $pull: { comments: { _id: commentId } } }, { new: true }
    )

    if (!removeComment) {
        throwError('something error')
    }

    const result = await Blog.findById(id)
    return result

}


const Updateblogs = async (id:string)=>{
  
const Post = await Blog.findById(id)

if (!Post) {
    throwError('Post not availabel')

}
 
const newUpvotecount = Post?.upvote as number 

const upvotecount = await Blog.findByIdAndUpdate(id,{
    $set:{
        upvote: newUpvotecount + 1 
    }
},
{new:true})

return upvotecount

}


export const Blogservices = {
    createBlogDB,
    getAllBlogsDB,
    commentPostDB,
    DeleteCommentDB,
    getSingleBlogsDB,
    Updateblogs
}