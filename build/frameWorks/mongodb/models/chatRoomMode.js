"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var chatroomSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    members: [
        {
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "users",
            },
            clearChat: {
                type: Number,
                default: Date.now(),
            },
            status: {
                type: Boolean,
                default: false
            },
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    },
});
var chatRoomModel = (0, mongoose_1.model)("chatRoom", chatroomSchema);
exports.default = chatRoomModel;
