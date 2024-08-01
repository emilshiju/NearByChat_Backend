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
exports.profileController = void 0;
var inversify_1 = require("inversify");
var appConst_1 = require("../utils/appConst");
var dotenv_1 = __importDefault(require("dotenv"));
var razorpay_1 = __importDefault(require("razorpay"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
var profileController = /** @class */ (function () {
    function profileController(interactor) {
        this.interactor = interactor;
    }
    profileController.prototype.onSubmitProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var input, response_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        input = req.body;
                        console.log(input);
                        return [4 /*yield*/, this.interactor.IcreateProfile(input)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1) {
                            return [2 /*return*/, res.json({ status: true, data: response_1 }).status(200)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.getProfileUrl = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var input, response_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("skdjfhshfius");
                        input = req.params.userId;
                        console.log("ininput");
                        console.log(input);
                        return [4 /*yield*/, this.interactor.IgetProfileUrl(input)];
                    case 1:
                        response_2 = _a.sent();
                        console.log("user profile");
                        console.log(response_2);
                        console.log("output");
                        if (!response_2) {
                            return [2 /*return*/, res.json({ status: false })];
                        }
                        return [2 /*return*/, res.json({ status: true, response: response_2 })];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.updateImageUrl = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, imageUrl, response_3, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, userId = _a.userId, imageUrl = _a.imageUrl;
                        console.log(req.body);
                        return [4 /*yield*/, this.interactor.IupdateImageUrl(userId, imageUrl)];
                    case 1:
                        response_3 = _b.sent();
                        console.log("its    reeeeeeeeeeeeeeeeeeeesponseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(response_3);
                        return [2 /*return*/, res.json({ status: true, response: response_3 })];
                    case 2:
                        error_3 = _b.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.getAllNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, senderName, response_4, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.params.userId;
                        console.log("vanuuuuu");
                        senderName = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.username;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.interactor.IgetNotification(userId)];
                    case 2:
                        response_4 = _b.sent();
                        console.log(response_4);
                        if (response_4) {
                            return [2 /*return*/, res.json({ status: true, allNotification: response_4 })];
                        }
                        return [2 /*return*/, res.json({ status: false })];
                    case 3:
                        error_4 = _b.sent();
                        console.log(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.checkConnectionStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, receiverId, response_5, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.query.userId;
                        receiverId = req.query.id;
                        console.log("sjfksdjfsdhfishfsdhfjhsdjfhsdjfhdsjfhdskjhfdskjfhkjds");
                        console.log(userId, receiverId);
                        return [4 /*yield*/, this.interactor.IcheckConnectionStatus(userId, receiverId)];
                    case 1:
                        response_5 = _a.sent();
                        console.log(response_5);
                        return [2 /*return*/, res.json({ status: response_5 })];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.onUnconnectUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, delteSenderId, deleteReceiverId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, delteSenderId = _a.delteSenderId, deleteReceiverId = _a.deleteReceiverId;
                        return [4 /*yield*/, this.interactor.IUnconnectUser(delteSenderId, deleteReceiverId)];
                    case 1:
                        response = _b.sent();
                        console.log("un CNNECTEEDD USER USER USER USER USER USER ");
                        console.log(response);
                        return [2 /*return*/, res.json({ status: response })];
                }
            });
        });
    };
    profileController.prototype.storePushNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription, value, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
                        subscription = req.body.subscription;
                        console.log("oni on i oni");
                        value = subscription;
                        console.log(value);
                        return [4 /*yield*/, this.interactor.IStorePushNotification(value)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.UnsubscribeNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("vannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
                        subscription = req.body.subscription;
                        console.log(subscription);
                        return [4 /*yield*/, this.interactor.IUnsubscribeNotification(subscription)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.onPaymentOrder = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, amount, razorpayKeyId, razorpaySecret, instance, cur, options, order, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, amount = _a.amount;
                        console.log("amounttttttttttt" + amount);
                        razorpayKeyId = process.env.RAZORPAY_KEY_ID;
                        razorpaySecret = process.env.RAZORPAY_SECRET;
                        instance = new razorpay_1.default({ key_id: 'rzp_test_FtkJsWcVUfJKnH', key_secret: 'yjWPt0JccwIc7wwmK3Regtgo' });
                        cur = new Date();
                        options = {
                            amount: amount * 100, // amount in smallest currency unit
                            currency: "INR",
                            receipt: id,
                        };
                        return [4 /*yield*/, instance.orders.create(options)];
                    case 1:
                        order = _b.sent();
                        return [2 /*return*/, res.json(order)];
                    case 2:
                        error_6 = _b.sent();
                        console.log(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.onPaymentSuccesfull = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, subId, userId, paymentId, orderId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, subId = _a.subId, userId = _a.userId, paymentId = _a.paymentId, orderId = _a.orderId;
                        return [4 /*yield*/, this.interactor.IpaymentSummary(subId, userId, paymentId, orderId)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ status: true })];
                }
            });
        });
    };
    profileController.prototype.onChangeIncrementSearchCount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.id;
                        return [4 /*yield*/, this.interactor.IincrementSearchCount(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    profileController.prototype.onDisplayUserDetails = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.id;
                        return [4 /*yield*/, this.interactor.IdispalyProfileDetails(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    profileController.prototype.onHashPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentPassword, hashedPassword, isCorrect;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, currentPassword = _a.currentPassword, hashedPassword = _a.hashedPassword;
                        console.log(currentPassword);
                        console.log(hashedPassword);
                        return [4 /*yield*/, bcrypt_1.default.compare(currentPassword, hashedPassword)];
                    case 1:
                        isCorrect = _b.sent();
                        console.log("affffffffffffffffffffffffffff");
                        console.log(isCorrect);
                        return [2 /*return*/, res.json({ status: isCorrect })];
                }
            });
        });
    };
    profileController.prototype.uploadUserProfileImage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, imageUrl, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, imageUrl = _a.imageUrl;
                        console.log("userdddddddddddddddddddddddddddddddddddddddddd");
                        console.log(userId);
                        return [4 /*yield*/, this.interactor.IuploadUserProfileImage(userId, imageUrl)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ status: true })];
                }
            });
        });
    };
    profileController.prototype.onDeleteProfileImageUrl = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, index, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, index = _a.index;
                        return [4 /*yield*/, this.interactor.IdeleteProfileImage(userId, index)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ status: response })];
                }
            });
        });
    };
    profileController = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(appConst_1.INTERFACE_TYPE.ProfileInteractor)),
        __metadata("design:paramtypes", [Object])
    ], profileController);
    return profileController;
}());
exports.profileController = profileController;
