"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var notificationSchema = new mongoose_1.Schema({
    senderId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "users",
    },
    receiverId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "users",
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
var notificationModel = (0, mongoose_1.model)('notification', notificationSchema);
exports.default = notificationModel;
