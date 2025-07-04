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
exports.checkRole = void 0;
const userRepository_1 = require("../repositories/user/userRepository");
const userRepo = new userRepository_1.UserRepository();
const checkRole = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = req.user;
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const ans = yield userRepo.RoleBasedAuthentication(decoded.id);
    if (!ans) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (roles.includes(ans === null || ans === void 0 ? void 0 : ans.role)) {
        next();
    }
    else {
        return res.status(402).json({ message: "not acces to this route" });
    }
});
exports.checkRole = checkRole;
