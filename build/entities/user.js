"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userList = exports.findUser = exports.User = void 0;
class User {
    constructor(userName, dob, gender, email, password) {
        this.userName = userName;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }
}
exports.User = User;
class findUser {
    constructor(userId, 
    // public readonly location:{longitude:number,latitude:number},
    radius) {
        this.userId = userId;
        this.radius = radius;
    }
}
exports.findUser = findUser;
class userList {
    constructor(_id, userName, dob, gender, email, password, status, role, imageUrl, currSearch, maxSearch, connections, bio, nickName, profession, updatedAt, images) {
        this._id = _id;
        this.userName = userName;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.status = status;
        this.role = role;
        this.imageUrl = imageUrl;
        this.currSearch = currSearch;
        this.maxSearch = maxSearch;
        this.connections = connections;
        this.bio = bio;
        this.nickName = nickName;
        this.profession = profession;
        this.updatedAt = updatedAt;
        this.images = images;
    }
}
exports.userList = userList;
;
