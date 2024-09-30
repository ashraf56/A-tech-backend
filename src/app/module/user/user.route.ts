import { Router } from "express"
import { UserValidations } from "./user.validation"
import { UserControllers } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import authMiddleware from "../../middleware/authMiddleware"

const router = Router()

router.post('/signup', validateRequest(UserValidations.createUservalidationSchema),
    UserControllers.RegisterUserController)

router.put('/:id', authMiddleware('admin', 'user'),
    UserControllers.updateUserController)

router.post('/login', validateRequest(UserValidations.LoginvalidationSchema), UserControllers.LoginUserController)

export const userRoutes = router;