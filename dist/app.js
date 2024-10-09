"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routers/routes"));
const globalErrorhandler_1 = __importDefault(require("./app/middleware/globalErrorhandler"));
const notfound_1 = __importDefault(require("./app/middleware/notfound"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Tech  service running..!');
});
app.use(globalErrorhandler_1.default);
app.use(notfound_1.default);
exports.default = app;
