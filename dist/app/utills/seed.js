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
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = require("../module/user/user.model");
const Admin = {
    name: "fahim",
    email: "f@gmail.com",
    role: "admin",
    password: config_1.default.AdminPass,
    profile: "https://example.com/profile.jpg",
    address: "1234 Elm Street, Springfield, USA"
};
const AdminDefault = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminexist = yield user_model_1.User.findOne({ role: Admin.role });
    if (!isAdminexist) {
        yield user_model_1.User.create(Admin);
    }
});
exports.default = AdminDefault;
