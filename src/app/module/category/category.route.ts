import { Router } from "express"
import validateRequest from "../../middleware/validateRequest"
import authMiddleware from "../../middleware/authMiddleware"
import { Categoryvalidation } from "./category.validation"
import { CategoryControllers } from "./category.controller"

const router = Router()

router.post('/create-category', authMiddleware('admin'), validateRequest(Categoryvalidation.CreateCategoryvalidationSchema),
    CategoryControllers.CreateCategoryController)

router.get('/:id', authMiddleware('admin'),
    CategoryControllers.SingleCategoryController)
router.get('/',
    CategoryControllers.getAllCategoryController)



export const categoryRoutes = router;