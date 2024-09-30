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
exports.BookingController = void 0;
const tryCatchWrapper_1 = require("../../utills/tryCatchWrapper");
const booking_service_1 = require("./booking.service");
const getmyBoookingController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getMybookingsDB(req.user.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "My Bookings retrieved successfully",
        data: result
    });
}));
const getCencleBoookingController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.CencleBooking(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking cencled successfully",
        data: result
    });
}));
const setApproveBoookingController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.SetapproveBooking(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking Approved successfully",
        data: result
    });
}));
const createBoookingCOntroller = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.createBookingDB(req.body, req.user.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car booked  successfully",
        data: result
    });
}));
const getALLBoookingCOntroller = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = req.query.carId;
    const date = req.query.date;
    const result = yield booking_service_1.BookingServices.getAllBookingsfromDB(carId, date);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: result
    });
}));
const getSingleBoookingCOntroller = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield booking_service_1.BookingServices.getSinglebookingsDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking retrieved successfully",
        data: result
    });
}));
exports.BookingController = {
    createBoookingCOntroller,
    getALLBoookingCOntroller,
    getmyBoookingController,
    getSingleBoookingCOntroller,
    getCencleBoookingController,
    setApproveBoookingController
};
