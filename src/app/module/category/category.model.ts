import { model, Schema } from "mongoose";
import { CategoryInterface } from "./category.interface";

const CategorySchema = new Schema<CategoryInterface>({
    name: { type: String, required: true },
    postCount: { type: Number, default: 0 }
}, {
    timestamps: true
})



export const Category = model<CategoryInterface>('Category', CategorySchema)