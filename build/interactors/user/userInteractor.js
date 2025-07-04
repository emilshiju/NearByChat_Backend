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
exports.UserInteractor = void 0;
require("reflect-metadata");
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const jwtService_1 = require("../../services/jwtService");
class UserInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userName, dob, gender, email, password } = input;
            const schema = joi_1.default.object({
                userName: joi_1.default.string().min(3).max(39).required(),
                dob: joi_1.default.date().iso().required(),
                gender: joi_1.default.string().valid('male', 'female', 'other').required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            });
            const SALT_ROUNDS = 10;
            console.log(SALT_ROUNDS);
            console.log(password);
            password = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const data = yield this.repository.create({ userName, dob, gender, email, password });
            const Accesstoken = yield (0, jwtService_1.accessToken)(data.userName, data.email, data._id);
            const RefreshToken = yield (0, jwtService_1.refreshToken)(data.userName, data._id);
            console.log(Accesstoken);
            console.log("here        token        toe toenm ekjsefhiusfjosd fjdsiojp           have            aces ");
            return { data, Accesstoken, RefreshToken };
        });
    }
    refreshToken(id, username, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield (0, jwtService_1.verifyRefreshToken)(id, username, userId);
            console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            console.log(token);
            return token;
        });
    }
    IfindUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("a m hereeeeeeeeeeeee at inteeeeteractor rrrrrrrrrrr");
            const users = yield this.repository.findUser(input);
            return users;
        });
    }
    IcheckEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let userIsThere = yield this.repository.RfindEmail(input);
            return userIsThere;
        });
    }
    IuserLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" i suer login");
            console.log(email);
            let ifUser = yield this.repository.RuserLogin(email, password);
            if (ifUser) {
                const AccessToken = yield (0, jwtService_1.accessToken)(ifUser.userName, ifUser.email, ifUser._id);
                const RefreshToken = yield (0, jwtService_1.refreshToken)(ifUser.userName, ifUser._id);
                return { ifUser, AccessToken, RefreshToken };
            }
            return false;
        });
    }
    IgoogleLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.RgoogleLogin(email);
            if (!data) {
                return null;
            }
            const Accesstoken = yield (0, jwtService_1.accessToken)(data.userName, email, data._id);
            const RefreshToken = yield (0, jwtService_1.refreshToken)(data.userName, data._id);
            return { data, Accesstoken, RefreshToken };
        });
    }
    IuserStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.repository.RuserStatus(userId);
            return response;
        });
    }
    IsaveLocation(longitude, latitude, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.repository.RsaveLocation(longitude, latitude, userId);
            return response;
        });
    }
    IsendOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" send  otpppppppppppppppppppp", email, otp);
            let response = yield this.repository.RsendOtp(email, otp);
            console.log("yes");
            return response;
        });
    }
    IverifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("verifyfyyyyyyyyyyyyyy otpppppppppppppppppppppppppppp");
            let response = yield this.repository.RverifyOtp(email, otp);
            return response;
        });
    }
    IeditUserDetails(userId, userName, dob, gender) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.ReditUserDetails(userId, userName, dob, gender);
            return response;
        });
    }
    IgetOrderSummary(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RgetOrderSummary(userId);
            if (!response) {
                return null;
            }
            return response;
        });
    }
    IchangePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = 10;
            password = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const response = yield this.repository.RchangePassword(userId, password);
            return response;
        });
    }
}
exports.UserInteractor = UserInteractor;
