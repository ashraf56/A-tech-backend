"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    Database_url: process.env.Database_url,
    Node_Env: process.env.Node_Env,
    PORT: process.env.PORT,
    Defaultpass: process.env.Defaultpass,
    saltNumber: process.env.saltNumber,
    JWT_sec_Token: process.env.JWT_sec_Token,
    JWT_Refresh_token: process.env.JWT_Refresh_token,
    StoreID: process.env.aamarpaytest,
    SIGNETURE_KEY: process.env.SignatureKey
};
