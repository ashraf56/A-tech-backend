"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const category_route_1 = require("../module/category/category.route");
const blog_route_1 = require("../module/blog/blog.route");
const router = (0, express_1.Router)();
const routers = [
    {
        path: '/blogs',
        route: blog_route_1.blogRoutes
    },
    {
        path: '/auth',
        route: user_route_1.userRoutes
    },
    {
        path: '/category',
        route: category_route_1.categoryRoutes
    }
];
routers.forEach(r => router.use(r.path, r.route));
exports.default = router;
