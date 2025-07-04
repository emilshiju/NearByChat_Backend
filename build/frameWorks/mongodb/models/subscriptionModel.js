"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subscriptionModel = new mongoose_1.Schema({
    endpoint: {
        type: String,
        required: true,
        unique: true // Ensure endpoint is unique
    },
    expirationTime: {
        type: Date,
        default: null // Set default value if not provided
    },
    keys: {
        p256dh: {
            type: String,
            required: true
        },
        auth: {
            type: String,
            required: true
        }
    }
});
const SubscriptionModel = (0, mongoose_1.model)('subscriptionModel', subscriptionModel);
exports.default = SubscriptionModel;
