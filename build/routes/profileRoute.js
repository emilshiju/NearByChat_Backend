"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var express_1 = __importDefault(require("express"));
var inversify_1 = require("inversify");
var appConst_1 = require("../utils/appConst");
var profileInteractor_1 = require("../interactors/profileInteractor");
var profileRepository_1 = require("../repositories/profileRepository");
var profileController_1 = require("../controllers/profileController");
var jwtService_1 = require("../services/jwtService");
var rba_1 = require("../services/rba");
var container = new inversify_1.Container();
exports.container = container;
container
    .bind(appConst_1.INTERFACE_TYPE.ProfileInteractor).to(profileInteractor_1.ProfileInteractor);
container
    .bind(appConst_1.INTERFACE_TYPE.ProfileRepository).to(profileRepository_1.ProfileRepository);
container.bind(appConst_1.INTERFACE_TYPE.ProfileController).to(profileController_1.profileController);
var route = express_1.default.Router();
var controller = container.get(appConst_1.INTERFACE_TYPE.ProfileController);
route.post('/submitProfile', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.onSubmitProfile.bind(controller));
route.get('/getProfile/:userId', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.getProfileUrl.bind(controller));
route.patch('/updateImageUrl', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.updateImageUrl.bind(controller));
route.get('/getAllNotification/:userId', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.getAllNotification.bind(controller));
route.get('/checkConnectionStatus', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.checkConnectionStatus.bind(controller));
route.patch('/unConnectUser', controller.onUnconnectUser.bind(controller));
route.post('/storePushNotification', controller.storePushNotification.bind(controller));
route.post('/UnsubscribeNotification', controller.UnsubscribeNotification.bind(controller));
route.post('/payment/order', controller.onPaymentOrder.bind(controller));
route.post('/payment/sucessfull', controller.onPaymentSuccesfull.bind(controller));
route.patch('/incrementSearchCount', controller.onChangeIncrementSearchCount.bind(controller));
route.get('/displayUserDetails/:id', controller.onDisplayUserDetails.bind(controller));
route.post('/hashPassword', controller.onHashPassword.bind(controller));
route.patch('/uploadUserProfileImage', controller.uploadUserProfileImage.bind(controller));
route.post('/deleteProfileImage', controller.onDeleteProfileImageUrl.bind(controller));
// Exporting route as default export
exports.default = route;
