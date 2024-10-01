import throwError from "../../utills/throwError"
import { CategoryInterface } from "./category.interface"
import { Category } from "./category.model"


const CreateCategory = async (payload: CategoryInterface) => {

    const isexistedCategory = await Category.findOne({ name: payload.name })

    if (isexistedCategory) {
        return throwError('this  Category already Created')
    }
    const createCategory = await Category.create(payload)
    return createCategory

}
const SingleCategory = async (id:string) => {

    const findSingleCategory = await Category.findById({ _id: id})

    return findSingleCategory

}
const getAllCategory = async () => {

    const findCategory = await Category.find()
    return findCategory

}


export const CategoryService = {
    CreateCategory,
    SingleCategory,
    getAllCategory
}