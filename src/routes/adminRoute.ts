import express from "express"

import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserListInteractor } from "../interfaces/admin/IUserlistInteractor";
import { userListInteractor } from "../interactors/admin/userListInteractor";
import { IUserListRepository } from "../interfaces/admin/IUserlistRepository";
import { userListRepository } from "../repositories/admin/userListRepository";
import { UserListController } from "../controllers/admin/userListController";
import { checkRole } from "../services/rba";
import { verifyAccesToken } from "../services/jwtService";



const container=new Container()

container
.bind<IUserListInteractor>(INTERFACE_TYPE.UserListInteractor)
.to(userListInteractor)

container
.bind<IUserListRepository>(INTERFACE_TYPE.UserListRepository)
.to(userListRepository)


container.bind(INTERFACE_TYPE.UserListController).to(UserListController)

const router=express()

const controller=container.get<UserListController>(INTERFACE_TYPE.UserListController)


router.post('/adminLogin',controller.adminLogin.bind(controller))


router.get('/getAllUsers',verifyAccesToken,checkRole(['admin']),controller.getAllUsers.bind(controller))


router.patch('/blockUser',verifyAccesToken,checkRole(['admin']),controller.blockUser.bind(controller))

router.get('/searchUsers',verifyAccesToken,checkRole(['admin']),controller.searchUsers.bind(controller))

router.post('/submitReport',controller.onSubmitReport.bind(controller))


router.get('/getAllReports',verifyAccesToken,checkRole(['admin']),controller.ongetAllReports.bind(controller))



router.patch('/changeReportStatus',verifyAccesToken,checkRole(['admin']),controller.onChangeReportStatus.bind(controller))

router.get('/searchReports',verifyAccesToken,checkRole(['admin']),controller.onSearchReports.bind(controller))


router.post('/saveSearchSubscription',controller.onSearchSubscription.bind(controller))

router.get('/getAllSearchSubscription',controller.ongetSearchAllSubscription.bind(controller))

router.get('/allSubscriptionDetails',controller.ongetAllPaymentSubscription.bind(controller))


router.get('/getDashboard',controller.ongetDashboad.bind(controller))

router.get('/getOneSubscriptionSummary/:id',controller.getOneSubscriptionDetails.bind(controller))


router.get('/getCurrentSearchSubscription/:id',controller.getCurrentSearchSubscription.bind(controller))



router.put('/updateSearchSubscription',controller.onupdateSearchSUbscription.bind(controller))


router.delete('/deleteSearchSubscription/:id',controller.ondeleteSearchSubscription.bind(controller))

export default router