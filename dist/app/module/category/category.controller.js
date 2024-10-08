"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const tryCatchWrapper_1 = require("../../utills/tryCatchWrapper");
const category_service_1 = require("./category.service");
const SingleCategoryController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.CategoryService.SingleCategory(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Category info rettrived successfully",
        data: result,
    });
}));
const CreateCategoryController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield category_service_1.CategoryService.CreateCategory(payload);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Category Created successfully",
        data: result
    });
}));
const getAllCategoryController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.getAllCategory();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Category rettrived successfully",
        data: result
    });
}));
exports.CategoryControllers = {
    CreateCategoryController,
    getAllCategoryController,
    SingleCategoryController
};
