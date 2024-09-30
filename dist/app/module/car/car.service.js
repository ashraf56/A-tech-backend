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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const trhowErrorHandller_1 = __importDefault(require("../../utills/trhowErrorHandller"));
const car_model_1 = __importDefault(require("./car.model"));
const booking_model_1 = __importDefault(require("../Booking/booking.model"));
const CreateCarDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existCar = yield car_model_1.default.findOne({ name: payload.name });
    if (existCar) {
        (0, trhowErrorHandller_1.default)("Already  created");
    }
    const cars = yield car_model_1.default.create(payload);
    return cars;
});
const getALlCarInfoFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.find();
    return result;
});
const getAvailableCarInfoFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = { status: 'available', isDeleted: 'false' };
    if (searchTerm) {
        query = Object.assign(Object.assign({}, query), { $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { features: { $elemMatch: { $regex: searchTerm, $options: 'i' } } },
            ] });
    }
    const result = yield car_model_1.default.find(query);
    return result;
});
const getSIngleCArDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findById({ _id: id });
    return result;
});
const deleteAcarDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findByIdAndUpdate({ _id: id }, {
        isDeleted: 'true'
    }, { new: true });
    return result;
});
const returnCarDB = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.default.findById(bookingId);
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const carId = bookings === null || bookings === void 0 ? void 0 : bookings.car._id.toString();
        const carsinfo = yield car_model_1.default.findById(carId);
        const [startHour, startMin] = bookings === null || bookings === void 0 ? void 0 : bookings.startTime.split(":").map(Number);
        const [currentEndHour, endmin] = endTime.split(":").map(Number);
        const currentPricePerHour = carsinfo === null || carsinfo === void 0 ? void 0 : carsinfo.pricePerHour;
        const totalCurrentcost = bookings === null || bookings === void 0 ? void 0 : bookings.totalCost;
        // converting current  startTime and endtime into hours
        const totalStartTime = startHour + startMin / 60;
        const totalEndTime = currentEndHour + endmin / 60;
        const totalHours = totalEndTime - totalStartTime;
        const rideCost = currentPricePerHour * totalHours;
        const FinalCost = rideCost + totalCurrentcost;
        const totalFinalcost = Math.ceil(FinalCost);
        // updating booking info .
        const Bookingdata = yield booking_model_1.default.findByIdAndUpdate({ _id: bookingId }, { $set: { endTime: endTime, totalCost: totalFinalcost, bookingStatus: 'completed' } }, { upsert: true, new: true, session });
        if (!Bookingdata) {
            (0, trhowErrorHandller_1.default)('Failed to return1');
        }
        // Updating the car status
        const updateCarstatus = yield car_model_1.default.findByIdAndUpdate({ _id: carId }, {
            $set: {
                status: 'available',
            }
        }, {
            new: true, session
        });
        if (!updateCarstatus) {
            (0, trhowErrorHandller_1.default)('Failed to return');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const ReturnedCar = yield booking_model_1.default.findById(bookingId).populate('user').populate('car');
        return ReturnedCar;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        (0, trhowErrorHandller_1.default)('Failed to return');
    }
});
const updateAcarDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { features } = payload, data = __rest(payload, ["features"]);
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const updateinfo = yield car_model_1.default.findByIdAndUpdate({ _id: id }, data, { new: true, session });
        if (!updateinfo) {
            (0, trhowErrorHandller_1.default)('Failed to update');
        }
        if (features && (features === null || features === void 0 ? void 0 : features.length) > 0) {
            //  find car features from DB
            const dbFeatures = yield car_model_1.default.findById(id).select('features');
            // storing current DB Features
            const currentFeatures = (dbFeatures === null || dbFeatures === void 0 ? void 0 : dbFeatures.features) || [];
            // add a new feture in the fetures array. filtering the payload feature where no currentFeatures exist.  
            const addNewFeature = features.filter((f) => !currentFeatures.includes(f));
            // remove  a new feture from fetures array. 
            const removedFeature = currentFeatures.filter((cf) => features.includes(cf));
            // feature remove  logic
            const featureremove = yield car_model_1.default.findByIdAndUpdate({ _id: id }, { $pull: { features: { $in: removedFeature } } }, {
                new: true,
                session
            });
            if (!featureremove) {
                (0, trhowErrorHandller_1.default)('Failed to update');
            }
            // feature add logic
            const featuresupdate = yield car_model_1.default.findByIdAndUpdate({ _id: id }, {
                $addToSet: {
                    features: {
                        $each: addNewFeature
                    }
                }
            }, {
                new: true,
                session
            });
            if (!featuresupdate) {
                (0, trhowErrorHandller_1.default)('Failed to update');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield car_model_1.default.findById(id);
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        (0, trhowErrorHandller_1.default)('Failed to update');
    }
});
exports.CarService = {
    CreateCarDB,
    getALlCarInfoFromDB,
    getSIngleCArDB,
    deleteAcarDB,
    updateAcarDB,
    returnCarDB,
    getAvailableCarInfoFromDB
};
