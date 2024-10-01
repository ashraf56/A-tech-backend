import { startSession } from "mongoose";
import { PostInterface } from "./post.interface";
import { Post } from "./post.model";
import throwError from "../../utills/throwError";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";

const createPostDB = async (payload: PostInterface, user: string) => {

    const newPostdata: Partial<PostInterface> = {}

    const userinfo = await User.findById(user)
    if (!userinfo) {
        return throwError('User not found')
    }



 const categorys = await Category.findById(payload.category)
 

  newPostdata.title = payload.title
  newPostdata.subtitle = payload.subtitle
  newPostdata.description = payload.description
  newPostdata.image = payload.image
  newPostdata.postType = payload.postType
  newPostdata.userID = userinfo?._id
  newPostdata.category = payload.category

    const session = await startSession()


    try {
        session.startTransaction()

        const result = await Post.create([newPostdata],{session})
        if (!result) {
            throwError("Post creation faild")
        }

        const postCategorycount = await Category.findByIdAndUpdate({_id:payload.category},
            {
                $set:{
                    postCount: categorys!.postCount! + 1
                }
            },
            {
                new:true,
                session
            }
         ) 
if (!postCategorycount) {
    throwError("Post creation faild")
}
await session.commitTransaction()
 await session.endSession()
 const postdata = await Post.findById(result[0]._id).populate('User').populate('Category')
return postdata

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throwError('Post creation not success')
    }

}

export const Postservices = {
createPostDB
}