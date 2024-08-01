"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var otpSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1m' } // Field for TTL
});
var otpModel = (0, mongoose_1.model)('Otp', otpSchema);
exports.default = otpModel;
