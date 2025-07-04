"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReport = exports.report = void 0;
class report {
    constructor(reporter, reportedUser, reason) {
        this.reporter = reporter;
        this.reportedUser = reportedUser;
        this.reason = reason;
    }
}
exports.report = report;
class UserReport {
    constructor(_id, email, nickName) {
        this._id = _id;
        this.email = email;
        this.nickName = nickName;
    }
}
exports.UserReport = UserReport;
