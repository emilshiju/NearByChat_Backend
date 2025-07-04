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
exports.verifyAccesToken = exports.refreshToken = exports.verifyRefreshToken = exports.accessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessToken = (userName, email, id) => {
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || "ejiofheoihfoiehofheiofhejrhfoh";
    const token = jsonwebtoken_1.default.sign({
        username: userName,
        email: email,
        id: id,
    }, secretOrPrivateKey, { expiresIn: "5d" });
    console.log("ccreating creatn creaitn creaitn creta ty token token token otken eotne token");
    console.log(token);
    return token;
};
exports.accessToken = accessToken;
const verifyRefreshToken = (input, username, userId) => {
    const secret = process.env.REFRESH_TOKEN_SECRET || "SUFHSIUFHISDHFSHFKWEHFUEWH";
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(input, secret, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                reject(err); // Return error if verification fails
            }
            else {
                const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || "ejiofheoihfoiehofheiofhejrhfoh";
                const token = yield jsonwebtoken_1.default.sign({
                    username: username,
                    id: userId,
                }, secretOrPrivateKey, { expiresIn: "10d" });
                resolve(token);
            }
        }));
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
const refreshToken = (username, id) => {
    const secretOrPrivateKey = process.env.REFRESH_TOKEN_SECRET || "SUFHSIUFHISDHFSHFKWEHFUEWH";
    const token = jsonwebtoken_1.default.sign({
        username: username,
        id: id,
    }, secretOrPrivateKey, { expiresIn: "10d" });
    console.log(token);
    return token;
};
exports.refreshToken = refreshToken;
const verifyAccesToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || "ejiofheoihfoiehofheiofhejrhfoh";
        jsonwebtoken_1.default.verify(token, secretOrPrivateKey, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyAccesToken = verifyAccesToken;
