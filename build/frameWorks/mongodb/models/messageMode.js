"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    chatroom: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'chatRoom'
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Number,
    }
});
var messageModel = (0, mongoose_1.model)("message", messageSchema);
exports.default = messageModel;
