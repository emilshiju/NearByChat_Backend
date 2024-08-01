"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var searchSubscription = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    maxCount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timePeriod: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});
var searchSubscriptionModel = (0, mongoose_1.model)('searchSubscription', searchSubscription);
exports.default = searchSubscriptionModel;
