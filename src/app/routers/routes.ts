import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
import { categoryRoutes } from "../module/category/category.route";

const router = Router();

const routers = [
   
    {
        path: '/auth',
        route: userRoutes

    },
    {
        path: '/category',
        route: categoryRoutes

    }
]


 routers.forEach(r => router.use(r.path, r.route))

export default router;