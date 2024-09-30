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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarContoller = void 0;
const tryCatchWrapper_1 = require("../../utills/tryCatchWrapper");
const car_service_1 = require("./car.service");
const createCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield car_service_1.CarService.CreateCarDB(payload);
    res.status(200).json({
        success: true,
        statusCode: 201,
        message: "Car created successfully",
        data: result
    });
}));
const getAllCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_service_1.CarService.getALlCarInfoFromDB();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cars retrieved  successfully",
        data: result
    });
}));
const getAavailableCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    const result = yield car_service_1.CarService.getAvailableCarInfoFromDB(searchTerm);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "available Cars retrieved  successfully",
        data: result
    });
}));
const getSingleCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarService.getSIngleCArDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car retrieved  successfully",
        data: result
    });
}));
const deleteSingleCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarService.deleteAcarDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car deleted  successfully",
        data: result
    });
}));
const updateSingleCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield car_service_1.CarService.updateAcarDB(id, data);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car updated  successfully",
        data: result
    });
}));
const reTurnCarController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, endTime } = req.body;
    const result = yield car_service_1.CarService.returnCarDB(bookingId, endTime);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car returned  successfully",
        data: result
    });
}));
exports.CarContoller = {
    createCarController,
    getAllCarController,
    getSingleCarController,
    deleteSingleCarController,
    updateSingleCarController,
    reTurnCarController,
    getAavailableCarController
};
