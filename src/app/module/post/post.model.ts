import { model, Schema } from "mongoose";
import { Comments, PostInterface } from "./post.interface";
const CommentsShcema = new Schema<Comments>({
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true }
})

const PostSchema = new Schema<PostInterface>({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    comments: [CommentsShcema],
    image: { type: String, required: true },
    postType: { type: String, required: true, default: 'random' },
    subtitle: { type: String, required: true },
    title: { type: String, required: true }
}, {
    timestamps: true
})


export const Post = model<PostInterface>('Post',PostSchema)