"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidatons = void 0;
const zod_1 = require("zod");
const car_constant_1 = require("./car.constant");
const createAcarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        color: zod_1.z.string(),
        status: zod_1.z.enum([...car_constant_1.Status]),
        features: zod_1.z.array(zod_1.z.string()),
        isDeleted: zod_1.z.string().optional(),
        isElectric: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number(),
        image: zod_1.z.string(),
        carType: zod_1.z.string(),
    })
});
const updateAcarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        status: zod_1.z.enum([...car_constant_1.Status]).optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.string().optional(),
        isElectric: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        image: zod_1.z.string().optional(),
        carType: zod_1.z.string().optional(),
    })
});
exports.CarValidatons = {
    createAcarValidationSchema,
    updateAcarValidationSchema,
};
