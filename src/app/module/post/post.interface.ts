import { Types } from "mongoose";


export type Comments = {
    userid: Types.ObjectId
    content: string
}

export interface PostInterface {
    userID:Types.ObjectId
    title:string
    image:string
    description:string
    subtitle:string
    category:Types.ObjectId
    postType: string
    comments:Comments[]

}