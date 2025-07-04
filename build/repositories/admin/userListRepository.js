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
exports.userListRepository = void 0;
const userModel_1 = __importDefault(require("../../frameWorks/mongodb/models/userModel"));
const reportModel_1 = __importDefault(require("../../frameWorks/mongodb/models/reportModel"));
const searchSubscription_1 = __importDefault(require("../../frameWorks/mongodb/models/searchSubscription"));
const paymentSummary_1 = __importDefault(require("../../frameWorks/mongodb/models/paymentSummary"));
const userLocation_1 = __importDefault(require("../../frameWorks/mongodb/models/userLocation"));
class userListRepository {
    Rgetusers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = (yield userModel_1.default.find({
                    role: { $ne: "admin" },
                }));
                return allUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RblockUser(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let s;
                if (status) {
                    s = yield userModel_1.default.findByIdAndUpdate(id, { $set: { status: false } }, { new: true });
                }
                else {
                    s = yield userModel_1.default.findByIdAndUpdate(id, { $set: { status: true } }, { new: true });
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RUsersearch(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(value, "i");
            const res = yield userModel_1.default.aggregate([
                {
                    $match: {
                        role: { $ne: "admin" },
                        $or: [
                            { userName: { $regex: value, $options: "i" } },
                            // { nickName: { $regex: value, $options: 'i' } },
                            // { email: { $regex: value, $options: 'i' } }
                        ],
                    },
                },
                {
                    $addFields: {
                        userNameIndex: {
                            $indexOfCP: [{ $toLower: "$userName" }, value.toLowerCase()],
                        },
                        // nickNameIndex: { $indexOfCP: [{ $toLower: "$nickName" },value.toLowerCase()] },
                        // emailIndex: { $indexOfCP: [{ $toLower: "$email" }, value.toLowerCase()] }
                    },
                },
                {
                    $sort: {
                        userNameIndex: 1,
                        // nickNameIndex: 1,
                        // emailIndex: 1
                    },
                },
            ]);
            if (res.length == 0) {
                const res = yield userModel_1.default.find({
                    role: { $ne: "admin" },
                    $or: [
                        { nickName: { $regex: `^${value}`, $options: "i" } },
                        { email: { $regex: `^${value}`, $options: "i" } },
                    ],
                });
                return res;
            }
            return res;
        });
    }
    Rreport(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield reportModel_1.default.create({
                    reporter: input.reporter,
                    reportedUser: input.reportedUser,
                    reason: input.reason,
                });
                if (response) {
                    return true;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetAllReports() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const response = yield reportModel_1.default
                    .find()
                    .populate("reporter", "nickName  email")
                    .populate("reportedUser", "nickName  email")
                    .lean();
                const sorted = [];
                for (let rep of response) {
                    const checkStatus = sorted.find((a) => {
                        return (a.reporter.email == rep.reporter.email &&
                            a.reportedUser.email == rep.reportedUser.email);
                    });
                    if (checkStatus) {
                        checkStatus.reasons.push(rep.reason);
                    }
                    if (!checkStatus) {
                        sorted.push({
                            _id: rep._id,
                            reporter: rep.reporter,
                            reportedUser: rep.reportedUser,
                            reasons: [rep.reason],
                            marked: rep === null || rep === void 0 ? void 0 : rep.isRead,
                            createdAt: rep.createdAt,
                            __v: rep.__v,
                        });
                    }
                }
                return sorted;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RadminLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ifAdmin = yield userModel_1.default.findOne({
                    email: email,
                });
                if (ifAdmin) {
                    return ifAdmin;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ROnChangeReportStatus(reportId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield reportModel_1.default.findByIdAndUpdate(reportId, { $set: { isRead: status } });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ROnReport(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regex = new RegExp(value, "i");
                // @ts-ignore
                const a = yield reportModel_1.default
                    .find({})
                    .populate("reporter", "nickName  email")
                    .populate("reportedUser", "nickName  email")
                    .lean();
                const response = a.filter((a, b) => {
                    return (regex.test(a.reporter.email) ||
                        regex.test(a.reporter.nickName) ||
                        regex.test(a.reportedUser.email) ||
                        regex.test(a.reportedUser.nickName));
                });
                const sorted = [];
                for (let rep of response) {
                    let checkStatus = sorted.find((a) => {
                        return (a.reporter.email == rep.reporter.email &&
                            a.reportedUser.email == rep.reportedUser.email);
                    });
                    if (checkStatus) {
                        checkStatus.reasons.push(...rep.reason);
                    }
                    if (!checkStatus) {
                        sorted.push({
                            _id: rep._id,
                            reporter: rep.reporter,
                            reportedUser: rep.reportedUser,
                            reasons: [...rep.reason],
                            marked: rep === null || rep === void 0 ? void 0 : rep.isRead,
                            createdAt: rep.createdAt,
                            __v: rep.__v,
                        });
                    }
                }
                return sorted;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RonSaveSearchSubscription(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sumOfSub = yield searchSubscription_1.default.find({});
                if (sumOfSub.length >= 3) {
                    return false;
                }
                const response = yield searchSubscription_1.default.create(value);
                console.log(value);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetAllSearchSubscription() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield searchSubscription_1.default.find();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetAllPaymentSubscription() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield paymentSummary_1.default.find({});
                if (!response) {
                    return null;
                }
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            // getting daily sale amount
            // const totalAmount=await paymentSummaryModel.aggregate([
            //   {$group:{_id:null,totalSum:{$sum:"$price"}}}const now = new Date();
            // Subtract 24 hours from the current date and time
            const now = new Date();
            const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            // Aggregation pipeline
            const totalAmountDaily = yield paymentSummary_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: twentyFourHoursAgo,
                            $lte: now,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalSum: { $sum: "$price" },
                    },
                },
            ]);
            // ])
            console.log("get atotal amount", totalAmountDaily);
            // get users count
            const countAlluser = yield userModel_1.default.countDocuments({});
            // get count of order
            const countPayment = yield paymentSummary_1.default.countDocuments({});
            // get count of reports
            const countReport = yield reportModel_1.default.countDocuments({});
            // getCountOfusers joined  Weekely
            // Calculate the date one week ago
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            // Aggregation pipeline
            const usersJoinedDaily = yield userLocation_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: oneWeekAgo, // Greater than or equal to one week ago
                            $lte: now, // Less than or equal to now
                        },
                    },
                },
                {
                    $project: {
                        day: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$day",
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            console.log("aggggggggggggggggggggg resuleeeeeeee");
            console.log(usersJoinedDaily);
            const results = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                const dateString = date.toISOString().split("T")[0];
                // Find the count for this date or use 0 if not found
                const dayData = usersJoinedDaily.find((item) => item._id === dateString);
                results.push({ date: dateString, count: dayData ? dayData.count : 0 });
            }
            results.reverse();
            console.log("User Joined Count by Day for the Last Week:", results);
            // get count of order weekely
            const usersSubscribedDaily = yield paymentSummary_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: oneWeekAgo, // Greater than or equal to one week ago
                            $lte: now, // Less than or equal to now
                        },
                    },
                },
                {
                    $project: {
                        day: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$day",
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            console.log("subsssssssssssssssssssssss");
            console.log(usersSubscribedDaily);
            const resultsOfSubscribed = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                const dateString = date.toISOString().split("T")[0];
                // Find the count for this date or use 0 if not found
                const dayData = usersSubscribedDaily.find((item) => item._id === dateString);
                resultsOfSubscribed.push({
                    date: dateString,
                    count: dayData ? dayData.count : 0,
                });
            }
            resultsOfSubscribed.reverse();
            console.log("User Joined Count by Day for the Last Week:");
            console.log("first");
            console.log(totalAmountDaily);
            console.log("second");
            console.log(countAlluser);
            console.log("third");
            console.log(countPayment);
            console.log("fourth");
            console.log(results);
            console.log("fifth");
            console.log(resultsOfSubscribed);
            console.log("last");
            console.log(countReport);
            console.log("ppp");
            console.log(totalAmountDaily, countAlluser, countPayment, countReport, results, resultsOfSubscribed);
            return {
                totalAmountDaily,
                countAlluser,
                countPayment,
                countReport,
                results,
                resultsOfSubscribed,
            };
        });
    }
    RgetOneSubscriptionDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield paymentSummary_1.default.findById(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RgetCurrentSearchSubscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield searchSubscription_1.default.findById(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RupdateSearchSubscription(value, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield searchSubscription_1.default.findOneAndUpdate({ _id: id }, {
                    $set: {
                        name: value.name,
                        maxCount: value.maxCount,
                        price: value.price,
                        timePeriod: value.timePeriod,
                        imageUrl: value.imageUrl,
                    },
                }, {
                    new: true,
                });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    RdeleteSearchSubscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield searchSubscription_1.default.findByIdAndDelete(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.userListRepository = userListRepository;
