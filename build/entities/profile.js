"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var Profile = /** @class */ (function () {
    function Profile(userId, nickName, bio, profession, imageUrl) {
        this.userId = userId;
        this.nickName = nickName;
        this.bio = bio;
        this.profession = profession;
        this.imageUrl = imageUrl;
    }
    return Profile;
}());
exports.Profile = Profile;
