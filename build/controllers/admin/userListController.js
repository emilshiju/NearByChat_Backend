"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserListController = void 0;
var appConst_1 = require("../../utils/appConst");
var inversify_1 = require("inversify");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var UserListController = /** @class */ (function () {
    function UserListController(interactor) {
        this.interactor = interactor;
    }
    UserListController.prototype.getAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("yes");
                        return [4 /*yield*/, this.interactor.Igetusers()];
                    case 1:
                        users = _a.sent();
                        console.log("sodfjso");
                        console.log(users);
                        return [2 /*return*/, res.json({ data: users })];
                }
            });
        });
    };
    UserListController.prototype.blockUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, status, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, status = _a.status;
                        console.log(id);
                        console.log(status);
                        return [4 /*yield*/, this.interactor.IblockUser(id, status)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ status: response })];
                }
            });
        });
    };
    UserListController.prototype.searchUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value, users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        value = req.query.value;
                        console.log("error");
                        return [4 /*yield*/, this.interactor.IUsersearch(value)];
                    case 1:
                        users = _a.sent();
                        console.log(users);
                        console.log(users);
                        return [2 /*return*/, res.json({ data: users })];
                    case 2:
                        error_1 = _a.sent();
                        console.log("third");
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserListController.prototype.onSubmitReport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, reporter, reportedUser, reason, input, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, reporter = _a.reporter, reportedUser = _a.reportedUser, reason = _a.reason;
                        input = {
                            reporter: reporter,
                            reportedUser: reportedUser,
                            reason: reason
                        };
                        console.log(input);
                        return [4 /*yield*/, this.interactor.Ireport(input)];
                    case 1:
                        response = _b.sent();
                        console.log(response);
                        return [2 /*return*/, res.json({ status: response })];
                }
            });
        });
    };
    UserListController.prototype.ongetAllReports = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.interactor.IgetAllReports()];
                    case 1:
                        response = _a.sent();
                        console.log("all     reprttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
                        console.log(response);
                        return [2 /*return*/, res.json({ status: true, data: response })];
                }
            });
        });
    };
    UserListController.prototype.adminLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, _b, ifAdmin, AccessToken, userData, role;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        console.log('vanu');
                        return [4 /*yield*/, this.interactor.IadminLogin(email, password)];
                    case 1:
                        _b = _c.sent(), ifAdmin = _b.ifAdmin, AccessToken = _b.AccessToken;
                        if (ifAdmin) {
                            userData = {
                                _id: ifAdmin._id,
                                userName: ifAdmin.userName,
                                role: ifAdmin.role,
                                email: ifAdmin.email,
                                status: ifAdmin.status
                            };
                            role = ['admin'];
                            if (!role.includes(userData.role)) {
                                return [2 /*return*/, res.status(402).json({ message: "not acces to this route" })];
                            }
                            console.log('acess tokennnnnnnnnnnnnnnnadsfsdfsdfsd');
                            console.log(AccessToken);
                            return [2 /*return*/, res
                                    .json({
                                    message: "succesfully Logined",
                                    data: userData,
                                    AccessToken: AccessToken,
                                    status: true
                                })
                                    .status(200)];
                        }
                        else {
                            return [2 /*return*/, res.json({ message: "credential not correct", status: false })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserListController.prototype.onChangeReportStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, reportId, status_1, response, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, reportId = _a.reportId, status_1 = _a.status;
                        console.log(req.body);
                        console.log(reportId);
                        console.log(status_1);
                        console.log("potiii");
                        return [4 /*yield*/, this.interactor.IOnChangeReportStatus(reportId, status_1)];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log("one");
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserListController.prototype.onSearchReports = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = req.query.value;
                        return [4 /*yield*/, this.interactor.IOnReport(value)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    UserListController.prototype.onSearchSubscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        value = req.body;
                        console.log("searchhhhhhhhhhhhhhhhhhhhhhhh");
                        console.log(value);
                        return [4 /*yield*/, this.interactor.IonSaveSearchSubscription(value)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            return [2 /*return*/, res.json({ status: true })];
                        }
                        else {
                            return [2 /*return*/, res.json({ status: false })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserListController.prototype.ongetSearchAllSubscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("vannnnnnnnnnnnnnnnnnnnnnn 88888888888888888888888888888888888888");
                        return [4 /*yield*/, this.interactor.IgetAllSearchSubscription()];
                    case 1:
                        response = _a.sent();
                        console.log("subscriptoin deralllllllllllllllllllllllllllllllllllllllllll");
                        console.log(response);
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    UserListController.prototype.ongetAllPaymentSubscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("abbbbbbbbbbbbbbbbbbb");
                        return [4 /*yield*/, this.interactor.IgetAllPaymentSubscription()];
                    case 1:
                        response = _a.sent();
                        console.log("allllllllllllllllllllllllllllllllllllllll");
                        console.log(response);
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    UserListController.prototype.ongetDashboad = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var response, dates, usersWeeklyCount, usersWeeklyOrderes;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.interactor.IgetDashboard()];
                    case 1:
                        response = _d.sent();
                        console.log("ppppppppppppppppppppppppppppppppp");
                        console.log(response);
                        dates = (_a = response.results) === null || _a === void 0 ? void 0 : _a.map(function (a) { return a.date; });
                        usersWeeklyCount = (_b = response.results) === null || _b === void 0 ? void 0 : _b.map(function (a) { return a.count; });
                        usersWeeklyOrderes = (_c = response.resultsOfSubscribed) === null || _c === void 0 ? void 0 : _c.map(function (a) { return a.count; });
                        return [2 /*return*/, res.json({ data: response, week: dates, weeklyUsers: usersWeeklyCount, weeklyOrderes: usersWeeklyOrderes })];
                }
            });
        });
    };
    UserListController.prototype.getOneSubscriptionDetails = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log("yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                        console.log(id);
                        return [4 /*yield*/, this.interactor.IgetOneSubscriptionDetails(id)];
                    case 1:
                        response = _a.sent();
                        console.log("subsssssssssssssssssssssssssssssssssssssssssss");
                        console.log(response);
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    UserListController.prototype.getCurrentSearchSubscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, this.interactor.IgetCurrentSearchSubscription(id)];
                    case 1:
                        response = _a.sent();
                        console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
                        console.log(response);
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    UserListController.prototype.onupdateSearchSUbscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value, id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = req.body.data;
                        id = req.body.id;
                        console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppp    00000000000000000000000000000000000000000000000000000000000000000000000000000");
                        console.log(value);
                        return [4 /*yield*/, this.interactor.IupdateSearchSubscription(value, id)];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        return [2 /*return*/, res.json({ status: true })];
                }
            });
        });
    };
    UserListController.prototype.ondeleteSearchSubscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, respose;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log("vannnn");
                        console.log(id);
                        return [4 /*yield*/, this.interactor.IdeleteSearchSubscription(id)];
                    case 1:
                        respose = _a.sent();
                        console.log(respose);
                        return [2 /*return*/, res.json({ status: true })];
                }
            });
        });
    };
    UserListController = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(appConst_1.INTERFACE_TYPE.UserListInteractor)),
        __metadata("design:paramtypes", [Object])
    ], UserListController);
    return UserListController;
}());
exports.UserListController = UserListController;
