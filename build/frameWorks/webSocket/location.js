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
Object.defineProperty(exports, "__esModule", { value: true });
const profileRepository_1 = require("../../repositories/user/profileRepository");
const conversationRepository_1 = require("../../repositories/user/conversationRepository");
const conversationRepo = new conversationRepository_1.conversationRepository();
const profileRepo = new profileRepository_1.ProfileRepository();
const socketConfig = (io) => {
    let connectedClients = {};
    let readyForRandomConnection = [];
    let matchedUsers = [];
    let readyForOnlyRandomChat = [];
    let alredyRandomChatting = [];
    io.on('connection', (socket) => {
        socket.on('on', (userId) => {
            if (userId) {
                connectedClients[userId] = socket.id;
            }
        });
        //   connectionRequest
        socket.on('connectionNotification', (senderId, receiverId, senderName, userProfileId, receiverProfileId) => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield profileRepo.RconnectionNotification(senderName, senderId, receiverId, userProfileId, receiverProfileId);
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
        }));
        // accept request
        socket.on('acceptedRequest', (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield profileRepo.acceptedRequest(senderId, receiverId);
            if (!response) {
                return;
            }
            let senderOne = response === null || response === void 0 ? void 0 : response.senderId._id.toString();
            if (connectedClients) {
                io.to(connectedClients[senderOne]).emit("notification", response);
            }
            else {
                console.log("sender offline");
            }
            let receiverOne = response.receiverId._id.toString();
            if (io.to(connectedClients[receiverOne])) {
                io.to(connectedClients[receiverOne]).emit("updateConnectionStatus");
            }
            else {
                console.log("reciever offline");
            }
        }));
        // connection reqeust
        socket.on('connectionRequested', (userName, senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield profileRepo.connectionRequest(userName, senderId, receiverId);
            // const senderString = response.sender.toString();
            const receiverString = response.receiverId.toString();
            if (response) {
                if (connectedClients[receiverString]) {
                    io.to(connectedClients[receiverString]).emit('notification', response);
                }
                else {
                    console.log("offline");
                }
                let senderOne = response.senderId._id.toString();
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
        }));
        // unconnectuser
        socket.on('unConnectUser', (delteSenderId, deleteReceiverId) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield profileRepo.RUnConnectUser(delteSenderId, deleteReceiverId);
            if (response) {
                const receiverString = response.receiverId.toString();
                if (connectedClients[receiverString]) {
                    io.to(connectedClients[receiverString]).emit('updateConnectionStatus');
                }
                else {
                    console.log("offline");
                }
                let senderOne = response.senderId.toString();
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
        }));
        socket.on('sendMessage', (chatRoomId, userId, receiverId, textMessage) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield conversationRepo.RsendMessage(chatRoomId, userId, receiverId, textMessage);
            if (response) {
                const senderString = response.sender.toString();
                const receiverString = response.receiver.toString();
                io.to(connectedClients[senderString]).emit('newMessage', response);
                // io.to(connectedClients[response.receiver]).emit('newMessage', response);
                const userDetails = yield profileRepo.findUserDetails(response.receiver);
                if (!userDetails) {
                    return;
                }
                const findBlockorUnBock = yield profileRepo.RfindBlockUnblockDetails(response.chatroom, response.receiver);
                const messageNotification = {
                    message: response.message,
                    nickName: userDetails.nickName,
                    imageUrl: userDetails.imageUrl,
                    currentStatus: findBlockorUnBock
                };
                if (!findBlockorUnBock) {
                    io.to(connectedClients[receiverString]).emit('newMessage', response);
                }
                io.to(connectedClients[receiverString]).emit('newMessageNotification', messageNotification);
            }
        }));
        socket.on('checkUserForVideoCall', (localId, remoteId) => __awaiter(void 0, void 0, void 0, function* () {
            if (connectedClients[remoteId]) {
                let response = yield profileRepo.RgetProfileDetails(localId);
                io.to(connectedClients[remoteId]).emit('askingPermisionVideoCall', response, localId, remoteId);
            }
        }));
        socket.on('ignoredVideoCall', (localId, remoteId) => __awaiter(void 0, void 0, void 0, function* () {
            if (connectedClients[localId]) {
                let response = yield profileRepo.RgetProfileDetails(localId);
                io.to(connectedClients[localId]).emit('ignoredStatus', response);
            }
        }));
        //  socket.on('ready',(id,message)=>{
        //     io.to(connectedClients[id]).emit("ready", message)
        //  })
        //  socket.on('candidate',(id,message)=>{
        //     io.to(connectedClients[id]).emit("candidate", message)
        //  })
        //  socket.on('offer',(id,message)=>{
        //     io.to(connectedClients[id]).emit("offer", message)
        //  })
        socket.on("message", (message) => {
            console.log(message.id);
            console.log("here here");
            console.log(message.id);
            // socket.broadcast.emit("message", message);
            console.log(connectedClients);
            io.to(connectedClients[message.id]).emit("message", message);
            // io.to(connectedClients[message.id]).emit("message", message)
        });
        socket.on('isTypingStatus', (receiver, typingStatus) => {
            if (connectedClients[receiver]) {
                io.to(connectedClients[receiver]).emit('typingStatus', typingStatus);
            }
        });
        socket.on('deleteMessage', (messagesId, senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield conversationRepo.RDeleteAllMessages(messagesId);
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
        }));
        socket.on('blockuserlive', (userDetail) => __awaiter(void 0, void 0, void 0, function* () {
            if (connectedClients[userDetail.id]) {
                io.to(connectedClients[userDetail.id]).emit('blockedUser');
            }
            else {
                console.log("else conditio");
                console.log(connectedClients);
            }
        }));
        // random   Connection 
        function getRandomUser(currentUserId) {
            console.log("conenction");
            console.log(readyForRandomConnection);
            console.log("curretn suerID");
            console.log(currentUserId);
            const availableUsers = readyForRandomConnection.filter(userId => {
                console.log(userId);
                if (userId !== currentUserId) {
                    let res = matchedUsers.includes(userId);
                    if (!res) {
                        return userId;
                    }
                }
            });
            if (availableUsers.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableUsers.length);
                return availableUsers[randomIndex];
            }
        }
        socket.on('readyToChat', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            if (!readyForRandomConnection.includes(userId)) {
                readyForRandomConnection.push(userId);
                let randomUserId = yield getRandomUser(userId);
                if (randomUserId !== undefined) {
                    matchedUsers.push(userId);
                    matchedUsers.push(randomUserId);
                    let currentUserIndex = readyForRandomConnection.indexOf(userId);
                    let oppositeOneIndex = readyForRandomConnection.indexOf(randomUserId);
                    if (readyForRandomConnection[currentUserIndex]) {
                        try {
                            let a = readyForRandomConnection[currentUserIndex];
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
                        let b = readyForRandomConnection[oppositeOneIndex];
                        // const randomProfileDetails=await profileRepo.RGetRandomProfileDetails(randomUserId)
                        io.to(connectedClients[b]).emit('ready', randomUserId, userId);
                    }
                    else {
                        console.log("second keriyila");
                    }
                    // random video connectoin 
                    socket.on("readytochat", (message) => {
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
            }
        }));
        //  remove users from array
        socket.on('removeUsersArray', (res) => {
            const { userId, receiver } = res;
            if (readyForRandomConnection.includes(userId)) {
                let currentuserIdIndex = readyForRandomConnection.indexOf(userId);
                readyForRandomConnection.splice(currentuserIdIndex, 1);
                let currentMatchedUserIndex = matchedUsers.indexOf(userId);
                matchedUsers.splice(currentMatchedUserIndex, 1);
                console.log("fisi");
            }
            if (readyForRandomConnection.includes(receiver)) {
                let oppositeUserIndex = readyForRandomConnection.indexOf(receiver);
                readyForRandomConnection.splice(oppositeUserIndex, 1);
                let currentMatchedUserIndex = matchedUsers.indexOf(receiver);
                matchedUsers.splice(currentMatchedUserIndex, 1);
            }
            io.to(connectedClients[userId]).emit("skippedRemoved");
        });
        socket.on("randomVideoConnection", (message) => {
            // socket.broadcast.emit("message", message);
            console.log(connectedClients);
            console.log(connectedClients[message.id]);
            io.to(connectedClients[message.id]).emit("randomVideoConnection", message);
            // io.to(connectedClients[message.id]).emit("message", message)
        });
        // randomConnectionComponentChangeBothClearing
        socket.on('randomConnectionComponentChangeBothClearing', (res) => {
            const { userId, receiverId } = res;
            let currentuserIdIndex = readyForRandomConnection.indexOf(userId);
            readyForRandomConnection.splice(currentuserIdIndex, 1);
            matchedUsers.splice(currentuserIdIndex, 1);
            let oppositeUserIndex = readyForRandomConnection.indexOf(receiverId);
            // readyForRandomConnection.splice(oppositeUserIndex,1)
            matchedUsers.splice(oppositeUserIndex, 1);
        });
        // randomConnectionComponentChangeCurrentClearing
        socket.on('randomConnectionComponentChangeCurrentClearing', (res) => {
            const { userId } = res;
            let currentuserIdIndex = readyForRandomConnection.indexOf(userId);
            if (currentuserIdIndex) {
                readyForRandomConnection.splice(currentuserIdIndex, 1);
                matchedUsers.splice(currentuserIdIndex, 1);
            }
        });
        // randomChatMessage
        socket.on('randomChatMessage', (res) => {
            const { userId, receiver, message } = res;
            console.log(res);
            io.to(connectedClients[userId]).emit("randomChatMessage", res);
            io.to(connectedClients[receiver]).emit("randomChatMessage", res);
        });
        /// userTouserOnlyRandomChat
        function findUserForOnlyChat(userId) {
            console.log(readyForOnlyRandomChat);
            let availableUsers = readyForOnlyRandomChat.filter((a, b) => {
                let result = alredyRandomChatting.includes(a);
                if (a !== userId && !result) {
                    return a;
                }
            });
            if (availableUsers.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableUsers.length);
                return availableUsers[randomIndex];
            }
        }
        socket.on('userTouserOnlyRandomChat', (userId) => {
            readyForOnlyRandomChat.push(userId);
            let getFreeUser = findUserForOnlyChat(userId);
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
        socket.on('userTouserLiveChatting', (res) => {
            const { userId, receiver, message } = res;
            console.log(connectedClients);
            console.log(userId);
            console.log(receiver);
            io.to(connectedClients[userId]).emit("userTouserLiveChatting", res);
            io.to(connectedClients[receiver]).emit("userTouserLiveChatting", res);
        });
        socket.on('userTouserOnlyRandomChatSkip', (userId, oppositeUserId) => {
            if (userId) {
                if (readyForOnlyRandomChat.includes(userId)) {
                    let indexOfWaitList = readyForOnlyRandomChat.indexOf(userId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    let indexOfConnected = alredyRandomChatting.indexOf(userId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                    console.log("keri 123");
                }
                io.to(connectedClients[userId]).emit("userTouserOnlyRandomChatSkip");
            }
            console.log(readyForOnlyRandomChat);
            if (oppositeUserId) {
                if (readyForOnlyRandomChat.includes(oppositeUserId)) {
                    let indexOfWaitList = readyForOnlyRandomChat.indexOf(oppositeUserId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    let indexOfConnected = alredyRandomChatting.indexOf(oppositeUserId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                }
                io.to(connectedClients[oppositeUserId]).emit("userTouserOnlyRandomChatSkipSecond");
            }
        });
        socket.on('userTouserOnlyRandomChatComponentChange', (userId, oppositeUserId) => {
            if (userId) {
                if (readyForOnlyRandomChat.includes(userId)) {
                    let indexOfWaitList = readyForOnlyRandomChat.indexOf(userId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    let indexOfConnected = alredyRandomChatting.indexOf(userId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                    console.log("keri 123");
                }
                // io.to(connectedClients[userId]).emit("userTouserOnlyRandomChatSkip")
            }
            console.log(readyForOnlyRandomChat);
            if (oppositeUserId) {
                if (readyForOnlyRandomChat.includes(oppositeUserId)) {
                    let indexOfWaitList = readyForOnlyRandomChat.indexOf(oppositeUserId);
                    readyForOnlyRandomChat.splice(indexOfWaitList, 1);
                    let indexOfConnected = alredyRandomChatting.indexOf(oppositeUserId);
                    alredyRandomChatting.splice(indexOfConnected, 1);
                }
                io.to(connectedClients[oppositeUserId]).emit("userTouserOnlyRandomChatSkipSecond");
            }
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.default = socketConfig;
