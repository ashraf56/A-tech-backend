import { Types } from "mongoose";


export type Comments = {
    userid: Types.ObjectId
    content?: string
}

export interface BlogInterface {
    user:Types.ObjectId
    title:string
    image:string
    description:string
    date:string
    subtitle:string
    category:Types.ObjectId
    blogType: string
    upvote?:string
    comments?:Comments[]

}