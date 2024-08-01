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
Object.defineProperty(exports, "__esModule", { value: true });
var locationRepository_1 = require("../../repositories/locationRepository");
var profileRepository_1 = require("../../repositories/profileRepository");
var appConst_1 = require("../../utils/appConst");
var profileRoute_1 = require("../../routes/profileRoute");
var conversation_1 = require("../../routes/conversation");
// const container=new Container()
var profileRepo = profileRoute_1.container.get(appConst_1.INTERFACE_TYPE.ProfileRepository);
var conversationRepo = conversation_1.conversationContainer.get(appConst_1.INTERFACE_TYPE.ConversationRepository);
var repository = new locationRepository_1.locationRepository();
var profile = new profileRepository_1.ProfileRepository();
var socketConfig = function (io) {
    var connectedClients = {};
    var readyForRandomConnection = [];
    var matchedUsers = [];
    var readyForOnlyRandomChat = [];
    var alredyRandomChatting = [];
    io.on('connection', function (socket) {
        socket.on('on', function (userId) {
            if (userId) {
                connectedClients[userId] = socket.id;
            }
        });
        //   connectionRequest
        socket.on('connectionNotification', function (senderId, receiverId, senderName, userProfileId, receiverProfileId) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, profile.RconnectionNotification(senderName, senderId, receiverId, userProfileId, receiverProfileId)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            if (connectedClients[response.receiverId]) {
                                io.to(connectedClients[response.receiverId]).emit('notification', response);
                            }
                            else {
                                console.log("offline");
                            }
                        }
                        else {
                            console.log("sijdfosijfiosd");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // accept request
        socket.on('acceptedRequest', function (senderId, receiverId) { return __awaiter(void 0, void 0, void 0, function () {
            var response, senderOne, receiverOne;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, profileRepo.acceptedRequest(senderId, receiverId)];
                    case 1:
                        response = _a.sent();
                        senderOne = response.senderId._id.toString();
                        if (connectedClients) {
                            io.to(connectedClients[senderOne]).emit("notification", response);
                        }
                        else {
                            console.log("sender offline");
                        }
                        receiverOne = response.receiverId._id.toString();
                        if (io.to(connectedClients[receiverOne])) {
                            io.to(connectedClients[receiverOne]).emit("updateConnectionStatus");
                        }
                        else {
                            console.log("reciever offline");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // connection reqeust
        socket.on('connectionRequested', function (userName, senderId, receiverId) { return __awaiter(void 0, void 0, void 0, function () {
            var response, senderOne;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, profileRepo.connectionRequest(userName, senderId, receiverId)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            if (connectedClients[response.receiverId]) {
                                io.to(connectedClients[response.receiverId]).emit('notification', response);
                            }
                            else {
                                console.log("offline");
                            }
                            senderOne = response.senderId._id.toString();
                            if (connectedClients[senderOne]) {
                                io.to(connectedClients[senderOne]).emit('updateConnectionStatus');
                            }
                            else {
                                console.log("offline");
                            }
                        }
                        else {
                            console.log("errror");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // unconnectuser
        socket.on('unConnectUser', function (delteSenderId, deleteReceiverId) { return __awaiter(void 0, void 0, void 0, function () {
            var response, receiverOne, senderOne;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, profileRepo.RUnConnectUser(delteSenderId, deleteReceiverId)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            if (connectedClients[response.receiverId]) {
                                receiverOne = response.receiverId.toString();
                                io.to(connectedClients[receiverOne]).emit('updateConnectionStatus');
                            }
                            else {
                                console.log("offline");
                            }
                            senderOne = response.senderId.toString();
                            if (connectedClients[senderOne]) {
                                io.to(connectedClients[senderOne]).emit('updateConnectionStatus');
                            }
                            else {
                                console.log("offline");
                            }
                        }
                        else {
                            console.log("errror");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on('sendMessage', function (chatRoomId, userId, receiverId, textMessage) { return __awaiter(void 0, void 0, void 0, function () {
            var response, userDetails, findBlockorUnBock, messageNotification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, conversationRepo.RsendMessage(chatRoomId, userId, receiverId, textMessage)];
                    case 1:
                        response = _a.sent();
                        console.log("messssssssageeeeeeeeeeeeeeeeee sendddddddddddddddddddddddddddddddddd");
                        console.log(response);
                        if (!response) return [3 /*break*/, 4];
                        io.to(connectedClients[response.sender]).emit('newMessage', response);
                        return [4 /*yield*/, profileRepo.findUserDetails(response.receiver)];
                    case 2:
                        userDetails = _a.sent();
                        return [4 /*yield*/, profile.RfindBlockUnblockDetails(response.chatroom, response.receiver)];
                    case 3:
                        findBlockorUnBock = _a.sent();
                        messageNotification = {
                            message: response.message,
                            nickName: userDetails.nickName,
                            imageUrl: userDetails.imageUrl,
                            currentStatus: findBlockorUnBock
                        };
                        if (!findBlockorUnBock) {
                            io.to(connectedClients[response.receiver]).emit('newMessage', response);
                        }
                        io.to(connectedClients[response.receiver]).emit('newMessageNotification', messageNotification);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        socket.on('checkUserForVideoCall', function (localId, remoteId) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!connectedClients[remoteId]) return [3 /*break*/, 2];
                        console.log("checking 123 321 ");
                        return [4 /*yield*/, profileRepo.RgetProfileDetails(localId)];
                    case 1:
                        response = _a.sent();
                        io.to(connectedClients[remoteId]).emit('askingPermisionVideoCall', response, localId, remoteId);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        socket.on('ignoredVideoCall', function (localId, remoteId) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!connectedClients[localId]) return [3 /*break*/, 2];
                        return [4 /*yield*/, profileRepo.RgetProfileDetails(localId)];
                    case 1:
                        response = _a.sent();
                        io.to(connectedClients[localId]).emit('ignoredStatus', response);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        //  socket.on('ready',(id,message)=>{
        //     io.to(connectedClients[id]).emit("ready", message)
        //  })
        //  socket.on('candidate',(id,message)=>{
        //     io.to(connectedClients[id]).emit("candidate", message)
        //  })
        //  socket.on('offer',(id,message)=>{
        //     io.to(connectedClients[id]).emit("offer", message)
        //  })
        socket.on("message", function (message) {
            console.log(message.id);
            console.log("here here");
            console.log(message.id);
            // socket.broadcast.emit("message", message);
            console.log(connectedClients);
            io.to(connectedClients[message.id]).emit("message", message);
            // io.to(connectedClients[message.id]).emit("message", message)
        });
        socket.on('isTypingStatus', function (receiver, typingStatus) {
            if (connectedClients[receiver]) {
                io.to(connectedClients[receiver]).emit('typingStatus', typingStatus);
            }
        });
        socket.on('deleteMessage', function (messagesId, senderId, receiverId) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("delted message");
                        console.log(messagesId);
                        console.log("sender");
                        console.log(senderId);
                        console.log("receiverId");
                        console.log(receiverId);
                        console.log("finish");
                        return [4 /*yield*/, conversationRepo.RDeleteAllMessages(messagesId)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            console.log("first");
                            console.log(connectedClients);
                            console.log(senderId);
                            if (connectedClients[senderId]) {
                                console.log(senderId);
                                console.log("second");
                                io.to(connectedClients[senderId]).emit('deletedStatus');
                            }
                            if (connectedClients[receiverId]) {
                                io.to(connectedClients[receiverId]).emit('deletedStatus');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on('blockuserlive', function (userDetail) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("blockuser user useir useizr 00000000000000000000000000000000000000000000000000000");
                console.log(userDetail);
                console.log("jsdfidsfhidshf");
                if (connectedClients[userDetail.id]) {
                    console.log("123 123 blockuser user useir useizr ");
                    io.to(connectedClients[userDetail.id]).emit('blockedUser');
                }
                else {
                    console.log("else conditio");
                    console.log(connectedClients);
                }
                return [2 /*return*/];
            });
        }); });
        // random   Connection 
        function getRandomUser(currentUserId) {
            console.log("conenction");
            console.log(readyForRandomConnection);
            console.log("curretn suerID");
            console.log(currentUserId);
            var availableUsers = readyForRandomConnection.filter(function (userId) {
                console.log(userId);
                if (userId !== currentUserId) {
                    console.log("keri ivide");
                    console.log(userId);
                    console.log("first");
                    console.log(matchedUsers);
                    // let res=matchedUsers.some(pair=>pair.includes(userId))
                    var res = matchedUsers.includes(userId);
                    console.log("matched");
                    console.log(matchedUsers);
                    console.log(res);
                    if (!res) {
                        return userId;
                    }
                }
            });
            console.log("aviable users");
            console.log(availableUsers);
            console.log("sotp");
            if (availableUsers.length > 0) {
                var randomIndex = Math.floor(Math.random() * availableUsers.length);
                return availableUsers[randomIndex];
            }
        }
        socket.on('readyToChat', function (userId) { return __awaiter(void 0, void 0, void 0, function () {
            var randomUserId, currentUserIndex, oppositeOneIndex, a, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("user" + userId);
                        console.log("yes ready to chat  fffffffffffffffffffffffffffffffffffffffffffffffffff  000000000000000000000000000000000000000");
                        console.log(readyForRandomConnection);
                        if (!!readyForRandomConnection.includes(userId)) return [3 /*break*/, 2];
                        readyForRandomConnection.push(userId);
                        return [4 /*yield*/, getRandomUser(userId)];
                    case 1:
                        randomUserId = _a.sent();
                        console.log(randomUserId);
                        console.log("randomuseId");
                        console.log(matchedUsers);
                        if (randomUserId !== undefined) {
                            console.log("9847474");
                            console.log(readyForRandomConnection);
                            matchedUsers.push(userId);
                            matchedUsers.push(randomUserId);
                            console.log(userId);
                            console.log(randomUserId);
                            currentUserIndex = readyForRandomConnection.indexOf(userId);
                            oppositeOneIndex = readyForRandomConnection.indexOf(randomUserId);
                            if (readyForRandomConnection[currentUserIndex]) {
                                console.log("first piy8i");
                                console.log(userId);
                                console.log(randomUserId);
                                try {
                                    a = readyForRandomConnection[currentUserIndex];
                                    console.log(connectedClients[a]);
                                    console.log("first poyiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                                    console.log(userId);
                                    console.log(randomUserId);
                                    // const randomProfileDetails=await profileRepo.RGetRandomProfileDetails(randomUserId)
                                    console.log("matchedddddddddddddddddddd usersssss");
                                    console.log(matchedUsers);
                                    // io.to(connectedClients[a]).emit('ready',userId,randomUserId);
                                    io.to(connectedClients[a]).emit('readys', userId, randomUserId);
                                }
                                catch (error) {
                                    console.log("server rerror");
                                    console.log(error);
                                }
                            }
                            else {
                                console.log("keriyila");
                            }
                            if (readyForRandomConnection[oppositeOneIndex]) {
                                console.log("second poyui");
                                console.log(readyForRandomConnection[oppositeOneIndex]);
                                b = readyForRandomConnection[oppositeOneIndex];
                                console.log(connectedClients[b]);
                                console.log("second poyiiiiiiii");
                                console.log(userId);
                                console.log(randomUserId);
                                // const randomProfileDetails=await profileRepo.RGetRandomProfileDetails(randomUserId)
                                io.to(connectedClients[b]).emit('ready', randomUserId, userId);
                            }
                            else {
                                console.log("second keriyila");
                            }
                            // random video connectoin 
                            socket.on("readytochat", function (message) {
                                console.log(message.id);
                                console.log("here here");
                                console.log(message.id);
                                // socket.broadcast.emit("message", message);
                                console.log(connectedClients);
                                io.to(connectedClients[message.id]).emit("readytochat", message);
                                // io.to(connectedClients[message.id]).emit("message", message)
                            });
                        }
                        else {
                            console.log(readyForRandomConnection);
                            console.log("no avaible userws ater ethere curretn time");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        //  remove users from array
        socket.on('removeUsersArray', function (res) {
            var userId = res.userId, receiver = res.receiver;
            console.log("removed removed removed removed removed");
            console.log(userId, receiver);
            if (readyForRandomConnection.includes(userId)) {
                var currentuserIdIndex = readyForRandomConnection.indexOf(userId);
                readyForRandomConnection.splice(currentuserIdIndex, 1);
                var currentMatchedUserIndex = matchedUsers.indexOf(userId);
                matchedUsers.splice(currentMatchedUserIndex, 1);
                console.log("fisi");
            }
            if (readyForRandomConnection.includes(receiver)) {
                var oppositeUserIndex = readyForRandomConnection.indexOf(receiver);
                readyForRandomConnection.splice(oppositeUserIndex, 1);
                var currentMatchedUserIndex = matchedUsers.indexOf(receiver);
                matchedUsers.splice(currentMatchedUserIndex, 1);
                console.log("ished");
                console.log(readyForRandomConnection);
                console.log("all removed all removed");
            }
            io.to(connectedClients[userId]).emit("skippedRemoved");
        });
        socket.on("randomVideoConnection", function (message) {
            console.log(message);
            console.log("vanuloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
            console.log("here here");
            console.log(message.id);
            // socket.broadcast.emit("message", message);
            console.log(connectedClients);
            console.log(connectedClients[message.id]);
            io.to(connectedClients[message.id]).emit("randomVideoConnection", message);
            // io.to(connectedClients[message.id]).emit("message", message)
        });
        // randomConnectionComponentChangeBothClearing
        socket.on('randomConnectionComponentChangeBothClearing', function (res) {
            var userId = res.userId, receiverId = res.receiverId;
            var currentuserIdIndex = readyForRandomConnection.indexOf(userId);
            readyForRandomConnection.splice(currentuserIdIndex, 1);
            matchedUsers.splice(currentuserIdIndex, 1);
            var oppositeUserIndex = readyForRandomConnection.indexOf(receiverId);
            // readyForRandomConnection.splice(oppositeUserIndex,1)
            matchedUsers.splice(oppositeUserIndex, 1);
            console.log("aftereeeeeeeeeeeeeeeeee deletingggggggggggggggggggggggggggggggggggggggggggggggggg");
            console.log(readyForRandomConnection);
            console.log("mathcedddddddddddddd");
            console.log(matchedUsers);
        });
        // randomConnectionComponentChangeCurrentClearing
        socket.on('randomConnectionComponentChangeCurrentClearing', function (res) {
            var userId = res.userId;
            var currentuserIdIndex = readyForRandomConnection.indexOf(userId);
            if (currentuserIdIndex) {
                readyForRandomConnection.splice(currentuserIdIndex, 1);
                matchedUsers.splice(currentuserIdIndex, 1);
            }
        });
        // randomChatMessage
        socket.on('randomChatMessage', function (res) {
            console.log("randomchatttttttttttttttttttttttt messsssssssageeeee");
            var userId = res.userId, receiver = res.receiver, message = res.message;
            console.log(res);
            io.to(connectedClients[userId]).emit("randomChatMessage", res);
            io.to(connectedClients[receiver]).emit("randomChatMessage", res);
        });
        /// userTouserOnlyRandomChat
        function findUserForOnlyChat(userId) {
            console.log(readyForOnlyRandomChat);
            var availableUsers = readyForOnlyRandomChat.filter(function (a, b) {
                var result = alredyRandomChatting.includes(a);
                if (a !== userId && !result) {
                    return a;
                }
            });
            if (availableUsers.length > 0) {
                var randomIndex = Math.floor(Math.random() * availableUsers.length);
                return availableUsers[randomIndex];
            }
        }
        socket.on('userTouserOnlyRandomChat', function (userId) {
            console.log(readyForOnlyRandomChat);
            console.log(alredyRandomChatting);
            console.log(userId);
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
            readyForOnlyRandomChat.push(userId);
            var getFreeUser = findUserForOnlyChat(userId);
            console.log("gotttttttttttttttttttttttttttttttt userrrrrrrr");
            console.log(getFreeUser);
            console.log(userId);
            if (getFreeUser !== undefined) {
                alredyRandomChatting.push(userId);
                alredyRandomChatting.push(getFreeUser);
                console.log(userId);
                console.log(getFreeUser);
                if (connectedClients[userId]) {
                    console.log("first");
                    io.to(connectedClients[userId]).emit("userTouserOnlyRandomChat", userId, getFreeUser);
                }
                if (connectedClients[getFreeUser]) {
                    console.log("second");
                    io.to(connectedClients[getFreeUser]).emit("userTouserOnlyRandomChat", getFreeUser, userId);
                }
            }
        });
        socket.on('userTouserLiveChatting', function (res) {
            console.log("ivide vanuuuuu");
            console.log(res);
            var userId = res.userId, receiver = res.receiver, message = res.message;
            console.log(connectedClients);
            console.log(userId);
            console.log(receiver);
            io.to(connectedClients[userId]).emit("userTouserLiveChatting", res);
            io.to(connectedClients[receiver]).emit("userTouserLiveChatting", res);
        });
        socket.on('userTouserOnlyRandomChatSkip', function (userId, oppositeUserId) {
            console.log("firstttttttt");
            console.log(readyForOnlyRandomChat);
            console.log(userId, oppositeUserId);
            if (userId) {
                if (readyForOnlyRandomChat.includes(userId)) {
                    var indexOfWaitList = readyForOnlyRandomChat.indexOf(userId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    var indexOfConnected = alredyRandomChatting.indexOf(userId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                    console.log("keri 123");
                }
                io.to(connectedClients[userId]).emit("userTouserOnlyRandomChatSkip");
            }
            console.log(readyForOnlyRandomChat);
            if (oppositeUserId) {
                if (readyForOnlyRandomChat.includes(oppositeUserId)) {
                    var indexOfWaitList = readyForOnlyRandomChat.indexOf(oppositeUserId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    var indexOfConnected = alredyRandomChatting.indexOf(oppositeUserId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                }
                io.to(connectedClients[oppositeUserId]).emit("userTouserOnlyRandomChatSkipSecond");
            }
        });
        socket.on('userTouserOnlyRandomChatComponentChange', function (userId, oppositeUserId) {
            if (userId) {
                if (readyForOnlyRandomChat.includes(userId)) {
                    var indexOfWaitList = readyForOnlyRandomChat.indexOf(userId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    var indexOfConnected = alredyRandomChatting.indexOf(userId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                    console.log("keri 123");
                }
                // io.to(connectedClients[userId]).emit("userTouserOnlyRandomChatSkip")
            }
            console.log(readyForOnlyRandomChat);
            if (oppositeUserId) {
                if (readyForOnlyRandomChat.includes(oppositeUserId)) {
                    var indexOfWaitList = readyForOnlyRandomChat.indexOf(oppositeUserId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    var indexOfConnected = alredyRandomChatting.indexOf(oppositeUserId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                }
                io.to(connectedClients[oppositeUserId]).emit("userTouserOnlyRandomChatSkipSecond");
            }
        });
        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    });
};
exports.default = socketConfig;
// socket.on("ready",()=>{
//     if (pc) {
//       alert("already in call ignoreing")
//       console.log("already in call, ignoring");
//       return;
//     }
//     makeCall();
//   })
//   socket.on('candidate',(message)=>{
//     handleCandidate(message);
//   })
//   socket.on('offer',(message)=>{
//     handleOffer(message);
//   })
//   socket.on('answer',(messge)=>{
//     handleAnswer(messge);
//   })
//   socket.on('bye',()=>{
//     if (pc) {
//       hangup();
//     }
//   })
