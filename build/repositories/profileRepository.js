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
exports.ProfileRepository = void 0;
var inversify_1 = require("inversify");
var notificationModel_1 = __importDefault(require("../frameWorks/mongodb/models/notificationModel"));
var mongoose_1 = require("mongoose");
var userModel_1 = __importDefault(require("../frameWorks/mongodb/models/userModel"));
var subscriptionModel_1 = __importDefault(require("../frameWorks/mongodb/models/subscriptionModel"));
var chatRoomMode_1 = __importDefault(require("../frameWorks/mongodb/models/chatRoomMode"));
var web_push_1 = __importDefault(require("web-push"));
var node_cron_1 = __importDefault(require("node-cron"));
var searchSubscription_1 = __importDefault(require("../frameWorks/mongodb/models/searchSubscription"));
var paymentSummary_1 = __importDefault(require("../frameWorks/mongodb/models/paymentSummary"));
var config = {
    subject: "mailto:emilshiju10@gmail.com",
    publicKey: "BMdNWN2lmEXF2F9cjH-zOOA-7ugTGloANQyN5i1w3Pw3hVvyOsjdKPTiGBkWET93CLcO8ix_mZFWJUpPBOI3dbM",
    privateKey: "Fz37yqFAq68p8cFeQb_usGOOux8ab1kGlnjsuampu1M",
};
web_push_1.default.setVapidDetails(config.subject, config.publicKey, config.privateKey);
var ProfileRepository = /** @class */ (function () {
    function ProfileRepository() {
    }
    ProfileRepository.prototype.RcreateProfile = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var updateData, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateData = {
                            bio: input.bio,
                            profession: input.profession,
                            nickName: input.nickName,
                            imageUrl: input.imageUrl,
                        };
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: input.userId }, updateData, { new: true })];
                    case 1:
                        profile = _a.sent();
                        console.log(profile);
                        return [2 /*return*/, profile];
                }
            });
        });
    };
    ProfileRepository.prototype.RgetProfileUrl = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("thirdd");
                        console.log(input);
                        return [4 /*yield*/, userModel_1.default.findById(input)];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (user === null || user === void 0 ? void 0 : user.nickName) {
                            data = {
                                nickName: user === null || user === void 0 ? void 0 : user.nickName,
                                profession: user === null || user === void 0 ? void 0 : user.profession,
                                bio: user === null || user === void 0 ? void 0 : user.bio,
                                imageUrl: user === null || user === void 0 ? void 0 : user.imageUrl,
                                currSearch: user === null || user === void 0 ? void 0 : user.currSearch,
                                maxSearch: user === null || user === void 0 ? void 0 : user.maxSearch,
                                profileUrl: user === null || user === void 0 ? void 0 : user.images
                            };
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    ProfileRepository.prototype.RupdateImageUrl = function (userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var found, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, { imageUrl: imageUrl })];
                    case 1:
                        found = _a.sent();
                        console.log(found);
                        url = {
                            imageUrl: found === null || found === void 0 ? void 0 : found.imageUrl
                        };
                        return [2 /*return*/, url];
                }
            });
        });
    };
    ProfileRepository.prototype.RconnectionNotification = function (senderName, senderId, receiverId, userProfileId, receiverProfileId) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, savedNotification, save, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log(receiverId);
                        console.log(userProfileId);
                        return [4 /*yield*/, new notificationModel_1.default({
                                senderId: senderId,
                                receiverId: receiverId,
                                senderProfile: userProfileId,
                                receiverIdProfile: receiverProfileId,
                                type: "connect",
                                message: "".concat(senderName, " wants to connect with you."),
                            })];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, notification.save()];
                    case 2:
                        savedNotification = _a.sent();
                        return [4 /*yield*/, savedNotification.populate("senderProfile")];
                    case 3:
                        save = _a.sent();
                        console.log(savedNotification);
                        console.log("keteyiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                        return [2 /*return*/, save];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProfileRepository.prototype.RgetNotification = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connectRequests;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, notificationModel_1.default.find({
                            $or: [{ senderId: userId }, { receiverId: userId }],
                        })];
                    case 1:
                        connectRequests = _a.sent();
                        if (!connectRequests || connectRequests.length === 0) {
                            return [2 /*return*/, false];
                        }
                        // const objectId = new Types.ObjectId(userId);
                        return [4 /*yield*/, Promise.all(connectRequests.map(function (connectRequest) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(connectRequest.senderId);
                                            if (!(connectRequest.senderId.toString() == userId)) return [3 /*break*/, 2];
                                            console.log("its eqaul");
                                            console.log(connectRequest.senderId.toString());
                                            return [4 /*yield*/, connectRequest.populate('receiverId')];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2:
                                            if (!(connectRequest.receiverId.toString() === userId)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, connectRequest.populate('senderId')];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: 
                                        // Optionally save each updated connect request
                                        return [4 /*yield*/, connectRequest.save()];
                                        case 5:
                                            // Optionally save each updated connect request
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        // const objectId = new Types.ObjectId(userId);
                        _a.sent();
                        return [2 /*return*/, connectRequests
                            // console.log(connectRequests)
                        ];
                }
            });
        });
    };
    ProfileRepository.prototype.acceptedRequest = function (senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function () {
            var userProfile, connection, userProfile2, connection2, notification, updatedNotification, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(senderId);
                        console.log(receiverId);
                        return [4 /*yield*/, userModel_1.default.findById(senderId)];
                    case 1:
                        userProfile = _a.sent();
                        if (!userProfile) {
                            // No profile found for the user
                            return [2 /*return*/, false];
                        }
                        connection = userProfile.connections.find(function (conn) {
                            //@ts-ignore
                            return conn.userId && conn.userId.equals(receiverId);
                        });
                        if (connection) {
                            connection.status = 'true';
                        }
                        return [4 /*yield*/, userProfile.save()];
                    case 2:
                        _a.sent();
                        console.log(connection);
                        return [4 /*yield*/, userModel_1.default.findById(receiverId)];
                    case 3:
                        userProfile2 = _a.sent();
                        if (!userProfile2) {
                            // No profile found for the user
                            return [2 /*return*/, false];
                        }
                        connection2 = userProfile2.connections.find(function (conn) {
                            //@ts-ignore
                            return conn.userId && conn.userId.equals(senderId);
                        });
                        if (connection2) {
                            connection2.status = 'true';
                        }
                        return [4 /*yield*/, userProfile2.save()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, notificationModel_1.default.findOne({
                                senderId: senderId,
                                receiverId: receiverId,
                            }).populate('receiverId', 'nickName , imageUrl')];
                    case 5:
                        notification = _a.sent();
                        if (!notification) {
                            console.log('Notification not found');
                            return [2 /*return*/];
                        }
                        notification.status = 'true';
                        notification.message = 'both are connected';
                        return [4 /*yield*/, notification.save()];
                    case 6:
                        updatedNotification = _a.sent();
                        console.log("updaed notificaiotn");
                        console.log(updatedNotification);
                        console.log("kkkkkkkk");
                        return [2 /*return*/, updatedNotification];
                    case 7:
                        error_2 = _a.sent();
                        console.log("error");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ProfileRepository.prototype.connectionRequest = function (userName, senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function () {
            var senderObjectId, receiverObjectId, userFirst, userSecond, response, response2, findNotification, saved, save, notification, savedNotification, save;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("oneeeeeeeeeeeeeeeee");
                        console.log(userName, senderId, receiverId);
                        senderObjectId = new mongoose_1.Types.ObjectId(senderId);
                        receiverObjectId = new mongoose_1.Types.ObjectId(receiverId);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: senderObjectId, 'connections.userId': receiverObjectId }, { $set: { 'connections.$.status': 'pending' } }, { new: true })];
                    case 1:
                        userFirst = _a.sent();
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: receiverObjectId, 'connections.userId': senderObjectId }, { $set: { 'connections.$.status': 'Accept' } }, { new: true })];
                    case 2:
                        userSecond = _a.sent();
                        if (!!userFirst) return [3 /*break*/, 4];
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(senderId, {
                                $push: {
                                    connections: {
                                        userId: receiverId,
                                    }
                                }
                            }, { new: true } // This option returns the updated document
                            )];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!!userSecond) return [3 /*break*/, 6];
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(receiverId, {
                                $push: {
                                    connections: {
                                        userId: senderId,
                                        status: 'Accept'
                                    }
                                },
                            }, { new: true } // This option returns the updated document
                            )];
                    case 5:
                        response2 = _a.sent();
                        _a.label = 6;
                    case 6:
                        console.log("finding finding finding finding ");
                        return [4 /*yield*/, notificationModel_1.default.findOne({ $or: [
                                    { senderId: senderId, receiverId: receiverId },
                                    { senderId: receiverId, receiverId: senderId }
                                ] })];
                    case 7:
                        findNotification = _a.sent();
                        console.log("user is hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee    11111111111111111111111111111111111111111111111111111111111111111111111111111111");
                        console.log(findNotification);
                        console.log(senderObjectId);
                        console.log(receiverObjectId);
                        if (!findNotification) return [3 /*break*/, 10];
                        //@ts-ignore
                        findNotification.senderId = senderObjectId,
                            //@ts-ignore
                            findNotification.receiverId = receiverObjectId;
                        findNotification.type = 'connect';
                        findNotification.message = "".concat(userName, " wants to connect with you.");
                        return [4 /*yield*/, findNotification.save()];
                    case 8:
                        saved = _a.sent();
                        return [4 /*yield*/, saved.populate("senderId")];
                    case 9:
                        save = _a.sent();
                        return [2 /*return*/, save];
                    case 10: return [4 /*yield*/, new notificationModel_1.default({
                            senderId: senderId,
                            receiverId: receiverId,
                            type: "connect",
                            message: "".concat(userName, " wants to connect with you."),
                        })];
                    case 11:
                        notification = _a.sent();
                        return [4 /*yield*/, notification.save()];
                    case 12:
                        savedNotification = _a.sent();
                        return [4 /*yield*/, savedNotification.populate("senderId")];
                    case 13:
                        save = _a.sent();
                        console.log(savedNotification);
                        return [2 /*return*/, save];
                }
            });
        });
    };
    ProfileRepository.prototype.RcheckConnectionStatus = function (userId, receiverId) {
        return __awaiter(this, void 0, void 0, function () {
            var userProfile, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ivdieeeee 999999999999999999999999999999999999999999");
                        console.log(userId);
                        console.log(receiverId);
                        return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        userProfile = _a.sent();
                        if (!userProfile) {
                            // No profile found for the user
                            return [2 /*return*/, false];
                        }
                        connection = userProfile.connections.find(function (conn) {
                            return conn.userId && conn.userId.equals(receiverId);
                        });
                        if (!connection) {
                        }
                        console.log("all connection of user all ocnnectio n of user 00000000000000000000000000000000");
                        if (connection) {
                            return [2 /*return*/, connection];
                        }
                        return [2 /*return*/, 'false'];
                }
            });
        });
    };
    ProfileRepository.prototype.RgetProfileDetails = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(userId);
                        return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProfileRepository.prototype.RUnConnectUser = function (delteSenderId, deleteReceiverId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response2, findNotification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: delteSenderId, "connections.userId": deleteReceiverId }, { $set: { "connections.$.status": 'false' } })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: deleteReceiverId, "connections.userId": delteSenderId }, { $set: { "connections.$.status": 'false' } })];
                    case 2:
                        response2 = _a.sent();
                        return [4 /*yield*/, notificationModel_1.default.findOne({ $or: [
                                    { senderId: delteSenderId, receiverId: deleteReceiverId },
                                    { senderId: deleteReceiverId, receiverId: delteSenderId }
                                ] })
                            // @ts-ignore
                        ];
                    case 3:
                        findNotification = _a.sent();
                        // @ts-ignore
                        findNotification === null || findNotification === void 0 ? void 0 : findNotification.message = 'both are unConnected';
                        findNotification.save();
                        return [2 /*return*/, findNotification];
                }
            });
        });
    };
    ProfileRepository.prototype.findUserDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOne({ _id: id }, 'imageUrl nickName')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // firebase integration for push Notification
    ProfileRepository.prototype.RStorePushNotification = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var cornJon, response, sendNotification;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ivdie eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  bbbb");
                        console.log(value);
                        cornJon = null;
                        return [4 /*yield*/, subscriptionModel_1.default.create(value)];
                    case 1:
                        response = _a.sent();
                        sendNotification = function () { return __awaiter(_this, void 0, void 0, function () {
                            var subscriptions, tokens, notificationPromises, error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, subscriptionModel_1.default.find({})];
                                    case 1:
                                        subscriptions = _a.sent();
                                        tokens = subscriptions.map(function (subscription) {
                                            var endpointParts = subscription.endpoint.split('/');
                                            return endpointParts[endpointParts.length - 1];
                                        });
                                        if (subscriptions.length == 0) {
                                            cornJon.stop();
                                        }
                                        notificationPromises = subscriptions.map(function (subscription) {
                                            var payload = JSON.stringify({
                                                title: 'Neay by chat',
                                                body: 'lot of users are there nearby go on ',
                                            });
                                            return web_push_1.default.sendNotification(subscription, payload)
                                                .then(function () { return console.log('Notification sent successfully'); })
                                                .catch(function (error) { return console.error('Error sending notification:', error); });
                                        });
                                        return [4 /*yield*/, Promise.all(notificationPromises)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_3 = _a.sent();
                                        console.log("error in psh notificaon sending ");
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        // Schedule the task to run every 10 seconds
                        cornJon = node_cron_1.default.schedule('*/10 * * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sendNotification()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, {
                            timezone: 'UTC' // Optional: Specify the timezone if different from UTC
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileRepository.prototype.RUnsubscribeNotification = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedSubscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("valyeeeeeeeeeeeeeeeeeee");
                        console.log(value.endpoint);
                        return [4 /*yield*/, subscriptionModel_1.default.findOneAndDelete({ endpoint: value.endpoint })];
                    case 1:
                        deletedSubscription = _a.sent();
                        console.log(deletedSubscription);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileRepository.prototype.RGetRandomProfileDetails = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var profileDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(value)];
                    case 1:
                        profileDetails = _a.sent();
                        return [2 /*return*/, profileDetails];
                }
            });
        });
    };
    ProfileRepository.prototype.RfindBlockUnblockDetails = function (chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var Id, response, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("chatroooooooooommmmmmmmmmm detaaaaaaaaaaaaaaaaaaaaaaailllssssssssssssss");
                        Id = userId.toString();
                        console.log(chatRoomId, userId);
                        console.log("here found found found found");
                        console.log(Id);
                        return [4 /*yield*/, chatRoomMode_1.default.findOne({ _id: { $in: chatRoomId }, 'members.userId': userId })];
                    case 1:
                        response = _a.sent();
                        console.log("first response");
                        console.log(response);
                        console.log("current id");
                        console.log(Id);
                        status = response.members.find(function (a, b) {
                            var str = a.userId.toString();
                            console.log(str);
                            if (str == Id) {
                                return a;
                            }
                        });
                        console.log("resposne statussssssssssssssssssssssssssssssssssssssss");
                        console.log(status);
                        return [2 /*return*/, status.status];
                }
            });
        });
    };
    ProfileRepository.prototype.RpaymentSummary = function (subId, userId, paymentId, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var userDetails, searchSubscriptionDetails, inSubscriptionCount, updateUserDetails, searchSubscriptionPaymentSummary, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        userDetails = _a.sent();
                        return [4 /*yield*/, searchSubscription_1.default.findById(subId)
                            // const currentCountofSearch=userDetails?.maxSearch
                        ];
                    case 2:
                        searchSubscriptionDetails = _a.sent();
                        inSubscriptionCount = searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.maxCount;
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: userId }, { $inc: { maxSearch: inSubscriptionCount } })];
                    case 3:
                        updateUserDetails = _a.sent();
                        console.log("updated user detailssss");
                        console.log(updateUserDetails);
                        searchSubscriptionPaymentSummary = {
                            userId: userDetails === null || userDetails === void 0 ? void 0 : userDetails._id,
                            userName: userDetails === null || userDetails === void 0 ? void 0 : userDetails.userName,
                            nickName: userDetails === null || userDetails === void 0 ? void 0 : userDetails.nickName,
                            imageUrl: userDetails === null || userDetails === void 0 ? void 0 : userDetails.imageUrl,
                            gender: userDetails === null || userDetails === void 0 ? void 0 : userDetails.gender,
                            email: userDetails === null || userDetails === void 0 ? void 0 : userDetails.email,
                            dob: userDetails === null || userDetails === void 0 ? void 0 : userDetails.dob,
                            subscriptionName: searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.name,
                            maxCount: searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.maxCount,
                            price: searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.price,
                            timePeriod: searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.timePeriod,
                            searchSubUrl: searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.imageUrl,
                            description: searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.description,
                            paymentStatus: "sucess",
                            razorpayPaymentId: paymentId,
                            razorpayOrderId: orderId
                        };
                        return [4 /*yield*/, paymentSummary_1.default.create(searchSubscriptionPaymentSummary)];
                    case 4:
                        response = _a.sent();
                        response.save();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProfileRepository.prototype.RincrementSearchCount = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: userId }, { $inc: { currSearch: 1 } })];
                    case 1:
                        updateUser = _a.sent();
                        console.log("updatedddddddddddd userrrrrrrrrrrrrr");
                        console.log(updateUser);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileRepository.prototype.RdisplayProfileDetails = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProfileRepository.prototype.RuploadUserProfileImage = function (userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var resposne;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(imageUrl, userId);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: userId }, { $push: { images: imageUrl } }, { new: true })];
                    case 1:
                        resposne = _a.sent();
                        console.log(resposne);
                        console.log("lllllllllllllllllllllllllllllllllllllllllllllll");
                        return [2 /*return*/, resposne];
                }
            });
        });
    };
    ProfileRepository.prototype.RdeleteProfileImage = function (userId, index) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(userId, index, "sdffffffffffsdfdsfdsfdsfsdfdsfdsf");
                        return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        user.images.splice(index, 1);
                        // @ts-ignore
                        return [4 /*yield*/, user.save()];
                    case 2:
                        // @ts-ignore
                        _a.sent();
                        console.log("datedddddddddddddddddddddddddd");
                        console.log(user);
                        return [2 /*return*/, true];
                    case 3:
                        console.log("nulllll");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProfileRepository = __decorate([
        (0, inversify_1.injectable)()
    ], ProfileRepository);
    return ProfileRepository;
}());
exports.ProfileRepository = ProfileRepository;
