"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user'
    },
    nickName: {
        type: String,
    },
    bio: {
        type: String
    },
    profession: {
        type: String
    }, imageUrl: {
        type: String,
        default: "https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717497267/nearbychatdemo/okyoyinbjjrenwsx4am3.png"
    },
    connections: [
        {
            userId: {
                type: mongoose_1.Types.ObjectId,
                ref: "users"
            },
            status: {
                type: String,
                default: "pending"
            }
        }
    ],
    currSearch: {
        type: Number,
        default: 0
    },
    maxSearch: {
        type: Number,
        default: 3
    },
    images: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true
});
var UserModel = (0, mongoose_1.model)("users", userSchema);
exports.default = UserModel;
