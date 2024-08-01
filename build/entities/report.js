"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = void 0;
var report = /** @class */ (function () {
    function report(reporter, reportedUser, reason) {
        this.reporter = reporter;
        this.reportedUser = reportedUser;
        this.reason = reason;
    }
    return report;
}());
exports.report = report;
