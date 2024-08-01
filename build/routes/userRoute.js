"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var express_1 = __importDefault(require("express"));
var inversify_1 = require("inversify");
var appConst_1 = require("../utils/appConst");
var userRepository_1 = require("../repositories/userRepository");
var userInteractor_1 = require("../interactors/userInteractor");
var userController_1 = require("../controllers/userController");
// import 'reflect-metadata';
// import storage from "../frameWorks/cloudinary/cloudinary"
var jwtService_1 = require("../services/jwtService");
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({});
var upload = (0, multer_1.default)({ storage: storage });
var container = new inversify_1.Container();
exports.container = container;
container
    .bind(appConst_1.INTERFACE_TYPE.UserRepository)
    .to(userRepository_1.UserRepository);
container
    .bind(appConst_1.INTERFACE_TYPE.UserInteractor)
    .to(userInteractor_1.UserInteractor);
container.bind(appConst_1.INTERFACE_TYPE.UserController).to(userController_1.UserController);
var router = express_1.default.Router();
var controller = container.get(appConst_1.INTERFACE_TYPE.UserController);
router.post('/register', controller.onCreateUser.bind(controller));
router.post('/refresh', controller.onRefreshToken.bind(controller));
//  router.post('/login',controller.onLoginUser)
router.post('/findUser', jwtService_1.verifyAccesToken, controller.onFindUser.bind(controller));
router.get('/auth/google', controller.googleAuth.bind(controller));
router.get('/auth/google/callback', controller.googleAuthCallback.bind(controller));
router.post('/checkEmail', controller.findEmail.bind(controller));
router.post('/googleLogin', controller.googleLogin.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/saveLocation', controller.saveLocation.bind(controller));
// router.get('/getAllUsers',controller.getAllUsers.bind(controller))
router.post('/uploadProfile', upload.single('image'), controller.uploadProfileUser.bind(controller));
router.get('/userStatus/:id', controller.userStatus.bind(controller));
router.get('/sendOtp', controller.sendOtp.bind(controller));
router.get('/verifyOtp', controller.verifyOtp.bind(controller));
router.put('/editUserDetails', controller.editUserDetails.bind(controller));
router.get('/getOrderSummary/:id', controller.onGetOrderSummary.bind(controller));
router.patch('/changePassword', controller.onChangePassword.bind(controller));
exports.default = router;
