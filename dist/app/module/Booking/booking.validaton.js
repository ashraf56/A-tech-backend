"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const CreateBookingvzodschema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        license: zod_1.z.string(),
        nid: zod_1.z.string(),
        user: zod_1.z.string().optional(),
        car: zod_1.z.string(),
        bookingStatus: zod_1.z.string(),
        startTime: zod_1.z.string({
            invalid_type_error: "startTime must be String"
        }),
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().optional(),
        paymentStatus: zod_1.z.string().optional()
    })
});
exports.BookingValidations = {
    CreateBookingvzodschema,
};
