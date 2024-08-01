"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.User = void 0;
var User = /** @class */ (function () {
    function User(userName, dob, gender, email, password) {
        this.userName = userName;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
var findUser = /** @class */ (function () {
    function findUser(userId, 
    // public readonly location:{longitude:number,latitude:number},
    radius) {
        this.userId = userId;
        this.radius = radius;
    }
    return findUser;
}());
exports.findUser = findUser;
