import httpStatus from "http-status"
import { tryCatchWrapper } from "../../utills/tryCatchWrapper"
import { CategoryService } from "./category.service"


const SingleCategoryController = tryCatchWrapper(
    async (req, res) => {

        const { id } = req.params
        const result = await CategoryService.SingleCategory(id)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Category info rettrived successfully",
            data: result,

        })
    }
)

const CreateCategoryController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const result = await CategoryService.CreateCategory(payload)

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Category Created successfully",
            data: result
        })
    }
)
const getAllCategoryController = tryCatchWrapper(
    async (req, res) => {
        const result = await CategoryService.getAllCategory()

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Category rettrived successfully",
            data: result
        })
    }
)


export const CategoryControllers = {
    CreateCategoryController,
    getAllCategoryController,
    SingleCategoryController
}