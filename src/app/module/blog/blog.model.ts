import { model, Schema } from "mongoose";
import { Comments, BlogInterface } from "./blog.interface";
const CommentsShcema = new Schema<Comments>({
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String }
})

const BlogSchema = new Schema<BlogInterface>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    comments: [CommentsShcema],
    image: { type: String, required: true },
    blogType: { type: String, required: true, default: 'random' },
    subtitle: { type: String, required: true },
    title: { type: String, required: true }
}, {
    timestamps: true
})


export const Blog = model<BlogInterface>('Blog', BlogSchema)