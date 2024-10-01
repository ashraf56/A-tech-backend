"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const category_route_1 = require("../module/category/category.route");
const post_route_1 = require("../module/post/post.route");
const router = (0, express_1.Router)();
const routers = [
    {
        path: '/auth',
        route: user_route_1.userRoutes
    },
    {
        path: '/category',
        route: category_route_1.categoryRoutes
    },
    {
        path: '/post',
        route: post_route_1.postRoutes
    }
];
routers.forEach(r => router.use(r.path, r.route));
exports.default = router;
