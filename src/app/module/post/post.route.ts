import { Router } from "express"

import validateRequest from "../../middleware/validateRequest"
import authMiddleware from "../../middleware/authMiddleware"
import { PostValidation } from "./post.validation"

const router = Router()

router.post('/create-post', authMiddleware('user'), validateRequest(PostValidation.PostCreateSchema))

export const postRoutes = router;