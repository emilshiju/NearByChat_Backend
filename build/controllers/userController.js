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
exports.UserController = void 0;
var inversify_1 = require("inversify");
var appConst_1 = require("../utils/appConst");
var OAuth2Client = require('google-auth-library').OAuth2Client;
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cloudinary_1 = require("cloudinary");
var randomstring_1 = __importDefault(require("randomstring"));
var nodeMailer_1 = __importDefault(require("../utils/nodeMailer"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var CLIENT_ID = process.env.CLIENT_ID;
var client = new OAuth2Client(process.env.CLIENT_ID);
var UserController = /** @class */ (function () {
    function UserController(interactor) {
        this.interactor = interactor;
    }
    UserController.prototype.onCreateUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var input, _a, Accesstoken, data, RefreshToken, userData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log("vanu");
                        input = req.body;
                        return [4 /*yield*/, this.interactor.createUser(input)];
                    case 1:
                        _a = _b.sent(), Accesstoken = _a.Accesstoken, data = _a.data, RefreshToken = _a.RefreshToken;
                        userData = {
                            _id: data._id,
                            userName: data.userName,
                            role: data.role,
                            email: data.email,
                            status: data.status,
                            nickName: data.nickName,
                            imageUrl: data.imageUrl
                        };
                        if (!userData.status) {
                            return [2 /*return*/, res.status(403).json({ error: 'Your account is blocked. Please contact support.' })];
                        }
                        res.cookie("jwt", RefreshToken, {
                            httpOnly: true,
                            sameSite: "none",
                            secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });
                        return [2 /*return*/, res
                                .json({
                                message: "succesfully registered",
                                data: userData,
                                Accesstoken: Accesstoken,
                            })
                                .status(200)];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.onRefreshToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, userName, userId, accesstoken, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.cookies['jwt'];
                        _a = req.body, userName = _a.userName, userId = _a.userId;
                        console.log("888888888888888888888888888888888888888888888888888888888888888888888888");
                        console.log(id, userName);
                        if (!id) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                        }
                        return [4 /*yield*/, this.interactor.refreshToken(id, userName, userId)];
                    case 1:
                        accesstoken = _b.sent();
                        console.log("reeeeeeeeeeeeefreshhhhhhhhhhhhhhhhhhhh tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
                        console.log(accesstoken);
                        res.status(200).json({ data: accesstoken });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log("error aneee");
                        console.log(error_2);
                        return [2 /*return*/, res.status(401).json({ message: "oops" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.onLoginUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.onFindUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var body, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = req.body;
                        console.log("herereeeeee");
                        console.log(body);
                        return [4 /*yield*/, this.interactor.IfindUser(body)];
                    case 1:
                        data = _a.sent();
                        console.log("response");
                        console.log(data);
                        console.log("oiooioio");
                        return [2 /*return*/, res.json({ data: data }).status(200)];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.googleAuth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var CLIENT_ID_1, REDIRECT_URI, url;
            return __generator(this, function (_a) {
                try {
                    console.log("hereee");
                    console.log(process.env.CLIENT_ID);
                    CLIENT_ID_1 = process.env.CLIENT_ID;
                    REDIRECT_URI = process.env.REDIRECT_URI;
                    url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=".concat(CLIENT_ID_1, "&redirect_uri=").concat(REDIRECT_URI, "&response_type=code&scope=profile email");
                    console.log(REDIRECT_URI);
                    console.log(CLIENT_ID_1);
                    res.redirect(url);
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.googleAuthCallback = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var code, data, access_token, id_token, profile, email, isThere, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("iveide aneee okk");
                        code = req.query.code;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        //  Exchange authorization code for access token
                        console.log("ivide onnn anee");
                        return [4 /*yield*/, axios_1.default.post("https://oauth2.googleapis.com/token", {
                                client_id: process.env.CLIENT_ID,
                                client_secret: process.env.CLIENT_SECRET,
                                code: code,
                                redirect_uri: process.env.REDIRECT_URI,
                                grant_type: "authorization_code",
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        access_token = data.access_token, id_token = data.id_token;
                        return [4 /*yield*/, axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
                                headers: { Authorization: "Bearer ".concat(access_token) },
                            })];
                    case 3:
                        profile = (_a.sent()).data;
                        email = profile.email;
                        return [4 /*yield*/, this.interactor.IcheckEmail(email)];
                    case 4:
                        isThere = _a.sent();
                        if (!isThere) {
                            return [2 /*return*/, res.json({ messaeg: "please create an account here" })];
                        }
                        return [2 /*return*/, res.json({ message: "sucessfulyy logined" })];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, res.json({ message: "please create an google account" })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, isThere;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("am hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        email = req.body.email;
                        console.log(email);
                        return [4 /*yield*/, this.interactor.IcheckEmail(email)];
                    case 1:
                        isThere = _a.sent();
                        return [2 /*return*/, res.json({ status: isThere })];
                }
            });
        });
    };
    UserController.prototype.googleLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idToken, email, username, ticket, _b, data, Accesstoken, RefreshToken, userData, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, idToken = _a.idToken, email = _a.email, username = _a.username;
                        console.log("vansdfsfsdfs333333333333333333333333333333333333333333333333333333333333333333333333333333d");
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, client.verifyIdToken({
                                idToken: idToken,
                                audience: CLIENT_ID
                            })];
                    case 2:
                        ticket = _c.sent();
                        return [4 /*yield*/, this.interactor.IgoogleLogin(email)];
                    case 3:
                        _b = _c.sent(), data = _b.data, Accesstoken = _b.Accesstoken, RefreshToken = _b.RefreshToken;
                        userData = {
                            _id: data._id,
                            userName: data.userName,
                            role: data.role,
                            email: data.email,
                            status: data.status
                        };
                        if (!userData.status) {
                            return [2 /*return*/, res.status(403).json({ error: 'Your account is blocked. Please contact support.' })];
                        }
                        res.cookie("jwt", RefreshToken, {
                            httpOnly: true,
                            sameSite: "none",
                            secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });
                        return [2 /*return*/, res
                                .json({
                                message: "succesfully registered",
                                data: userData,
                                Accesstoken: Accesstoken,
                            })
                                .status(200)];
                    case 4:
                        error_5 = _c.sent();
                        console.log("bjbjhb");
                        console.log(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, pasword, _b, ifUser, AccessToken, RefreshToken, userData, role;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, email = _a.email, pasword = _a.pasword;
                        console.log("vanu");
                        console.log(email, pasword);
                        return [4 /*yield*/, this.interactor.IuserLogin(email, pasword)];
                    case 1:
                        _b = _c.sent(), ifUser = _b.ifUser, AccessToken = _b.AccessToken, RefreshToken = _b.RefreshToken;
                        console.log("poyiiii");
                        if (ifUser) {
                            userData = {
                                _id: ifUser._id,
                                userName: ifUser.userName,
                                role: ifUser.role,
                                email: ifUser.email,
                                status: ifUser.status
                            };
                            role = ['user'];
                            if (!role.includes(userData.role)) {
                                return [2 /*return*/, res.status(402).json({ message: "not acces to this route" })];
                            }
                            if (!userData.status) {
                                return [2 /*return*/, res.status(403).json({ error: 'Your account is blocked. Please contact support.' })];
                            }
                            res.cookie("jwt", RefreshToken, {
                                httpOnly: true,
                                sameSite: "none",
                                secure: true,
                                maxAge: 24 * 60 * 60 * 1000,
                            });
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
                            return [2 /*return*/, res.json({ message: "credential not correct", status: false }).status(400)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // async getAllUsers(req:Request,res:Response,next:NextFunction){
    //    console.log("yes")
    //   let users=await this.interactor.Igetusers()
    //   console.log("sodfjso")
    //   console.log(users)
    //   return res.json({data:users})
    // }
    UserController.prototype.uploadProfileUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("vanuunu");
                        console.log(req.body);
                        console.log(req.file);
                        if (!req.file) return [3 /*break*/, 2];
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(req.file.path, {
                                folder: '/nearbychat'
                            })];
                    case 1:
                        result = _a.sent();
                        console.log("am    33333333333333333333333333333333333333333333333333333333333333333333333            hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(result);
                        if (result) {
                            return [2 /*return*/, res.json({ status: true, result: result })];
                        }
                        return [2 /*return*/, res.json({ status: false })];
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.userStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.id;
                        return [4 /*yield*/, this.interactor.IuserStatus(userId)];
                    case 1:
                        response = _a.sent();
                        console.log("statussssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                        console.log(response);
                        return [2 /*return*/, res.json({ status: response })];
                }
            });
        });
    };
    UserController.prototype.saveLocation = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, longitude, latitude, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, longitude = _a.longitude, latitude = _a.latitude, userId = _a.userId;
                        return [4 /*yield*/, this.interactor.IsaveLocation(longitude, latitude, userId)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.sendOtp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            function generateOTP() {
                return randomstring_1.default.generate({
                    length: 4,
                    charset: 'numeric'
                });
            }
            var email, otp, response, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.query.email;
                        console.log(email);
                        if (typeof email !== 'string') {
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid email' })];
                        }
                        otp = generateOTP();
                        return [4 /*yield*/, this.interactor.IsendOtp(email, otp)];
                    case 1:
                        response = _a.sent();
                        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                        console.log(response);
                        mailOptions = {
                            from: 'nearByChat@gmail.com', // Change this to your email
                            to: "".concat(response.email), // Change this to the recipient's email
                            subject: "".concat(response.otp),
                            text: 'Hello, this is a test email.',
                        };
                        (0, nodeMailer_1.default)(mailOptions);
                        console.log("otp          hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(otp);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.verifyOtp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, otp, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, email = _a.email, otp = _a.otp;
                        console.log(email, otp);
                        console.log("verifyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy 0ooooooooooooooooooooooooooooooooooooooooooooooooooo");
                        return [4 /*yield*/, this.interactor.IverifyOtp(email, otp)];
                    case 1:
                        response = _b.sent();
                        console.log("resulttttttttttttttttttttttttttttttttttttttttttt");
                        console.log(response);
                        return [2 /*return*/, res.json({ response: response })];
                }
            });
        });
    };
    UserController.prototype.editUserDetails = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, dob, gender, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("edittttttttttttt userrrrrrrrrrrrrr detailllllllllllllll");
                        console.log(req.body);
                        _a = req.body, userName = _a.userName, dob = _a.dob, gender = _a.gender, userId = _a.userId;
                        console.log(userName, dob, gender, userId);
                        return [4 /*yield*/, this.interactor.IeditUserDetails(userId, userName, dob, gender)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ status: true })];
                }
            });
        });
    };
    UserController.prototype.onGetOrderSummary = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.id;
                        console.log("vanu");
                        console.log(userId);
                        return [4 /*yield*/, this.interactor.IgetOrderSummary(userId)];
                    case 1:
                        response = _a.sent();
                        console.log("ressssssssssssssssssssssssssss");
                        console.log(response);
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    UserController.prototype.onChangePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, userId = _a.userId;
                        return [4 /*yield*/, this.interactor.IchangePassword(userId, password)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ status: true })];
                }
            });
        });
    };
    UserController = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(appConst_1.INTERFACE_TYPE.UserInteractor)),
        __metadata("design:paramtypes", [Object])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
