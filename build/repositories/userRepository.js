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
exports.userStatus = exports.UserRepository = void 0;
var inversify_1 = require("inversify");
var userModel_1 = __importDefault(require("../frameWorks/mongodb/models/userModel"));
var userLocation_1 = __importDefault(require("../frameWorks/mongodb/models/userLocation"));
var otpModel_1 = __importDefault(require("../frameWorks/mongodb/models/otpModel"));
var mongoose_1 = __importDefault(require("mongoose"));
var paymentSummary_1 = __importDefault(require("../frameWorks/mongodb/models/paymentSummary"));
var express_1 = require("express");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.create = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var createdUser;
            var userName = _b.userName, dob = _b.dob, gender = _b.gender, email = _b.email, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.create({
                            userName: userName,
                            dob: dob,
                            gender: gender,
                            email: email,
                            password: password,
                        })];
                    case 1:
                        createdUser = _c.sent();
                        console.log("saveddddddddddddddddddddddddddddddddd");
                        // createdUser.save()
                        // const userObject: User = createdUser.toObject();
                        return [2 /*return*/, createdUser];
                }
            });
        });
    };
    UserRepository.prototype.findUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userLocation, r, maxDistance, longitude, latitude, whoall, nearbyUsers, id2, nearof, _i, nearbyUsers_1, i;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(data);
                        return [4 /*yield*/, userLocation_1.default.findOne({ userId: data.userId })];
                    case 1:
                        userLocation = _c.sent();
                        r = data.radius || 0;
                        maxDistance = (r || 0) * 1000;
                        longitude = ((_a = userLocation === null || userLocation === void 0 ? void 0 : userLocation.location) === null || _a === void 0 ? void 0 : _a.coordinates[0]) || 0;
                        latitude = ((_b = userLocation === null || userLocation === void 0 ? void 0 : userLocation.location) === null || _b === void 0 ? void 0 : _b.coordinates[1]) || 0;
                        return [4 /*yield*/, userLocation_1.default.find()];
                    case 2:
                        whoall = _c.sent();
                        console.log(whoall);
                        return [4 /*yield*/, userLocation_1.default.aggregate([
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
                                        as: "userDetails" // The field to add the populated user details
                                    }
                                },
                                {
                                    $unwind: "$userDetails" // Unwind the array to get individual documents
                                },
                            ])];
                    case 3:
                        nearbyUsers = _c.sent();
                        console.log("ivideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(nearbyUsers);
                        id2 = new mongoose_1.default.Types.ObjectId(data.userId);
                        console.log(id2);
                        nearof = [];
                        for (_i = 0, nearbyUsers_1 = nearbyUsers; _i < nearbyUsers_1.length; _i++) {
                            i = nearbyUsers_1[_i];
                            if (!i.userId.equals(id2) && i.userDetails.nickName) {
                                nearof.push(i);
                            }
                        }
                        console.log("near of  near of near of ");
                        console.log(nearof);
                        return [2 /*return*/, nearof];
                }
            });
        });
    };
    UserRepository.prototype.RfindEmail = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isThere;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("is theeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(data);
                        return [4 /*yield*/, userModel_1.default.findOne({ email: data })];
                    case 1:
                        isThere = _a.sent();
                        console.log(isThere);
                        if (isThere) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.RuserLogin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var ifUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(email);
                        return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        ifUser = _a.sent();
                        console.log("ivdie user sdie");
                        console.log(ifUser);
                        if (ifUser) {
                            // let match=await bcrypt.compare(password,ifUser.password)
                            // if(match){
                            //   return ifUser
                            // }
                            return [2 /*return*/, ifUser];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    // async Rgetusers(): Promise<any> {
    //   let allUsers=await UserModel.find()
    //   return allUsers
    // }
    UserRepository.prototype.RgoogleLogin = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    UserRepository.prototype.RuserStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        response = _a.sent();
                        if (response === null || response === void 0 ? void 0 : response.status)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.RsaveLocation = function (longitude, latitude, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userLocation_1.default.findOneAndUpdate({ userId: userId }, {
                            // $set:{
                            //     'location.longitude':data.longitude,
                            //     'location.latitude':data.latitude,
                            //     radius:radius
                            // }
                            $set: {
                                'location.type': 'Point', // Set GeoJSON type
                                'location.coordinates': [longitude, latitude],
                            }
                        }, { upsert: true, new: true })];
                    case 1:
                        updated = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.RsendOtp = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(email);
                        console.log(otp);
                        return [4 /*yield*/, otpModel_1.default.create({
                                email: email,
                                otp: otp
                            })];
                    case 1:
                        a = _a.sent();
                        a.save();
                        console.log("000000000000000000000000000000000000");
                        console.log(a);
                        return [2 /*return*/, a];
                }
            });
        });
    };
    UserRepository.prototype.RverifyOtp = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(email, otp);
                        return [4 /*yield*/, otpModel_1.default.findOne({ email: email, otp: otp })];
                    case 1:
                        response = _a.sent();
                        console.log("foujdinggggggggggggggggggggggg");
                        console.log(response);
                        if (response) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    UserRepository.prototype.RoleBasedAuthentication = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ans;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
                        console.log(id);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: id })];
                    case 1:
                        ans = _a.sent();
                        return [2 /*return*/, ans];
                }
            });
        });
    };
    UserRepository.prototype.ReditUserDetails = function (userId, userName, dob, gender) {
        return __awaiter(this, void 0, void 0, function () {
            var date, resposne;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeee");
                        date = new Date(dob);
                        console.log(date);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: userId }, {
                                $set: {
                                    userName: userName,
                                    dob: date,
                                    gender: gender
                                }
                            }, {
                                new: true
                            })];
                    case 1:
                        resposne = _a.sent();
                        console.log("resssssssssssssssssssssssssssssss");
                        console.log(resposne);
                        return [2 /*return*/, resposne];
                }
            });
        });
    };
    UserRepository.prototype.RgetOrderSummary = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get user detailsssssssssssssssssssssssss");
                        return [4 /*yield*/, paymentSummary_1.default.find({ userId: userId })];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserRepository.prototype.RchangePassword = function (userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            var respons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hasheddddddddddd paswwordddddddddddddddddddddddddd");
                        console.log(password);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: {
                                    password: password
                                }
                            })];
                    case 1:
                        respons = _a.sent();
                        return [2 /*return*/, express_1.response];
                }
            });
        });
    };
    UserRepository = __decorate([
        (0, inversify_1.injectable)()
    ], UserRepository);
    return UserRepository;
}());
exports.UserRepository = UserRepository;
var userStatus = /** @class */ (function () {
    function userStatus() {
    }
    userStatus.prototype.userStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        response = _a.sent();
                        console.log("-000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
                        console.log(response === null || response === void 0 ? void 0 : response.status);
                        if (response === null || response === void 0 ? void 0 : response.status)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    return userStatus;
}());
exports.userStatus = userStatus;
