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
exports.userListRepository = void 0;
var inversify_1 = require("inversify");
var userModel_1 = __importDefault(require("../../frameWorks/mongodb/models/userModel"));
var reportModel_1 = __importDefault(require("../../frameWorks/mongodb/models/reportModel"));
var socket_io_1 = require("socket.io");
var searchSubscription_1 = __importDefault(require("../../frameWorks/mongodb/models/searchSubscription"));
var paymentSummary_1 = __importDefault(require("../../frameWorks/mongodb/models/paymentSummary"));
var userLocation_1 = __importDefault(require("../../frameWorks/mongodb/models/userLocation"));
var userListRepository = /** @class */ (function () {
    function userListRepository() {
    }
    userListRepository.prototype.Rgetusers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.find({ role: { $ne: 'admin' } })];
                    case 1:
                        allUsers = _a.sent();
                        console.log("al users");
                        console.log(allUsers);
                        return [2 /*return*/, allUsers];
                }
            });
        });
    };
    userListRepository.prototype.RblockUser = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id);
                        console.log(status);
                        console.log("lasttttttttttt");
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(id, { $set: { status: false } }, { new: true })];
                    case 1:
                        s = _a.sent();
                        socket_io_1.Socket;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(id, { $set: { status: true } }, { new: true })];
                    case 3:
                        s = _a.sent();
                        _a.label = 4;
                    case 4:
                        console.log(s);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    userListRepository.prototype.RUsersearch = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var status, regex, res, res_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = value;
                        regex = new RegExp(value, 'i');
                        console.log("Iiiiii");
                        console.log(value);
                        console.log("first regex" + regex);
                        return [4 /*yield*/, userModel_1.default.aggregate([
                                {
                                    $match: {
                                        role: { $ne: 'admin' },
                                        $or: [
                                            { userName: { $regex: value, $options: 'i' } },
                                            // { nickName: { $regex: value, $options: 'i' } },
                                            // { email: { $regex: value, $options: 'i' } }
                                        ]
                                    }
                                },
                                {
                                    $addFields: {
                                        userNameIndex: { $indexOfCP: [{ $toLower: "$userName" }, value.toLowerCase()] },
                                        // nickNameIndex: { $indexOfCP: [{ $toLower: "$nickName" },value.toLowerCase()] },
                                        // emailIndex: { $indexOfCP: [{ $toLower: "$email" }, value.toLowerCase()] }
                                    }
                                },
                                {
                                    $sort: {
                                        userNameIndex: 1,
                                        // nickNameIndex: 1,
                                        // emailIndex: 1
                                    }
                                }
                            ])];
                    case 1:
                        res = _a.sent();
                        if (!(res.length == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userModel_1.default.find({
                                role: { $ne: 'admin' },
                                $or: [
                                    { nickName: { $regex: "^".concat(value), $options: 'i' } },
                                    { email: { $regex: "^".concat(value), $options: 'i' } }
                                ]
                            })];
                    case 2:
                        res_1 = _a.sent();
                        return [2 /*return*/, res_1];
                    case 3: return [2 /*return*/, res];
                }
            });
        });
    };
    userListRepository.prototype.Rreport = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, reportModel_1.default.create({
                            reporter: input.reporter,
                            reportedUser: input.reportedUser,
                            reason: input.reason
                        })];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        if (response) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    userListRepository.prototype.RgetAllReports = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, sorted, _loop_1, _i, response_1, rep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, reportModel_1.default.find().populate('reporter', 'nickName  email').populate('reportedUser', 'nickName  email')];
                    case 1:
                        response = _a.sent();
                        sorted = [];
                        _loop_1 = function (rep) {
                            console.log("111111111111111111111");
                            console.log(sorted);
                            var checkStatus = sorted.find(function (a) {
                                // @ts-ignore
                                return a.reporter.email == rep.reporter.email && a.reportedUser.email == rep.reportedUser.email;
                            });
                            if (checkStatus) {
                                checkStatus.reasons.push(rep.reason);
                            }
                            console.log(checkStatus);
                            if (!checkStatus) {
                                console.log("pusheddddddddddddddddd");
                                sorted.push({
                                    _id: rep._id,
                                    reporter: rep.reporter,
                                    reportedUser: rep.reportedUser,
                                    reasons: [rep.reason],
                                    marked: rep === null || rep === void 0 ? void 0 : rep.isRead,
                                    createdAt: rep.createdAt,
                                    __v: rep.__v
                                });
                            }
                        };
                        for (_i = 0, response_1 = response; _i < response_1.length; _i++) {
                            rep = response_1[_i];
                            _loop_1(rep);
                        }
                        return [2 /*return*/, sorted];
                }
            });
        });
    };
    userListRepository.prototype.RadminLogin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var ifAdmin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(email);
                        return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        ifAdmin = _a.sent();
                        console.log(ifAdmin);
                        if (ifAdmin) {
                            //       console.log("iide")
                            //       console.log(ifAdmin.password)
                            //       console.log(password)
                            // let hash=ifAdmin.password
                            //       let match=await bcrypt.compare(password,hash)
                            //       console.log(match)
                            //       console.log("ivide")
                            //       if(match){
                            //     console.log("trei")
                            //         return ifAdmin
                            //       }
                            return [2 /*return*/, ifAdmin];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    userListRepository.prototype.ROnChangeReportStatus = function (reportId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("0000000000000000000000000000000000000000000000");
                        console.log(reportId);
                        console.log(status);
                        return [4 /*yield*/, reportModel_1.default.findByIdAndUpdate(reportId, { $set: { isRead: status } })];
                    case 1:
                        response = _a.sent();
                        console.log("report update");
                        console.log(response);
                        return [2 /*return*/];
                }
            });
        });
    };
    userListRepository.prototype.ROnReport = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var regex, a, response, sorted, _loop_2, _i, response_2, rep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(value);
                        regex = new RegExp(value, 'i');
                        console.log(regex);
                        return [4 /*yield*/, reportModel_1.default.find({})
                                .populate('reporter', 'nickName  email')
                                .populate('reportedUser', 'nickName  email')];
                    case 1:
                        a = _a.sent();
                        console.log("alllllllllllllllllllllllllllll");
                        console.log(a);
                        response = a.filter(function (a, b) {
                            return (regex.test(a.reporter.email) ||
                                regex.test(a.reporter.nickName) ||
                                regex.test(a.reportedUser.email) ||
                                regex.test(a.reportedUser.nickName));
                        });
                        console.log("lastere tryyyyyyyyyyyyyyyyyyyyyyyy");
                        sorted = [];
                        _loop_2 = function (rep) {
                            console.log("111111111111111111111");
                            console.log(sorted);
                            var checkStatus = sorted.find(function (a) {
                                // @ts-ignore
                                return a.reporter.email == rep.reporter.email && a.reportedUser.email == rep.reportedUser.email;
                            });
                            if (checkStatus) {
                                checkStatus.reasons.push(rep.reason);
                            }
                            console.log(checkStatus);
                            if (!checkStatus) {
                                console.log("pusheddddddddddddddddd");
                                sorted.push({
                                    _id: rep._id,
                                    reporter: rep.reporter,
                                    reportedUser: rep.reportedUser,
                                    reasons: [rep.reason],
                                    marked: rep === null || rep === void 0 ? void 0 : rep.isRead,
                                    createdAt: rep.createdAt,
                                    __v: rep.__v
                                });
                            }
                        };
                        for (_i = 0, response_2 = response; _i < response_2.length; _i++) {
                            rep = response_2[_i];
                            _loop_2(rep);
                        }
                        console.log("allllllllllllllllllllllllllllllllllll");
                        console.log(sorted);
                        return [2 /*return*/, sorted];
                }
            });
        });
    };
    userListRepository.prototype.RonSaveSearchSubscription = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var sumOfSub, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("saveeeeeeeeeee seeeeeeeeeearchhhhhhhhhhhh subscription subcription subscripiton ");
                        console.log(value);
                        return [4 /*yield*/, searchSubscription_1.default.find({})];
                    case 1:
                        sumOfSub = _a.sent();
                        console.log(sumOfSub);
                        console.log("finishhhhhhhh");
                        if (sumOfSub.length >= 3) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, searchSubscription_1.default.create(value)];
                    case 2:
                        response = _a.sent();
                        console.log(value);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository.prototype.RgetAllSearchSubscription = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, searchSubscription_1.default.find()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository.prototype.RgetAllPaymentSubscription = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, paymentSummary_1.default.find({})];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository.prototype.RgetDashboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, twentyFourHoursAgo, totalAmountDaily, countAlluser, countPayment, countReport, oneWeekAgo, usersJoinedDaily, results, _loop_3, i, usersSubscribedDaily, resultsOfSubscribed, _loop_4, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, paymentSummary_1.default.aggregate([
                                {
                                    $match: {
                                        createdAt: {
                                            $gte: twentyFourHoursAgo,
                                            $lte: now
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        _id: null,
                                        totalSum: { $sum: "$price" }
                                    }
                                }
                            ])];
                    case 1:
                        totalAmountDaily = _a.sent();
                        // ])
                        console.log("get atotal amount", totalAmountDaily);
                        return [4 /*yield*/, userModel_1.default.countDocuments({})];
                    case 2:
                        countAlluser = _a.sent();
                        return [4 /*yield*/, paymentSummary_1.default.countDocuments({})];
                    case 3:
                        countPayment = _a.sent();
                        return [4 /*yield*/, reportModel_1.default.countDocuments({})];
                    case 4:
                        countReport = _a.sent();
                        oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, userLocation_1.default.aggregate([
                                {
                                    $match: {
                                        createdAt: {
                                            $gte: oneWeekAgo, // Greater than or equal to one week ago
                                            $lte: now // Less than or equal to now
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        day: {
                                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$day",
                                        count: { $sum: 1 }
                                    }
                                },
                                {
                                    $sort: { _id: 1 }
                                },
                            ])];
                    case 5:
                        usersJoinedDaily = _a.sent();
                        console.log("aggggggggggggggggggggg resuleeeeeeee");
                        console.log(usersJoinedDaily);
                        results = [];
                        _loop_3 = function (i) {
                            var date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                            var dateString = date.toISOString().split('T')[0];
                            // Find the count for this date or use 0 if not found
                            var dayData = usersJoinedDaily.find(function (item) { return item._id === dateString; });
                            results.push({ date: dateString, count: dayData ? dayData.count : 0 });
                        };
                        for (i = 0; i < 7; i++) {
                            _loop_3(i);
                        }
                        results.reverse();
                        console.log("User Joined Count by Day for the Last Week:", results);
                        return [4 /*yield*/, paymentSummary_1.default.aggregate([
                                {
                                    $match: {
                                        createdAt: {
                                            $gte: oneWeekAgo, // Greater than or equal to one week ago
                                            $lte: now // Less than or equal to now
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        day: {
                                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$day",
                                        count: { $sum: 1 }
                                    }
                                },
                                {
                                    $sort: { _id: 1 }
                                },
                            ])];
                    case 6:
                        usersSubscribedDaily = _a.sent();
                        console.log("subsssssssssssssssssssssss");
                        console.log(usersSubscribedDaily);
                        resultsOfSubscribed = [];
                        _loop_4 = function (i) {
                            var date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                            var dateString = date.toISOString().split('T')[0];
                            // Find the count for this date or use 0 if not found
                            var dayData = usersSubscribedDaily.find(function (item) { return item._id === dateString; });
                            resultsOfSubscribed.push({ date: dateString, count: dayData ? dayData.count : 0 });
                        };
                        for (i = 0; i < 7; i++) {
                            _loop_4(i);
                        }
                        resultsOfSubscribed.reverse();
                        console.log("User Joined Count by Day for the Last Week:", resultsOfSubscribed);
                        return [2 /*return*/, { totalAmountDaily: totalAmountDaily, countAlluser: countAlluser, countPayment: countPayment, countReport: countReport, results: results, resultsOfSubscribed: resultsOfSubscribed }];
                }
            });
        });
    };
    userListRepository.prototype.RgetOneSubscriptionDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, paymentSummary_1.default.findById(id)];
                    case 1:
                        response = _a.sent();
                        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository.prototype.RgetCurrentSearchSubscription = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("000000000000000000000000000");
                        return [4 /*yield*/, searchSubscription_1.default.findById(id)];
                    case 1:
                        response = _a.sent();
                        console.log("seachhhhhhhhhhhhhhhhh subbbbbbbbbbbbbbbbbscripttttttttttttttttttttttt");
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository.prototype.RupdateSearchSubscription = function (value, id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("kitiiiiiiiiiiiii");
                        return [4 /*yield*/, searchSubscription_1.default.findOneAndUpdate({ _id: id }, { $set: {
                                    name: value.name,
                                    maxCount: value.maxCount,
                                    price: value.price,
                                    timePeriod: value.timePeriod,
                                    imageUrl: value.imageUrl
                                }
                            }, {
                                new: true
                            })];
                    case 1:
                        response = _a.sent();
                        console.log("updaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository.prototype.RdeleteSearchSubscription = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("8888888888888888888888888888888");
                        return [4 /*yield*/, searchSubscription_1.default.findByIdAndDelete(id)];
                    case 1:
                        response = _a.sent();
                        console.log("eueueueueu");
                        console.log(response);
                        console.log("llallal");
                        return [2 /*return*/, response];
                }
            });
        });
    };
    userListRepository = __decorate([
        (0, inversify_1.injectable)()
    ], userListRepository);
    return userListRepository;
}());
exports.userListRepository = userListRepository;
