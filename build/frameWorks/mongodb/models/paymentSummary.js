"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var paymentSummary = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true },
    userName: { type: String, required: true },
    nickName: { type: String },
    imageUrl: { type: String },
    gender: { type: String },
    subscriptionName: { type: String, required: true },
    maxCount: { type: Number },
    price: { type: Number },
    email: { type: String },
    dob: { type: Date },
    timePeriod: { type: String },
    searchSubUrl: { type: String },
    description: { type: String },
    paymentStatus: { type: String, default: 'pending' }, // Default to 'pending' or any appropriate value
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
}, { timestamps: true });
var paymentSummaryModel = (0, mongoose_1.model)('paymentSummary', paymentSummary);
exports.default = paymentSummaryModel;
