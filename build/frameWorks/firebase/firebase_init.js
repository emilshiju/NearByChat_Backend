"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-I2EatZMWnBDasvqRd9svEhUO3Rs4lOY",
    authDomain: "blogplatform-8f233.firebaseapp.com",
    projectId: "blogplatform-8f233",
    storageBucket: "blogplatform-8f233.appspot.com",
    messagingSenderId: "339511224098",
    appId: "1:339511224098:web:b95e7ac432cfe5ae6ca77b",
    measurementId: "G-WQRKLWZTPK"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
// const analytics = getAnalytics(app);
exports.storage = (0, storage_1.getStorage)(app);
