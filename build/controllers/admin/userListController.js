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
exports.UserListController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const statusCode_1 = require("../../entities/enums/statusCode");
dotenv_1.default.config();
class UserListController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.interactor.Igetusers();
                console.log(users);
                return res.json({ data: users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    blockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, status } = req.body;
                console.log(id);
                console.log(status);
                const response = yield this.interactor.IblockUser(id, status);
                return res.json({ status: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    searchUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = req.query.value || '';
                const users = yield this.interactor.IUsersearch(value);
                console.log(users);
                console.log(users);
                return res.json({ data: users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onSubmitReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reporter, reportedUser, reason } = req.body;
                const input = {
                    reporter,
                    reportedUser,
                    reason
                };
                const response = yield this.interactor.Ireport(input);
                return res.json({ status: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ongetAllReports(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.interactor.IgetAllReports();
                return res.json({ status: true, data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    adminLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { ifAdmin, AccessToken } = yield this.interactor.IadminLogin(email, password);
                if (ifAdmin) {
                    const userData = {
                        _id: ifAdmin._id,
                        userName: ifAdmin.userName,
                        role: ifAdmin.role,
                        email: ifAdmin.email,
                        status: ifAdmin.status
                    };
                    if (userData.role !== 'admin') {
                        // 402
                        return res.status(statusCode_1.HttpStatusCode.NOT_ACESSS).json({ message: "not acces to this route" });
                    }
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
                    return res.json({ message: "credential not correct", status: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    onChangeReportStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reportId, status } = req.body;
                const response = yield this.interactor.IOnChangeReportStatus(reportId, status);
            }
            catch (error) {
                next(error);
            }
        });
    }
    onSearchReports(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = req.query.value;
                const response = yield this.interactor.IOnReport(value);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onSearchSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = req.body;
                const response = yield this.interactor.IonSaveSearchSubscription(value);
                if (response) {
                    return res.json({ status: true });
                }
                else {
                    return res.json({ status: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    ongetSearchAllSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.interactor.IgetAllSearchSubscription();
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ongetAllPaymentSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.interactor.IgetAllPaymentSubscription();
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ongetDashboad(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const response = yield this.interactor.IgetDashboard();
                const dates = (_a = response.results) === null || _a === void 0 ? void 0 : _a.map((a) => a.date);
                const usersWeeklyCount = (_b = response.results) === null || _b === void 0 ? void 0 : _b.map((a) => a.count);
                const usersWeeklyOrderes = (_c = response.resultsOfSubscribed) === null || _c === void 0 ? void 0 : _c.map((a) => a.count);
                return res.json({ data: response, week: dates, weeklyUsers: usersWeeklyCount, weeklyOrderes: usersWeeklyOrderes });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneSubscriptionDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield this.interactor.IgetOneSubscriptionDetails(id);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCurrentSearchSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield this.interactor.IgetCurrentSearchSubscription(id);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onupdateSearchSUbscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = req.body.data;
                const id = req.body.id;
                const response = yield this.interactor.IupdateSearchSubscription(value, id);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ondeleteSearchSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respose = yield this.interactor.IdeleteSearchSubscription(id);
                return res.json({ status: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserListController = UserListController;
