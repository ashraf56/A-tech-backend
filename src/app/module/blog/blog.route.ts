import { Router } from "express"

import validateRequest from "../../middleware/validateRequest"
import authMiddleware from "../../middleware/authMiddleware"
import { BlogValidation } from "./blog.validation"
import { BlogControllers } from "./blog.controller"

const router = Router()


router.post('/create-blog', authMiddleware('user'), validateRequest(BlogValidation.BlogCreateSchema), 
BlogControllers.CreateBlogController)

router.put('/:id' , authMiddleware('user'),BlogControllers.commentPostController)

router.get('/', BlogControllers.GetallBlogsController)
router.get('/:id', BlogControllers.GetSingleBlogsController)
router.delete('/:id',authMiddleware('user','admin') , BlogControllers.commentDeleteController)



export const blogRoutes = router;