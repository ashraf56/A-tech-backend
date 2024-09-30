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
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const trhowErrorHandller_1 = __importDefault(require("../../utills/trhowErrorHandller"));
const car_model_1 = __importDefault(require("../car/car.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = require("mongoose");
const getMybookingsDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find({ user: id }).populate('user').populate('car');
    return result;
});
const getSinglebookingsDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById({ _id: id });
    return result;
});
const CencleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const bookingInfo = yield booking_model_1.default.findById({ _id: id }).session(session);
        const carID = bookingInfo === null || bookingInfo === void 0 ? void 0 : bookingInfo.car.toString();
        const updateCarSatatus = yield car_model_1.default.findByIdAndUpdate({ _id: carID }, {
            $set: {
                status: 'available'
            }
        }, { new: true, session });
        if (!updateCarSatatus) {
            (0, trhowErrorHandller_1.default)('Booking cenclation faild2');
        }
        const currenTbooking = yield booking_model_1.default.findByIdAndDelete({ _id: id }).session(session);
        if (!currenTbooking) {
            (0, trhowErrorHandller_1.default)('Booking cenclation faild1');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return bookingInfo;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        (0, trhowErrorHandller_1.default)('Booking  cenclation faild');
    }
});
const SetapproveBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const approveBookingStatus = yield booking_model_1.default.findByIdAndUpdate({ _id: id }, {
        $set: {
            bookingStatus: 'approved'
        }
    }, { new: true });
    return approveBookingStatus;
});
const createBookingDB = (payload, userID) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newdata = {};
    const carid = yield car_model_1.default.findById(payload.car);
    if (!carid) {
        (0, trhowErrorHandller_1.default)('car not found');
    }
    // find user id from db
    const user = yield user_model_1.default.findById(userID);
    newdata.user = user === null || user === void 0 ? void 0 : user._id;
    newdata.car = carid === null || carid === void 0 ? void 0 : carid._id;
    newdata.startTime = payload.startTime;
    newdata.totalCost = payload.totalCost;
    newdata.endTime = payload.endTime;
    newdata.date = payload.date;
    newdata.license = payload.license;
    newdata.nid = payload.nid;
    newdata.bookingStatus = payload.bookingStatus;
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        if ((carid === null || carid === void 0 ? void 0 : carid.status) === 'unavailable') {
            (0, trhowErrorHandller_1.default)('Booking not success');
        }
        const createABook = yield booking_model_1.default.create([newdata], { session });
        if (!createABook) {
            (0, trhowErrorHandller_1.default)('Booking not success');
        }
        const updateSatatus = yield car_model_1.default.findByIdAndUpdate({ _id: payload.car }, {
            $set: {
                status: 'unavailable'
            }
        }, { upsert: true, new: true, session });
        if (!updateSatatus) {
            (0, trhowErrorHandller_1.default)('Booking not success');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const Bookdata = yield booking_model_1.default.findById((_a = createABook[0]) === null || _a === void 0 ? void 0 : _a._id).populate('user').populate('car');
        return Bookdata;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        (0, trhowErrorHandller_1.default)('Booking not success');
    }
});
const getAllBookingsfromDB = (carId, date) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (carId && date) {
        query = { $and: [{ car: carId }, { date: date }] };
    }
    const result = yield booking_model_1.default.find(query).populate('user').populate('car');
    if (result.length === 0) {
        (0, trhowErrorHandller_1.default)('no data found');
    }
    return result;
});
exports.BookingServices = {
    createBookingDB,
    getAllBookingsfromDB,
    getMybookingsDB,
    getSinglebookingsDB,
    CencleBooking,
    SetapproveBooking
};
