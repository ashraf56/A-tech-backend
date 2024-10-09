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
const tryCatchWrapper_1 = require("../utills/tryCatchWrapper");
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const throwError_1 = __importDefault(require("../utills/throwError"));
const user_model_1 = require("../module/user/user.model");
const authMiddleware = (...authorizeRole) => {
    return (0, tryCatchWrapper_1.tryCatchWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            (0, throwError_1.default)('You have no access to this route ');
        }
        // ensure that token included with Bearer
        const formatedToken = authHeader.startsWith('Bearer') ? authHeader : `Bearer ${authHeader}`;
        const finalToken = formatedToken.split(' ')[1];
        if (!finalToken) {
            (0, throwError_1.default)('You have no access to this route ');
        }
        const decoded = jsonwebtoken_1.default.verify(finalToken, config_1.default.JWT_sec_Token);
        const { id, role } = decoded;
        const user = yield user_model_1.User.findById({ _id: id });
        if (!user) {
            (0, throwError_1.default)("You have no access to this route");
        }
        // set role based authorization
        if (authorizeRole && !authorizeRole.includes(role)) {
            (0, throwError_1.default)("You have no access to this route");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authMiddleware;
