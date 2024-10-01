import { Types } from "mongoose";

export interface PostComment{
    user:Types.ObjectId
    content:string
}