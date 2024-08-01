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
exports.UserInteractor = void 0;
var inversify_1 = require("inversify");
var appConst_1 = require("../utils/appConst");
var bcrypt_1 = __importDefault(require("bcrypt"));
var joi_1 = __importDefault(require("joi"));
var jwtService_1 = require("../services/jwtService");
var SALT_ROUNDS = 10;
var UserInteractor = /** @class */ (function () {
    function UserInteractor(repository) {
        this.repository = repository;
    }
    UserInteractor.prototype.createUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var userName, dob, gender, email, password, schema, data, Accesstoken, RefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userName = input.userName, dob = input.dob, gender = input.gender, email = input.email, password = input.password;
                        schema = joi_1.default.object({
                            userName: joi_1.default.string().min(3).max(39).required(),
                            dob: joi_1.default.date().iso().required(),
                            gender: joi_1.default.string().valid('male', 'female', 'other').required(),
                            email: joi_1.default.string().email().required(),
                            password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                        });
                        //   const checkEmail=await this.repository.findUser(userName)
                        //   console.log(checkEmail)
                        //   if(!checkEmail){
                        //     return false
                        //   }
                        console.log(SALT_ROUNDS);
                        console.log(password);
                        return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
                    case 1:
                        password = _a.sent();
                        return [4 /*yield*/, this.repository.create({ userName: userName, dob: dob, gender: gender, email: email, password: password })
                            // @ts-ignore
                        ];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, (0, jwtService_1.accessToken)(data.userName, data.email, data._id)
                            // @ts-ignore
                        ];
                    case 3:
                        Accesstoken = _a.sent();
                        return [4 /*yield*/, (0, jwtService_1.refreshToken)(data.userName, data._id)];
                    case 4:
                        RefreshToken = _a.sent();
                        console.log(Accesstoken);
                        console.log("here        token        toe toenm ekjsefhiusfjosd fjdsiojp           have            aces ");
                        return [2 /*return*/, { data: data, Accesstoken: Accesstoken, RefreshToken: RefreshToken }];
                }
            });
        });
    };
    UserInteractor.prototype.refreshToken = function (id, username, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, jwtService_1.verifyRefreshToken)(id, username, userId)];
                    case 1:
                        token = _a.sent();
                        console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(token);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserInteractor.prototype.IfindUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("a m hereeeeeeeeeeeee at inteeeeteractor rrrrrrrrrrr");
                        return [4 /*yield*/, this.repository.findUser(input)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserInteractor.prototype.IcheckEmail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var userIsThere;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.RfindEmail(input)];
                    case 1:
                        userIsThere = _a.sent();
                        return [2 /*return*/, userIsThere];
                }
            });
        });
    };
    UserInteractor.prototype.IuserLogin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var ifUser, AccessToken, RefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(" i suer login");
                        console.log(email);
                        return [4 /*yield*/, this.repository.RuserLogin(email, password)];
                    case 1:
                        ifUser = _a.sent();
                        if (!ifUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, jwtService_1.accessToken)(ifUser.userName, ifUser.email, ifUser._id)];
                    case 2:
                        AccessToken = _a.sent();
                        return [4 /*yield*/, (0, jwtService_1.refreshToken)(ifUser.userName, ifUser._id)];
                    case 3:
                        RefreshToken = _a.sent();
                        return [2 /*return*/, { ifUser: ifUser, AccessToken: AccessToken, RefreshToken: RefreshToken }];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    //  async Igetusers(): Promise<any> {
    //     let allUsers=await this.repository.Rgetusers()
    //     return allUsers
    // }
    UserInteractor.prototype.IgoogleLogin = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var data, Accesstoken, RefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.RgoogleLogin(email)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, (0, jwtService_1.accessToken)(data.userName, email, data._id)];
                    case 2:
                        Accesstoken = _a.sent();
                        return [4 /*yield*/, (0, jwtService_1.refreshToken)(data.userName, data._id)];
                    case 3:
                        RefreshToken = _a.sent();
                        return [2 /*return*/, { data: data, Accesstoken: Accesstoken, RefreshToken: RefreshToken }];
                }
            });
        });
    };
    UserInteractor.prototype.IuserStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.RuserStatus(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserInteractor.prototype.IsaveLocation = function (longitude, latitude, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.RsaveLocation(longitude, latitude, userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserInteractor.prototype.IsendOtp = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(" send  otpppppppppppppppppppp");
                        return [4 /*yield*/, this.repository.RsendOtp(email, otp)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserInteractor.prototype.IverifyOtp = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("verifyfyyyyyyyyyyyyyy otpppppppppppppppppppppppppppp");
                        return [4 /*yield*/, this.repository.RverifyOtp(email, otp)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserInteractor.prototype.IeditUserDetails = function (userId, userName, dob, gender) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.ReditUserDetails(userId, userName, dob, gender)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserInteractor.prototype.IgetOrderSummary = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.RgetOrderSummary(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserInteractor.prototype.IchangePassword = function (userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
                    case 1:
                        password = _a.sent();
                        return [4 /*yield*/, this.repository.RchangePassword(userId, password)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserInteractor = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(appConst_1.INTERFACE_TYPE.UserRepository)),
        __metadata("design:paramtypes", [Object])
    ], UserInteractor);
    return UserInteractor;
}());
exports.UserInteractor = UserInteractor;
