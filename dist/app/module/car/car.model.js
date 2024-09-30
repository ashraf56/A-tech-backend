"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const car_constant_1 = require("./car.constant");
const Carschema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    description: {
        type: String,
    },
    color: {
        type: String,
    },
    image: {
        type: String,
    },
    status: { type: String, enum: { values: car_constant_1.Status, message: `status is required` } },
    features: { type: [String], required: true },
    isDeleted: { type: String },
    isElectric: { type: String },
    pricePerHour: { type: Number, required: true },
    carType: { type: String, required: true }
}, {
    timestamps: true
});
const Car = (0, mongoose_1.model)('Car', Carschema);
exports.default = Car;
