"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomMode_1 = __importDefault(require("../../frameWorks/mongodb/models/chatRoomMode"));
const userModel_1 = __importDefault(require("../../frameWorks/mongodb/models/userModel"));
const messageMode_1 = __importDefault(require("../../frameWorks/mongodb/models/messageMode"));
class conversationRepository {
    RConversation(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [member1, member2] = input.members;
            try {
                const member1ObjectId = new mongoose_1.default.Types.ObjectId(member1);
                const member2ObjectId = new mongoose_1.default.Types.ObjectId(member2);
                console.log(member1ObjectId, member2ObjectId);
                const chatroom = (yield chatRoomMode_1.default
                    .findOne({
                    members: {
                        $all: [
                            { $elemMatch: { userId: member1ObjectId } },
                            { $elemMatch: { userId: member2ObjectId } },
                        ],
                    },
                })
                    .exec());
                if (!chatroom) {
                    return null;
                }
                let lastime;
                let currentStatus;
                chatroom === null || chatroom === void 0 ? void 0 : chatroom.members.forEach((a) => {
                    var _a;
                    const curr = (_a = a.userId) === null || _a === void 0 ? void 0 : _a.toString();
                    if (curr == member2) {
                        lastime = a.clearChat;
                        currentStatus = a.status;
                        console.log(a.clearChat);
                    }
                });
                if (chatroom) {
                    let allChat = [];
                    if (currentStatus == false) {
                        allChat = yield messageMode_1.default.find({
                            chatroom: chatroom._id,
                            timeStamp: { $gt: lastime },
                        });
                    }
                    if (currentStatus == true) {
                        allChat = yield messageMode_1.default.find({
                            chatroom: chatroom._id,
                            timeStamp: { $lt: lastime },
                        });
                    }
                    const profile = yield userModel_1.default.findById(member1);
                    if (!profile) {
                        return null;
                    }
                    return { allChat, profile, chatroom };
                }
                else {
                    const profile = yield userModel_1.default.findById(member1);
                    if (!profile) {
                        return null;
                    }
                    return profile;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RCreateChatRoom(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [member1, member2] = input.members;
                const chatroom = yield chatRoomMode_1.default
                    .findOne({
                    members: {
                        $all: [
                            { $elemMatch: { userId: member1 } },
                            { $elemMatch: { userId: member2 } },
                        ],
                    },
                })
                    .exec();
                if (!chatroom) {
                    const createdRoom = yield chatRoomMode_1.default.create({
                        name: "New Chat Room",
                        members: [{ userId: member1 }, { userId: member2 }],
                    });
                    return createdRoom;
                }
                return chatroom;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RsendMessage(chatRoomId, userId, receiverId, textMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // findChatRoom and update the status of curret user
                const r = yield chatRoomMode_1.default.findOneAndUpdate({ _id: chatRoomId, "members.userId": userId }, { $set: { "members.$.status": false } }, { new: true });
                const newMessage = yield messageMode_1.default.create({
                    chatroom: chatRoomId,
                    sender: userId,
                    receiver: receiverId,
                    message: textMessage,
                    timeStamp: Date.now(),
                });
                // @ts-ignore
                return newMessage.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RGetAllConversation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const chatrooms = yield chatRoomMode_1.default
                .find({ members: { $elemMatch: { userId: userId } } })
                .populate("members.userId", "nickName , imageUrl")
                .lean();
            if (!chatrooms) {
                return null;
            }
            chatrooms.map((chatrooms) => chatrooms._id);
            const lastAttempt = yield Promise.all(chatrooms.map((a) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g;
                let id = a._id.toString();
                let time;
                let status;
                console.log(id);
                console.log(a.members);
                a.members.forEach((c) => {
                    const uid = c.userId._id;
                    const u = uid.toString();
                    if (userId == u) {
                        time = c.clearChat;
                        status = c.status;
                    }
                });
                let al;
                if (status == false) {
                    al = yield messageMode_1.default
                        .find({
                        chatroom: id,
                        timeStamp: { $gte: time },
                    })
                        .sort({ timeStamp: -1, _id: -1 })
                        .limit(1);
                }
                else {
                    al = yield messageMode_1.default
                        .find({
                        chatroom: id,
                        timeStamp: { $lte: time },
                    })
                        .sort({ timeStamp: -1, _id: -1 })
                        .limit(1);
                }
                const userDetails = a.members.filter((member) => {
                    var _a;
                    const opp = (_a = member.userId) === null || _a === void 0 ? void 0 : _a._id.toString();
                    return opp !== userId;
                });
                const all = {
                    _id: (_a = al[0]) === null || _a === void 0 ? void 0 : _a._id,
                    sender: (_b = al[0]) === null || _b === void 0 ? void 0 : _b.sender,
                    receiver: (_c = al[0]) === null || _c === void 0 ? void 0 : _c.receiver,
                    chatroom: (_d = al[0]) === null || _d === void 0 ? void 0 : _d.chatroom,
                    message: (_e = al[0]) === null || _e === void 0 ? void 0 : _e.message,
                    isRead: (_f = al[0]) === null || _f === void 0 ? void 0 : _f.isRead,
                    timeStamp: (_g = al[0]) === null || _g === void 0 ? void 0 : _g.timeStamp,
                };
                const userDetail = {
                    _id: userDetails[0].userId._id,
                    imageUrl: userDetails[0].userId.imageUrl,
                    nickName: userDetails[0].userId.nickName,
                };
                return { all: all, userDetails: userDetail };
            })));
            const allfiltered = lastAttempt.filter((item) => item.all._id !== undefined);
            allfiltered.sort((a, b) => b.all.timeStamp - a.all.timeStamp);
            return allfiltered;
        });
    }
    RDelteChat(selectedUserId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield chatRoomMode_1.default.findById(selectedUserId);
                if (!response) {
                    return null;
                }
                if (response) {
                    // Update the clearChat field for the specified user
                    response.members.forEach((member) => {
                        let id = member.userId.toString();
                        if (id == userId) {
                            member.clearChat = Date.now();
                        }
                    });
                    // Save the updated document
                    yield response.save();
                }
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RDeleteAllMessages(messagesId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield messageMode_1.default.deleteMany({
                    _id: { $in: messagesId },
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RDeleteSingleChat(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield chatRoomMode_1.default.updateMany({ _id: { $in: chatRoomId }, "members.userId": userId }, {
                    $set: {
                        // 'members.$.status': true,
                        "members.$.clearChat": Date.now(),
                    },
                }, { new: true });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RuserTouserBlock(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield chatRoomMode_1.default.updateMany({ _id: { $in: chatRoomId }, "members.userId": userId }, {
                    $set: {
                        "members.$.status": true,
                        "members.$.clearChat": Date.now(),
                    },
                }, { new: true });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RuserTouserUnblock(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield chatRoomMode_1.default.updateMany({ _id: { $in: chatRoomId }, "members.userId": userId }, {
                    $set: {
                        "members.$.status": false,
                        // 'members.$.clearChat': Date.now()
                    },
                }, { new: true });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.conversationRepository = conversationRepository;
