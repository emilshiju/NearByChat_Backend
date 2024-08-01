"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reportSchema = new mongoose_1.Schema({
    reporter: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "users"
    },
    reportedUser: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "users"
    },
    reason: {
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
var reportModel = (0, mongoose_1.model)('report', reportSchema);
exports.default = reportModel;
