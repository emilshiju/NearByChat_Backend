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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInteractor = void 0;
class ProfileInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    IcreateProfile(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.repository.RcreateProfile(input);
            return res;
        });
    }
    IgetProfileUrl(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("second");
            let res = yield this.repository.RgetProfileUrl(input);
            return res;
        });
    }
    IupdateImageUrl(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.repository.RupdateImageUrl(userId, imageUrl);
            return data;
        });
    }
    IgetNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const respone = yield this.repository.RgetNotification(userId);
            return respone;
        });
    }
    IcheckConnectionStatus(userId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.repository.RcheckConnectionStatus(userId, receiverId);
            return response;
        });
    }
    IStorePushNotification(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RStorePushNotification(value);
            return response;
        });
    }
    IUnsubscribeNotification(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RUnsubscribeNotification(value);
            return response;
        });
    }
    IpaymentSummary(subId, userId, paymentId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const respone = yield this.repository.RpaymentSummary(subId, userId, paymentId, orderId);
            return respone;
        });
    }
    IincrementSearchCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RincrementSearchCount(userId);
            return response;
        });
    }
    IdispalyProfileDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RdisplayProfileDetails(userId);
            return response;
        });
    }
    IuploadUserProfileImage(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RuploadUserProfileImage(userId, imageUrl);
            return response;
        });
    }
    IdeleteProfileImage(userId, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.RdeleteProfileImage(userId, index);
            return response;
        });
    }
}
exports.ProfileInteractor = ProfileInteractor;
