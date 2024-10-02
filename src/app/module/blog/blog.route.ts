import { Router } from "express"

import validateRequest from "../../middleware/validateRequest"
import authMiddleware from "../../middleware/authMiddleware"
import { BlogValidation } from "./blog.validation"
import { BlogControllers } from "./blog.controller"

const router = Router()

router.post('/create-blog', authMiddleware('user'), validateRequest(BlogValidation.BlogCreateSchema), 
BlogControllers.CreateBlogController)
router.get('/', BlogControllers.GetallBlogsController)



export const blogRoutes = router;