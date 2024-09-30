import { Router } from "express";
import { userRoutes } from "../module/user/user.route";

const router = Router();

const routers = [
   
    {
        path: '/auth',
        route: userRoutes

    }
]


 routers.forEach(r => router.use(r.path, r.route))

export default router;