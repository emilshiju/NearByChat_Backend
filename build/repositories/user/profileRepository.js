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
exports.ProfileRepository = void 0;
const notificationModel_1 = __importDefault(require("../../frameWorks/mongodb/models/notificationModel"));
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("../../frameWorks/mongodb/models/userModel"));
const subscriptionModel_1 = __importDefault(require("../../frameWorks/mongodb/models/subscriptionModel"));
const chatRoomMode_1 = __importDefault(require("../../frameWorks/mongodb/models/chatRoomMode"));
const web_push_1 = __importDefault(require("web-push"));
const node_cron_1 = __importDefault(require("node-cron"));
const searchSubscription_1 = __importDefault(require("../../frameWorks/mongodb/models/searchSubscription"));
const paymentSummary_1 = __importDefault(require("../../frameWorks/mongodb/models/paymentSummary"));
const config = {
    subject: "mailto:emilshiju10@gmail.com",
    publicKey: "BMdNWN2lmEXF2F9cjH-zOOA-7ugTGloANQyN5i1w3Pw3hVvyOsjdKPTiGBkWET93CLcO8ix_mZFWJUpPBOI3dbM",
    privateKey: "Fz37yqFAq68p8cFeQb_usGOOux8ab1kGlnjsuampu1M",
};
web_push_1.default.setVapidDetails(config.subject, config.publicKey, config.privateKey);
class ProfileRepository {
    RcreateProfile(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = {
                    bio: input.bio,
                    profession: input.profession,
                    nickName: input.nickName,
                    imageUrl: input.imageUrl,
                };
                const profile = yield userModel_1.default.findOneAndUpdate({ _id: input.userId }, updateData, { new: true });
                // @ts-ignore
                return profile === null || profile === void 0 ? void 0 : profile.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetProfileUrl(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findById(input);
                console.log(user);
                if (user === null || user === void 0 ? void 0 : user.nickName) {
                    const data = {
                        nickName: user === null || user === void 0 ? void 0 : user.nickName,
                        profession: user === null || user === void 0 ? void 0 : user.profession,
                        bio: user === null || user === void 0 ? void 0 : user.bio,
                        imageUrl: user === null || user === void 0 ? void 0 : user.imageUrl,
                        currSearch: user === null || user === void 0 ? void 0 : user.currSearch,
                        maxSearch: user === null || user === void 0 ? void 0 : user.maxSearch,
                        profileUrl: user === null || user === void 0 ? void 0 : user.images,
                    };
                    return data;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RupdateImageUrl(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield userModel_1.default.findByIdAndUpdate(userId, {
                    imageUrl: imageUrl,
                });
                console.log(found);
                const url = {
                    imageUrl: (found === null || found === void 0 ? void 0 : found.imageUrl) || "",
                };
                return url;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RconnectionNotification(senderName, senderId, receiverId, userProfileId, receiverProfileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield new notificationModel_1.default({
                    senderId,
                    receiverId,
                    senderProfile: userProfileId,
                    receiverIdProfile: receiverProfileId,
                    type: "connect",
                    message: `${senderName} wants to connect with you.`,
                });
                const savedNotification = yield notification.save();
                const save = yield savedNotification.populate("senderProfile");
                return save;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectRequests = yield notificationModel_1.default.find({
                    $or: [{ senderId: userId }, { receiverId: userId }],
                });
                if (!connectRequests || connectRequests.length === 0) {
                    return false;
                }
                yield Promise.all(connectRequests.map((connectRequest) => __awaiter(this, void 0, void 0, function* () {
                    if (connectRequest.senderId.toString() == userId) {
                        yield connectRequest.populate("receiverId");
                    }
                    if (connectRequest.receiverId.toString() === userId) {
                        yield connectRequest.populate("senderId");
                    }
                    // Optionally save each updated connect request
                    yield connectRequest.save();
                })));
                return connectRequests;
            }
            catch (error) {
                throw error;
            }
        });
    }
    acceptedRequest(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProfile = yield userModel_1.default.findById(senderId);
                if (!userProfile) {
                    // No profile found for the user
                    return null;
                }
                const connection = userProfile.connections.find((conn) => conn.userId && conn.userId.equals(receiverId));
                if (connection) {
                    connection.status = "true";
                }
                yield userProfile.save();
                console.log(connection);
                const userProfile2 = yield userModel_1.default.findById(receiverId);
                if (!userProfile2) {
                    // No profile found for the user
                    return null;
                }
                const connection2 = userProfile2.connections.find((conn) => conn.userId && conn.userId.equals(senderId));
                if (connection2) {
                    connection2.status = "true";
                }
                yield userProfile2.save();
                const notification = yield notificationModel_1.default
                    .findOne({
                    senderId: senderId,
                    receiverId: receiverId,
                })
                    .populate("receiverId", "nickName , imageUrl");
                if (!notification) {
                    console.log("Notification not found");
                    return null;
                }
                notification.status = "true";
                notification.message = "both are connected";
                const updatedNotification = yield notification.save();
                if (updatedNotification == undefined) {
                    return null;
                }
                // @ts-ignore
                return updatedNotification.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    connectionRequest(userName, senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderObjectId = new mongoose_1.Types.ObjectId(senderId);
            const receiverObjectId = new mongoose_1.Types.ObjectId(receiverId);
            const userFirst = yield userModel_1.default.findOneAndUpdate({ _id: senderObjectId, "connections.userId": receiverObjectId }, { $set: { "connections.$.status": "pending" } }, { new: true });
            const userSecond = yield userModel_1.default.findOneAndUpdate({ _id: receiverObjectId, "connections.userId": senderObjectId }, { $set: { "connections.$.status": "Accept" } }, { new: true });
            if (!userFirst) {
                yield userModel_1.default.findByIdAndUpdate(senderId, {
                    $push: {
                        connections: {
                            userId: receiverId,
                        },
                    },
                }, { new: true } // This option returns the updated document
                );
            }
            if (!userSecond) {
                yield userModel_1.default.findByIdAndUpdate(receiverId, {
                    $push: {
                        connections: {
                            userId: senderId,
                            status: "Accept",
                        },
                    },
                }, { new: true } // This option returns the updated document
                );
            }
            console.log("finding finding finding finding ");
            const findNotification = yield notificationModel_1.default.findOne({
                $or: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId },
                ],
            });
            if (findNotification) {
                (findNotification.senderId = senderObjectId),
                    (findNotification.receiverId = receiverObjectId);
                findNotification.type = "connect";
                findNotification.message = `${userName} wants to connect with you.`;
                const saved = yield findNotification.save();
                const save = yield saved.populate("senderId");
                return save;
            }
            else {
                const notification = yield new notificationModel_1.default({
                    senderId,
                    receiverId,
                    type: "connect",
                    message: `${userName} wants to connect with you.`,
                });
                const savedNotification = yield notification.save();
                const save = yield savedNotification.populate("senderId");
                console.log("saved");
                console.log(save);
                console.log(savedNotification);
                return save;
            }
        });
    }
    RcheckConnectionStatus(userId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProfile = yield userModel_1.default.findById(userId);
                if (!userProfile) {
                    // No profile found for the user
                    return null;
                }
                const connection = userProfile.connections.find((conn) => conn.userId && conn.userId.equals(receiverId));
                if (connection) {
                    return connection;
                }
                return "false";
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetProfileDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userModel_1.default.findById(userId);
                if (response) {
                    // @ts-ignore
                    return response.toObject();
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RUnConnectUser(delteSenderId, deleteReceiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.default.findOneAndUpdate({ _id: delteSenderId, "connections.userId": deleteReceiverId }, { $set: { "connections.$.status": "false" } });
                yield userModel_1.default.findOneAndUpdate({ _id: deleteReceiverId, "connections.userId": delteSenderId }, { $set: { "connections.$.status": "false" } });
                const findNotification = yield notificationModel_1.default.findOne({
                    $or: [
                        { senderId: delteSenderId, receiverId: deleteReceiverId },
                        { senderId: deleteReceiverId, receiverId: delteSenderId },
                    ],
                });
                if (!findNotification) {
                    return null;
                }
                if (findNotification) {
                    findNotification.message = "both are unConnected";
                }
                findNotification.save();
                return findNotification;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userModel_1.default.findOne({ _id: id }, "imageUrl nickName");
                if (!response) {
                    return null;
                }
                // @ts-ignore
                return response === null || response === void 0 ? void 0 : response.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // firebase integration for push Notification
    RStorePushNotification(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let cornJon = null;
            yield subscriptionModel_1.default.create(value);
            const sendNotification = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const subscriptions = yield subscriptionModel_1.default.find({});
                    subscriptions.map((subscription) => {
                        const endpointParts = subscription.endpoint.split("/");
                        return endpointParts[endpointParts.length - 1];
                    });
                    if (subscriptions.length == 0) {
                        cornJon.stop();
                    }
                    const notificationPromises = subscriptions.map((subscription) => {
                        const payload = JSON.stringify({
                            title: "Neay by chat",
                            body: "lot of users are there nearby go on ",
                        });
                        return web_push_1.default
                            .sendNotification(subscription, payload)
                            .then(() => console.log("Notification sent successfully"))
                            .catch((error) => console.error("Error sending notification:", error));
                    });
                    yield Promise.all(notificationPromises);
                }
                catch (error) {
                    throw error;
                }
            });
            // Schedule the task to run every 10 seconds
            cornJon = node_cron_1.default.schedule("*/10 * * * * *", () => __awaiter(this, void 0, void 0, function* () {
                yield sendNotification();
            }), {
                timezone: "UTC", // Optional: Specify the timezone if different from UTC
            });
            return true;
        });
    }
    RUnsubscribeNotification(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedSubscription = yield subscriptionModel_1.default.findOneAndDelete({
                    endpoint: value.endpoint,
                });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RGetRandomProfileDetails(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileDetails = yield userModel_1.default.findById(value);
                if (!profileDetails) {
                    return null;
                }
                // @ts-ignore
                return profileDetails.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RfindBlockUnblockDetails(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = userId.toString();
            const response = yield chatRoomMode_1.default.findOne({
                _id: { $in: chatRoomId },
                "members.userId": userId,
            });
            if (!response) {
                return false;
            }
            const status = response.members.find((a, b) => {
                const str = a.userId.toString();
                if (str == Id) {
                    return a;
                }
            });
            if (status == undefined) {
                return false;
            }
            return status.status;
        });
    }
    RpaymentSummary(subId, userId, paymentId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield userModel_1.default.findById(userId);
                const searchSubscriptionDetails = yield searchSubscription_1.default.findById(subId);
                // const currentCountofSearch=userDetails?.maxSearch
                const inSubscriptionCount = searchSubscriptionDetails === null || searchSubscriptionDetails === void 0 ? void 0 : searchSubscriptionDetails.maxCount;
                // const totalCount=currentCountofSearch+inSubscriptionCount
                const updateUserDetails = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $inc: { maxSearch: inSubscriptionCount } });
                const searchSubscriptionPaymentSummary = {
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
                    razorpayOrderId: orderId,
                };
                const response = yield paymentSummary_1.default.create(searchSubscriptionPaymentSummary);
                response.save();
                // @ts-ignore
                return response.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RincrementSearchCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUser = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $inc: { currSearch: 1 } });
                if (!updateUser) {
                    return null;
                }
                // @ts-ignore
                return updateUser.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RdisplayProfileDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userModel_1.default.findById(userId);
                if (!response) {
                    return null;
                }
                // @ts-ignore
                return response === null || response === void 0 ? void 0 : response.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RuploadUserProfileImage(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resposne = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $push: { images: imageUrl } }, { new: true });
                if (!resposne) {
                    return null;
                }
                // @ts-ignore
                return resposne === null || resposne === void 0 ? void 0 : resposne.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RdeleteProfileImage(userId, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findById(userId);
                if (user) {
                    user.images.splice(index, 1);
                    yield user.save();
                    return true;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProfileRepository = ProfileRepository;
