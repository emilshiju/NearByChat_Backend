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
exports.userListInteractor = void 0;
const jwtService_1 = require("../../services/jwtService");
class userListInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    Igetusers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield this.repository.Rgetusers();
                return allUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IblockUser(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RblockUser(id, status);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IUsersearch(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const got = yield this.repository.RUsersearch(value);
                return got;
            }
            catch (error) {
                throw error;
            }
        });
    }
    Ireport(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.Rreport(input);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IgetAllReports() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RgetAllReports();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IadminLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ifAdmin = yield this.repository.RadminLogin(email, password);
                const AccessToken = yield (0, jwtService_1.accessToken)(ifAdmin.userName, ifAdmin.email, ifAdmin._id);
                return { ifAdmin, AccessToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    IOnChangeReportStatus(reportId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.ROnChangeReportStatus(reportId, status);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IOnReport(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.ROnReport(value);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IonSaveSearchSubscription(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RonSaveSearchSubscription(value);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IgetAllSearchSubscription() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RgetAllSearchSubscription();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IgetAllPaymentSubscription() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RgetAllPaymentSubscription();
                if (response) {
                    return response;
                }
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IgetDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RgetDashboard();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IgetOneSubscriptionDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RgetOneSubscriptionDetails(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IgetCurrentSearchSubscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RgetCurrentSearchSubscription(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IupdateSearchSubscription(value, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RupdateSearchSubscription(value, id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IdeleteSearchSubscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RdeleteSearchSubscription(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.userListInteractor = userListInteractor;
