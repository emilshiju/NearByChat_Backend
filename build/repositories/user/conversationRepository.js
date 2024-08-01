"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRepository = void 0;
var inversify_1 = require("inversify");
var mongoose_1 = __importDefault(require("mongoose"));
var chatRoomMode_1 = __importDefault(require("../../frameWorks/mongodb/models/chatRoomMode"));
var userModel_1 = __importDefault(require("../../frameWorks/mongodb/models/userModel"));
var messageMode_1 = __importDefault(require("../../frameWorks/mongodb/models/messageMode"));
var conversationRepository = /** @class */ (function () {
    function conversationRepository() {
    }
    conversationRepository.prototype.RConversation = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, member1, member2, member1ObjectId, member2ObjectId, chatroom, lastime_1, currentStatus_1, allChat, profile, profile, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("check chat rommmmmmmmmmmis thereeeeeeeeeeeeeeeeeeeeeeeeee ");
                        _a = input.members, member1 = _a[0], member2 = _a[1];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        member1ObjectId = new mongoose_1.default.Types.ObjectId(member1);
                        member2ObjectId = new mongoose_1.default.Types.ObjectId(member2);
                        return [4 /*yield*/, chatRoomMode_1.default.findOne({
                                members: {
                                    $all: [
                                        { $elemMatch: { userId: member1ObjectId } },
                                        { $elemMatch: { userId: member2ObjectId } }
                                    ]
                                }
                            }).exec()];
                    case 2:
                        chatroom = _b.sent();
                        // to update the status of read or not 
                        // if (chatroom) {
                        //   // Update the status field of member2ObjectId to true
                        //   await chatRoomModel.updateOne(
                        //     {
                        //       _id: chatroom._id,
                        //       'members.userId': member2ObjectId
                        //     },
                        //     {
                        //       $set: { 'members.$.isRead': true }
                        //     }
                        //   ).exec();
                        // }
                        console.log("chat rommmmmmmmmmmmmmmmm");
                        chatroom === null || chatroom === void 0 ? void 0 : chatroom.members.forEach(function (a) {
                            var _a;
                            var curr = (_a = a.userId) === null || _a === void 0 ? void 0 : _a.toString();
                            console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
                            console.log(curr);
                            //@ts-ignore
                            if (curr == member2) {
                                lastime_1 = a.clearChat;
                                currentStatus_1 = a.status;
                                console.log(a.clearChat);
                            }
                        });
                        console.log(chatroom);
                        if (!chatroom) return [3 /*break*/, 8];
                        console.log("userrrrrrrrrrriddddddddddddddddddddddddddddddddddddddddd");
                        console.log("hereeee");
                        console.log(chatroom._id);
                        allChat = void 0;
                        if (!(currentStatus_1 == false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, messageMode_1.default.find({
                                chatroom: chatroom._id,
                                timeStamp: { $gt: lastime_1 }
                            })];
                    case 3:
                        allChat = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!(currentStatus_1 == true)) return [3 /*break*/, 6];
                        return [4 /*yield*/, messageMode_1.default.find({
                                chatroom: chatroom._id,
                                timeStamp: { $lt: lastime_1 }
                            })];
                    case 5:
                        allChat = _b.sent();
                        _b.label = 6;
                    case 6:
                        // .populate({
                        //   path: 'sender',
                        //   select: '_id'
                        // }).populate({
                        //   path: 'receiver',
                        //   select: '_id'
                        // }).exec();
                        console.log("ooo");
                        console.log("jkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                        console.log(allChat);
                        return [4 /*yield*/, userModel_1.default.findById(member1)
                            // return profile
                        ];
                    case 7:
                        profile = _b.sent();
                        // return profile
                        return [2 /*return*/, { allChat: allChat, profile: profile, chatroom: chatroom }];
                    case 8: return [4 /*yield*/, userModel_1.default.findById(member1)];
                    case 9:
                        profile = _b.sent();
                        return [2 /*return*/, profile
                            //   console.log("here erororo 87777777777777777777777777777777777777")
                            //        console.log(chatroom._id)
                            //        console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
                            //        let id=chatroom._id.toString()
                            //   let profile=await chatRoomModel.findOne({
                            //     _id:id // Assuming you have the chatroom ID
                            //   }).populate('members.0').exec();
                            //     console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
                            //   console.log(profile)
                            //   console.log("pouiiiiii")
                            //   return profile
                        ];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    conversationRepository.prototype.RCreateChatRoom = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, member1, member2, chatroom, createdRoom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = input.members, member1 = _a[0], member2 = _a[1];
                        console.log(member1);
                        console.log(member2);
                        console.log("8888888888888");
                        return [4 /*yield*/, chatRoomMode_1.default.findOne({
                                members: {
                                    $all: [
                                        { $elemMatch: { userId: member1 } },
                                        { $elemMatch: { userId: member2 } }
                                    ]
                                }
                            }).exec()];
                    case 1:
                        chatroom = _b.sent();
                        console.log("000000000000000000000000");
                        console.log(chatroom);
                        if (!!chatroom) return [3 /*break*/, 3];
                        return [4 /*yield*/, chatRoomMode_1.default.create({
                                name: 'New Chat Room',
                                members: [{ userId: member1 }, { userId: member2 }],
                            })];
                    case 2:
                        createdRoom = _b.sent();
                        return [2 /*return*/, createdRoom];
                    case 3: return [2 /*return*/, chatroom];
                }
            });
        });
    };
    conversationRepository.prototype.RsendMessage = function (chatRoomId, userId, receiverId, textMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var r, newMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(chatRoomId, userId, receiverId, textMessage);
                        console.log("pppppppppppppppppppppppppppppp");
                        return [4 /*yield*/, chatRoomMode_1.default.findOneAndUpdate({ _id: chatRoomId, 'members.userId': userId }, { $set: { 'members.$.status': false } }, { new: true })];
                    case 1:
                        r = _a.sent();
                        return [4 /*yield*/, messageMode_1.default.create({
                                chatroom: chatRoomId,
                                sender: userId,
                                receiver: receiverId,
                                message: textMessage,
                                timeStamp: Date.now()
                            })];
                    case 2:
                        newMessage = _a.sent();
                        console.log(newMessage);
                        return [2 /*return*/, newMessage];
                }
            });
        });
    };
    conversationRepository.prototype.RGetAllConversation = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var chatrooms, chatroomIds, lastAttempt, allfiltered;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(" llllllllllllllllllllllllllllllllllllllllll          ");
                        console.log(userId);
                        return [4 /*yield*/, chatRoomMode_1.default.find({ members: { $elemMatch: { userId: userId } } }).populate('members.userId', 'nickName , imageUrl')];
                    case 1:
                        chatrooms = _a.sent();
                        console.log("al  chattttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
                        console.log(chatrooms);
                        chatroomIds = chatrooms.map(function (chatrooms) { return chatrooms._id; });
                        return [4 /*yield*/, Promise.all(chatrooms.map(function (a) { return __awaiter(_this, void 0, void 0, function () {
                                var id, time, status, al, userDetails, all, userDetail;
                                var _a, _b, _c, _d, _e, _f, _g;
                                return __generator(this, function (_h) {
                                    switch (_h.label) {
                                        case 0:
                                            id = a._id.toString();
                                            console.log(id);
                                            console.log(a.members);
                                            a.members.forEach(function (c) {
                                                var uid = c.userId._id;
                                                var u = uid.toString();
                                                if (userId == u) {
                                                    time = c.clearChat;
                                                    status = c.status;
                                                }
                                            });
                                            console.log("checking timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                                            console.log(time);
                                            if (!(status == false)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, messageMode_1.default.find({
                                                    chatroom: id,
                                                    timeStamp: { $gte: time }
                                                }).sort({ timeStamp: -1, _id: -1 }).limit(1)];
                                        case 1:
                                            al = _h.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, messageMode_1.default.find({
                                                chatroom: id,
                                                timeStamp: { $lte: time }
                                            }).sort({ timeStamp: -1, _id: -1 }).limit(1)];
                                        case 3:
                                            al = _h.sent();
                                            _h.label = 4;
                                        case 4:
                                            userDetails = a.members.filter(function (member) {
                                                var _a;
                                                var opp = (_a = member.userId) === null || _a === void 0 ? void 0 : _a._id.toString();
                                                console.log(opp);
                                                console.log("opppppppppppppp");
                                                return opp !== userId;
                                            });
                                            all = {
                                                _id: (_a = al[0]) === null || _a === void 0 ? void 0 : _a._id,
                                                sender: (_b = al[0]) === null || _b === void 0 ? void 0 : _b.sender,
                                                receiver: (_c = al[0]) === null || _c === void 0 ? void 0 : _c.receiver,
                                                chatroom: (_d = al[0]) === null || _d === void 0 ? void 0 : _d.chatroom,
                                                message: (_e = al[0]) === null || _e === void 0 ? void 0 : _e.message,
                                                isRead: (_f = al[0]) === null || _f === void 0 ? void 0 : _f.isRead,
                                                timeStamp: (_g = al[0]) === null || _g === void 0 ? void 0 : _g.timeStamp
                                            };
                                            console.log(all);
                                            console.log("last attempt");
                                            console.log(userDetails[0]);
                                            userDetail = {
                                                _id: userDetails[0].userId._id,
                                                imageUrl: userDetails[0].userId.imageUrl,
                                                nickName: userDetails[0].userId.nickName
                                            };
                                            return [2 /*return*/, { all: all, userDetails: userDetail }];
                                    }
                                });
                            }); }))];
                    case 2:
                        lastAttempt = _a.sent();
                        allfiltered = lastAttempt.filter(function (item) { return item.all._id !== undefined; });
                        console.log("filtered filteresd");
                        allfiltered.sort(function (a, b) { return b.all.timeStamp - a.all.timeStamp; });
                        console.log("Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
                        console.log(lastAttempt);
                        //  const lastAttempt:any=[]
                        //  chatrooms.forEach(async(a:any)=>{
                        //   let id=a._id.toString()
                        //   let time=null
                        //   console.log(id)
                        //   console.log(a.members)
                        //   a.members.forEach((c:any)=>{
                        //     let uid=c.userId._id
                        //     let u=uid.toString()
                        //    if(userId==u){
                        //     time=c.clearChat
                        //    }else{
                        //    }
                        //   })
                        //   const findMessages = await messageModel.find({
                        //     chatroom: id,
                        //     timeStamp: { $gte: time }
                        // }).sort({ timeStamp: -1,_id:-1 })
                        // .limit(1);
                        //  // @ts-ignore
                        // const userDetail:any= a.members.filter(member =>{
                        //   // @ts-ignore
                        //  let opp=member.userId?._id.toString() 
                        //  console.log(opp)
                        //  console.log("opppppppppppppp")
                        //  return  opp!== userId
                        //  });
                        //  console.log(findMessages)
                        // console.log("last atatempt ")
                        // console.log(userDetail)
                        // const userDetails={
                        //   _id:userDetail[0].userId._id,
                        //   imageUrl:userDetail[0].userId.imageUrl,
                        //   nickName:userDetail[0].userId.nickName
                        //  }
                        // lastAttempt.push({findMessages,userDetail})
                        //  })
                        //   console.log(chatroomIds)
                        //   // Find all messages in these chatrooms where receiverId is either the sender or receiver
                        // const messages = await messageModel.find({
                        //   chatroom: { $in: chatroomIds },
                        // })
                        // .sort({ timeStamp: 1 })
                        //     const allMessages:any=[]
                        // for (const chatroomId of chatroomIds) {
                        //   const messages:any = await messageModel.find({
                        //     chatroom: chatroomId
                        //   })
                        //   .sort({ timeStamp: -1,_id:-1 })
                        //   .limit(1);
                        //   allMessages.push(messages);
                        // }
                        //     // .populate('sender receiver', '_id'); // Populate sender and receiver  fields
                        //    console.log("ovdieeeeeeeeeeeeeeeeeeeeeeeeeeee")
                        //     console.log(allMessages.flat(1))
                        //     const flatAllMessages=allMessages.flat(1)
                        //     console.log("finidshhhhhhhhhhhhhhhhhhhhhhhhhh")
                        //   //   const messagesByChatroom = chatroomIds.reduce((acc, chatroomId) => {
                        //   //     const chatroomIds= chatroomId.toString();
                        //   //     // @ts-ignore
                        //   //     acc[chatroomIds] = messages.filter(message => message.chatroom.toString() === chatroomId.toString());
                        //   //     return acc;
                        //   // }, {});
                        //   //  // @ts-ignore
                        //   // console.log(messagesByChatroom)
                        //   const messagesByChatroom:any = [];
                        //   chatrooms.forEach(chatroomId => {
                        //     const chatroomIdStr = chatroomId._id.toString();
                        //     // @ts-ignore
                        //    let all = flatAllMessages.filter(message => message.chatroom.toString() === chatroomIdStr);
                        //  // @ts-ignore
                        //    const userDetails= chatroomId.members.filter(member => member.userId.toString() !== userId);
                        //    console.log(userDetails)
                        //     // @ts-ignore
                        //    console.log(all)
                        //    if(all.length>0){
                        //    messagesByChatroom.push({userDetails,all})
                        //    }
                        //   });
                        //   console.log("999999999999999999999999999999999999999999999")
                        //   console.log(messagesByChatroom);
                        //   console.log("curent user id")
                        //   console.log(userId)
                        //   const sortedMessage:any=[]
                        //   chatrooms.forEach(chatroomId => {
                        //     const chatroomIdStr = chatroomId._id.toString();
                        //     let lastClearChatTime:any=false
                        //     chatroomId.members.forEach(member=>{
                        //       let curr=member.userId?._id.toString() 
                        //       console.log(curr)
                        //       console.log(userId)
                        //       console.log("hehehehehe")
                        //       console.log(member.userId)
                        //           if(curr==userId){
                        //             console.log("keri")
                        //             flatAllMessages.filter((message:any)=>{
                        //               console.log(message.chatroom)
                        //               let strid=message.chatroom.toString()
                        //               if(strid==chatroomIdStr&&message.timeStamp>=member.clearChat){
                        //                 console.log("all message that filter clear chat ")
                        //                 console.log(message)
                        //               }
                        //             })
                        //             lastClearChatTime=member.clearChat
                        //           }
                        //     })
                        //     console.log("m   1   111111 1 1 1 1 1 1 1 1 1 1 1 last timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                        //     console.log(lastClearChatTime)
                        //     // @ts-ignore
                        //     flatAllMessages.forEach((a)=>{
                        //       let b=a.chatroom
                        //       console.log(b)
                        //       console.log(a.timeStamp)
                        //     })
                        //     console.log("cureeeeeeeeeeeetn messsssssssageeeeeeeeeeeeeeeeeee")
                        // // @ts-ignore
                        //    let al = flatAllMessages.filter(async(message)=> {
                        //      const id =  message.chatroom.toString()
                        //      console.log(id)
                        //      console.log(chatroomIdStr)
                        //      console.log("message")
                        //      console.log(message)
                        //      console.log("time stamp")
                        //      console.log(message.timeStamp)
                        //      console.log(lastClearChatTime)
                        //      console.log(message.timeStamp>=lastClearChatTime)
                        //      console.log(chatroomIdStr)
                        //     if(id== chatroomIdStr&&message.timeStamp>=lastClearChatTime) {
                        //       console.log(message)
                        //       return message
                        //     }else{
                        //       console.log("error")
                        //     }
                        //     })
                        //    console.log(" al messsageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                        //    console.log(al)
                        //     // @ts-ignore
                        //    const userDetail:any= chatroomId.members.filter(member =>{
                        //      // @ts-ignore
                        //     let opp=member.userId?._id.toString() 
                        //     console.log(opp)
                        //     console.log("opppppppppppppp")
                        //     return  opp!== userId
                        //     });
                        //    console.log("user detailssssssssssssssssssssssssssssssssssss")
                        //    console.log(userDetail)
                        //    if(al.length>0){
                        //    const userDetails={
                        //     _id:userDetail[0].userId._id,
                        //     imageUrl:userDetail[0].userId.imageUrl,
                        //     nickName:userDetail[0].userId.nickName
                        //    }
                        //    const all={
                        //     _id:al[0]._id,
                        //     sender:al[0].sender,
                        //     receiver:al[0].receiver,
                        //     chatroom:al[0].chatroom,
                        //     message:al[0].message,
                        //     timeStamp:al[0].timeStamp
                        //    }
                        //    sortedMessage.push({userDetails:userDetails,all:all})
                        //   }
                        //   });
                        //   console.log(sortedMessage)
                        //   console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
                        //      let n=sortedMessage.sort((a:any,b:any)=>b.all.timeStamp-a.all.timeStamp)
                        //   console.log(n)
                        //   console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                        return [2 /*return*/, allfiltered];
                }
            });
        });
    };
    conversationRepository.prototype.RDelteChat = function (selectedUserId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chatRoomMode_1.default.findById(selectedUserId)];
                    case 1:
                        response = _a.sent();
                        console.log("old roneeeeeeeeeeeeeeeee");
                        console.log(response);
                        console.log("old response");
                        console.log(Date.now());
                        if (!response) return [3 /*break*/, 3];
                        // Update the clearChat field for the specified user
                        response.members.forEach(function (member) {
                            //@ts-ignore
                            var id = member.userId.toString();
                            if (id == userId) {
                                member.clearChat = Date.now();
                            }
                        });
                        // Save the updated document
                        return [4 /*yield*/, response.save()];
                    case 2:
                        // Save the updated document
                        _a.sent();
                        console.log("new dateeeeeeeeeeee");
                        console.log("00000 delteeeeeeeeeeeeeeeeeddddddddddddddddddddddddddddd");
                        console.log(response);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    conversationRepository.prototype.RDeleteAllMessages = function (messagesId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ivide vanuu last ane");
                        console.log(messagesId);
                        console.log("delted");
                        return [4 /*yield*/, messageMode_1.default.deleteMany({ _id: { $in: messagesId } })];
                    case 1:
                        result = _a.sent();
                        console.log("Deleted ".concat(result.deletedCount, " messages."));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    conversationRepository.prototype.RDeleteSingleChat = function (chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chatRoomMode_1.default.updateMany({ _id: { $in: chatRoomId }, 'members.userId': userId }, {
                            $set: {
                                // 'members.$.status': true,
                                'members.$.clearChat': Date.now()
                            }
                        }, { new: true })];
                    case 1:
                        response = _a.sent();
                        console.log("updatedddddddddddddddddddddddddddddddddddddddddddd");
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    conversationRepository.prototype.RuserTouserBlock = function (chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chatRoomMode_1.default.updateMany({ _id: { $in: chatRoomId }, 'members.userId': userId }, {
                            $set: {
                                'members.$.status': true,
                                'members.$.clearChat': Date.now()
                            }
                        }, { new: true })];
                    case 1:
                        response = _a.sent();
                        console.log("Idssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                        // console.log(response)
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    conversationRepository.prototype.RuserTouserUnblock = function (chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chatRoomMode_1.default.updateMany({ _id: { $in: chatRoomId }, 'members.userId': userId }, {
                            $set: {
                                'members.$.status': false,
                                // 'members.$.clearChat': Date.now()
                            }
                        }, { new: true })];
                    case 1:
                        response = _a.sent();
                        console.log("updatedddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    conversationRepository = __decorate([
        (0, inversify_1.injectable)()
    ], conversationRepository);
    return conversationRepository;
}());
exports.conversationRepository = conversationRepository;
