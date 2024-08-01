"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging = void 0;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var servieAccount = './settings.js';
var ac = require(servieAccount);
console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[");
console.log(ac);
var ah = JSON.stringify(ac);
var anana = JSON.parse(ah);
console.log(anana);
console.log("888");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(anana),
    // databaseURL: 'your-database-url-here'
});
console.log("999");
exports.messaging = firebase_admin_1.default.messaging();
