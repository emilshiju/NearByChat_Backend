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
exports.userStatus = exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../../frameWorks/mongodb/models/userModel"));
const userLocation_1 = __importDefault(require("../../frameWorks/mongodb/models/userLocation"));
const otpModel_1 = __importDefault(require("../../frameWorks/mongodb/models/otpModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSummary_1 = __importDefault(require("../../frameWorks/mongodb/models/paymentSummary"));
class UserRepository {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userName, dob, gender, email, password, }) {
            try {
                const createdUser = yield userModel_1.default.create({
                    userName,
                    dob,
                    gender,
                    email,
                    password,
                });
                // @ts-ignore
                return createdUser.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userLocation = yield userLocation_1.default.findOne({
                    userId: data.userId,
                });
                const r = data.radius || 0;
                const maxDistance = (r || 0) * 1000; // convert kilometers to meters
                const longitude = ((_a = userLocation === null || userLocation === void 0 ? void 0 : userLocation.location) === null || _a === void 0 ? void 0 : _a.coordinates[0]) || 0;
                const latitude = ((_b = userLocation === null || userLocation === void 0 ? void 0 : userLocation.location) === null || _b === void 0 ? void 0 : _b.coordinates[1]) || 0;
                const nearbyUsers = yield userLocation_1.default.aggregate([
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            distanceField: "dist.calculated",
                            maxDistance: maxDistance, // max distance in meters
                            includeLocs: "dist.location",
                            spherical: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "users", // The collection name of the UserModel
                            localField: "userId", // The field in locationModel that references the user
                            foreignField: "_id", // The field in UserModel that is referenced
                            as: "userDetails", // The field to add the populated user details
                        },
                    },
                    {
                        $unwind: "$userDetails", // Unwind the array to get individual documents
                    },
                ]);
                const id2 = new mongoose_1.default.Types.ObjectId(data.userId);
                const nearof = [];
                for (let i of nearbyUsers) {
                    if (!i.userId.equals(id2) && i.userDetails.nickName) {
                        nearof.push(i);
                    }
                }
                return nearof;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RfindEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isThere = yield userModel_1.default.findOne({ email: data });
                if (isThere) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RuserLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ifUser = yield userModel_1.default.findOne({ email: email });
                if (ifUser) {
                    // @ts-ignore
                    return ifUser.toObject();
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgoogleLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userModel_1.default.findOne({ email: email });
                if (!data) {
                    return null;
                }
                // @ts-ignore
                return data === null || data === void 0 ? void 0 : data.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RuserStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userModel_1.default.findById(userId);
                if (response === null || response === void 0 ? void 0 : response.status)
                    return true;
                else
                    return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RsaveLocation(longitude, latitude, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userLocation_1.default.findOneAndUpdate({ userId: userId }, {
                    $set: {
                        "location.type": "Point", // Set GeoJSON type
                        "location.coordinates": [longitude, latitude],
                    },
                }, { upsert: true, new: true });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RsendOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield otpModel_1.default.create({
                    email,
                    otp,
                });
                a.save();
                console.log("get user details", a);
                // @ts-ignore
                return a.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    RverifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield otpModel_1.default.findOne({ email: email, otp: otp });
                if (response) {
                    return true;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RoleBasedAuthentication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ans = yield userModel_1.default.findOne({ _id: id });
                if (!ans) {
                    return null;
                }
                // @ts-ignore
                return ans.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    ReditUserDetails(userId, userName, dob, gender) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date(dob);
                console.log(date);
                const resposne = yield userModel_1.default.findOneAndUpdate({ _id: userId }, {
                    $set: {
                        userName: userName,
                        dob: date,
                        gender: gender,
                    },
                }, {
                    new: true,
                });
                return resposne;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetOrderSummary(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield paymentSummary_1.default.find({
                    userId: userId,
                });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RchangePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userModel_1.default.findOneAndUpdate({ _id: userId }, {
                    $set: {
                        password: password,
                    },
                });
                if (response) {
                    return response;
                }
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
class userStatus {
    userStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield userModel_1.default.findById(userId);
            if (response === null || response === void 0 ? void 0 : response.status)
                return true;
            else
                return false;
        });
    }
}
exports.userStatus = userStatus;
