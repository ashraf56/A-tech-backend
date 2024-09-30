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
exports.initialPyment = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const config_1 = __importDefault(require("../../config/config"));
const trhowErrorHandller_1 = __importDefault(require("../../utills/trhowErrorHandller"));
const initialPyment = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('https://​sandbox​.aamarpay.com/jsonpost.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_id: config_1.default.StoreID,
                signature_key: config_1.default.SIGNETURE_KEY,
                tran_id: "",
                success_url: `http://localhost:5000/api/v1/payment/confirmation`,
                fail_url: `http://localhost:5000/api/v1/payment/confirmation?status=failed`,
                cancel_url: "http://localhost:5173/",
                amount: "paymentData.totalPrice",
                currency: "BDT",
                desc: "Merchant Registration Payment",
                cus_name: "N",
                cus_email: "n",
                cus_add1: "n",
                cus_add2: "N/A",
                cus_city: "N/A",
                cus_state: "N/A",
                cus_postcode: "N/A",
                cus_country: "N/A",
                cus_phone: "m",
                type: "json"
            })
        });
        return res.data;
    }
    catch (error) {
        (0, trhowErrorHandller_1.default)('Payment faild');
    }
});
exports.initialPyment = initialPyment;
