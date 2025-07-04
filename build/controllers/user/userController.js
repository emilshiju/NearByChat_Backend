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
exports.UserController = void 0;
const { OAuth2Client } = require('google-auth-library');
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
const randomstring_1 = __importDefault(require("randomstring"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const statusCode_1 = require("../../entities/enums/statusCode");
const role_1 = require("../../entities/enums/role");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
let CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(process.env.CLIENT_ID);
class UserController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onCreateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body;
                const { Accesstoken, data, RefreshToken } = yield this.interactor.createUser(input);
                const userData = {
                    _id: data._id,
                    userName: data.userName,
                    role: data.role,
                    email: data.email,
                    status: data.status,
                    nickName: data.nickName,
                    imageUrl: data.imageUrl
                };
                if (!userData.status) {
                    //    403
                    return res.status(statusCode_1.HttpStatusCode.FORBIDDEN).json({ error: 'Your account is blocked. Please contact support.' });
                }
                res.cookie("jwt", RefreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                return res
                    .json({
                    message: "succesfully registered",
                    data: userData,
                    Accesstoken,
                })
                    .status(200);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    onRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.cookies['jwt'];
                const { userName, userId } = req.body;
                if (!id) {
                    // 401 
                    return res.status(statusCode_1.HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
                }
                const accesstoken = yield this.interactor.refreshToken(id, userName, userId);
                //200
                res.status(statusCode_1.HttpStatusCode.OK).json({ data: accesstoken });
            }
            catch (error) {
                return res.status(401).json({ message: "oops" });
            }
        });
    }
    onFindUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const data = yield this.interactor.IfindUser(body);
                return res.json({ data }).status(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CLIENT_ID = process.env.CLIENT_ID;
                const REDIRECT_URI = process.env.REDIRECT_URI;
                const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
                res.redirect(url);
            }
            catch (error) {
                next(error);
            }
        });
    }
    googleAuthCallback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.query;
            try {
                //  Exchange authorization code for access token
                const { data } = yield axios_1.default.post("https://oauth2.googleapis.com/token", {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    code,
                    redirect_uri: process.env.REDIRECT_URI,
                    grant_type: "authorization_code",
                });
                const { access_token, id_token } = data;
                const { data: profile } = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                const { email } = profile;
                const isThere = yield this.interactor.IcheckEmail(email);
                if (!isThere) {
                    return res.json({ messaeg: "please create an account here" });
                }
                return res.json({ message: "sucessfulyy logined" });
            }
            catch (error) {
                return res.json({ message: "please create an google account" });
            }
        });
    }
    findEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log(email);
                const isThere = yield this.interactor.IcheckEmail(email);
                return res.json({ status: isThere });
            }
            catch (error) {
                next(error);
            }
        });
    }
    googleLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idToken, email, username } = req.body;
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: idToken,
                    audience: CLIENT_ID
                });
                const { data, Accesstoken, RefreshToken } = yield this.interactor.IgoogleLogin(email);
                const userData = {
                    _id: data._id,
                    userName: data.userName,
                    role: data.role,
                    email: data.email,
                    status: data.status
                };
                if (!userData.status) {
                    // 403
                    return res.status(statusCode_1.HttpStatusCode.FORBIDDEN).json({ error: 'Your account is blocked. Please contact support.' });
                }
                res.cookie("jwt", RefreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                return res
                    .json({
                    message: "succesfully registered",
                    data: userData,
                    Accesstoken,
                })
                    .status(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, pasword } = req.body;
            console.log(email, pasword);
            const { ifUser, AccessToken, RefreshToken } = yield this.interactor.IuserLogin(email, pasword);
            if (ifUser) {
                const userData = {
                    _id: ifUser._id,
                    userName: ifUser.userName,
                    role: ifUser.role,
                    email: ifUser.email,
                    status: ifUser.status
                };
                //  let role=['user']
                if (userData.role !== role_1.UserRole.USER) {
                    // 402
                    return res.status(statusCode_1.HttpStatusCode.NOT_ACESSS).json({ message: "not acces to this route" });
                }
                if (!userData.status) {
                    // 403
                    return res.status(statusCode_1.HttpStatusCode.FORBIDDEN).json({ error: 'Your account is blocked. Please contact support.' });
                }
                res.cookie("jwt", RefreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                return res
                    .json({
                    message: "succesfully Logined",
                    data: userData,
                    AccessToken,
                    status: true
                })
                    .status(200);
            }
            else {
                return res.json({ message: "credential not correct", status: false }).status(400);
            }
        });
    }
    uploadProfileUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    const result = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                        folder: '/nearbychat'
                    });
                    if (result) {
                        return res.json({ status: true, result });
                    }
                    return res.json({ status: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    userStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.interactor.IuserStatus(userId);
                return res.json({ status: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    saveLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { longitude, latitude, userId } = req.body;
                yield this.interactor.IsaveLocation(longitude, latitude, userId);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                if (typeof email !== 'string') {
                    // 400
                    return res.status(statusCode_1.HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid email' });
                }
                function generateOTP() {
                    return randomstring_1.default.generate({
                        length: 4,
                        charset: 'numeric'
                    });
                }
                const otp = generateOTP();
                const response = yield this.interactor.IsendOtp(email, otp);
                console.log("get response", response);
                console.log("off useeeeeeeeeerrr");
                console.log(response.email);
                const mailOptions = {
                    from: 'nearByChat@gmail.com', // Change this to your email
                    to: `${response.email}`, // Change this to the recipient's email
                    subject: `${response.otp}`,
                    text: 'Hello, this is a test email.',
                };
                (0, nodeMailer_1.default)(mailOptions);
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.query;
                const response = yield this.interactor.IverifyOtp(email, otp);
                return res.json({ response: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    editUserDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, dob, gender, userId } = req.body;
                yield this.interactor.IeditUserDetails(userId, userName, dob, gender);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onGetOrderSummary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.interactor.IgetOrderSummary(userId);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onChangePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, userId } = req.body;
                yield this.interactor.IchangePassword(userId, password);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
