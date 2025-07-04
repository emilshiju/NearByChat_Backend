"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "users",
    },
    nickName: {
        type: String
    },
    bio: {
        type: String
    },
    profession: {
        type: String
    },
    imageUrl: {
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
    }
});
const ProfileModel = (0, mongoose_1.model)('Profiles', profileSchema);
exports.default = ProfileModel;
