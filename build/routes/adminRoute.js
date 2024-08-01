"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inversify_1 = require("inversify");
var appConst_1 = require("../utils/appConst");
var userListInteractor_1 = require("../interactors/admin/userListInteractor");
var userListRepository_1 = require("../repositories/admin/userListRepository");
var userListController_1 = require("../controllers/admin/userListController");
var rba_1 = require("../services/rba");
var jwtService_1 = require("../services/jwtService");
var container = new inversify_1.Container();
container
    .bind(appConst_1.INTERFACE_TYPE.UserListInteractor)
    .to(userListInteractor_1.userListInteractor);
container
    .bind(appConst_1.INTERFACE_TYPE.UserListRepository)
    .to(userListRepository_1.userListRepository);
container.bind(appConst_1.INTERFACE_TYPE.UserListController).to(userListController_1.UserListController);
var router = (0, express_1.default)();
var controller = container.get(appConst_1.INTERFACE_TYPE.UserListController);
router.post('/adminLogin', controller.adminLogin.bind(controller));
router.get('/getAllUsers', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['admin']), controller.getAllUsers.bind(controller));
router.patch('/blockUser', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['admin']), controller.blockUser.bind(controller));
router.get('/searchUsers', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['admin']), controller.searchUsers.bind(controller));
router.post('/submitReport', controller.onSubmitReport.bind(controller));
router.get('/getAllReports', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['admin']), controller.ongetAllReports.bind(controller));
router.patch('/changeReportStatus', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['admin']), controller.onChangeReportStatus.bind(controller));
router.get('/searchReports', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['admin']), controller.onSearchReports.bind(controller));
router.post('/saveSearchSubscription', controller.onSearchSubscription.bind(controller));
router.get('/getAllSearchSubscription', controller.ongetSearchAllSubscription.bind(controller));
router.get('/allSubscriptionDetails', controller.ongetAllPaymentSubscription.bind(controller));
router.get('/getDashboard', controller.ongetDashboad.bind(controller));
router.get('/getOneSubscriptionSummary/:id', controller.getOneSubscriptionDetails.bind(controller));
router.get('/getCurrentSearchSubscription/:id', controller.getCurrentSearchSubscription.bind(controller));
router.put('/updateSearchSubscription', controller.onupdateSearchSUbscription.bind(controller));
router.delete('/deleteSearchSubscription/:id', controller.ondeleteSearchSubscription.bind(controller));
exports.default = router;
