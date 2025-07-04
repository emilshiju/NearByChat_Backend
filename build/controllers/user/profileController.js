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
exports.profileController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const razorpay_1 = __importDefault(require("razorpay"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
class profileController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onSubmitProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body;
                const response = yield this.interactor.IcreateProfile(input);
                if (response) {
                    return res.json({ status: true, data: response }).status(200);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfileUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.params.userId;
                const response = yield this.interactor.IgetProfileUrl(input);
                if (!response) {
                    return res.json({ status: false });
                }
                return res.json({ status: true, response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateImageUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, imageUrl } = req.body;
                const response = yield this.interactor.IupdateImageUrl(userId, imageUrl);
                return res.json({ status: true, response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const response = yield this.interactor.IgetNotification(userId);
                if (response) {
                    return res.json({ status: true, allNotification: response });
                }
                return res.json({ status: false });
            }
            catch (error) {
                next(error);
            }
        });
    }
    checkConnectionStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const receiverId = req.query.id;
                const response = yield this.interactor.IcheckConnectionStatus(userId, receiverId);
                return res.json({ status: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    storePushNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subscription } = req.body;
                console.log("oni on i oni");
                const value = subscription;
                const response = yield this.interactor.IStorePushNotification(value);
            }
            catch (error) {
                next(error);
            }
        });
    }
    UnsubscribeNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subscription } = req.body;
                const response = yield this.interactor.IUnsubscribeNotification(subscription);
            }
            catch (error) {
                next(error);
            }
        });
    }
    onPaymentOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, amount } = req.body;
                const instance = new razorpay_1.default({ key_id: 'rzp_test_FtkJsWcVUfJKnH', key_secret: 'yjWPt0JccwIc7wwmK3Regtgo' });
                const options = {
                    amount: amount * 100, // amount in smallest currency unit
                    currency: "INR",
                    receipt: id,
                };
                const order = yield instance.orders.create(options);
                return res.json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    onPaymentSuccesfull(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subId, userId, paymentId, orderId } = req.body;
                const response = yield this.interactor.IpaymentSummary(subId, userId, paymentId, orderId);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onChangeIncrementSearchCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.id;
                const response = yield this.interactor.IincrementSearchCount(userId);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onDisplayUserDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.interactor.IdispalyProfileDetails(userId);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onHashPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPassword, hashedPassword } = req.body;
                const isCorrect = yield bcrypt_1.default.compare(currentPassword, hashedPassword);
                return res.json({ status: isCorrect });
            }
            catch (error) {
                next(error);
            }
        });
    }
    uploadUserProfileImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, imageUrl } = req.body;
                const response = yield this.interactor.IuploadUserProfileImage(userId, imageUrl);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onDeleteProfileImageUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, index } = req.body;
                const response = yield this.interactor.IdeleteProfileImage(userId, index);
                return res.json({ status: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.profileController = profileController;
