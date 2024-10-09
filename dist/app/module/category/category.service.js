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
exports.CategoryService = void 0;
const throwError_1 = __importDefault(require("../../utills/throwError"));
const category_model_1 = require("./category.model");
const CreateCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isexistedCategory = yield category_model_1.Category.findOne({ name: payload.name });
    if (isexistedCategory) {
        return (0, throwError_1.default)('this  Category already Created');
    }
    const createCategory = yield category_model_1.Category.create(payload);
    return createCategory;
});
const SingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findSingleCategory = yield category_model_1.Category.findById({ _id: id });
    return findSingleCategory;
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield category_model_1.Category.find();
    return findCategory;
});
exports.CategoryService = {
    CreateCategory,
    SingleCategory,
    getAllCategory
};
