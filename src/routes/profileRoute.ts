import express from "express"
import { Container } from "inversify";
import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";

import { INTERFACE_TYPE } from "../utils/appConst";
import { ProfileInteractor } from "../interactors/profileInteractor";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { ProfileRepository } from "../repositories/profileRepository";
import { profileController } from "../controllers/profileController";
import { verifyAccesToken } from "../services/jwtService";
import { checkRole } from "../services/rba";



const container=new Container()


container
.bind<IProfileInteractor>(INTERFACE_TYPE.ProfileInteractor).to(ProfileInteractor)

container
.bind<IPofileRepository>(INTERFACE_TYPE.ProfileRepository).to(ProfileRepository)



container.bind(INTERFACE_TYPE.ProfileController).to(profileController)

const route=express.Router()
const controller=container.get<profileController>(INTERFACE_TYPE.ProfileController)


route.post('/submitProfile',verifyAccesToken,checkRole(['user']),controller.onSubmitProfile.bind(controller))


route.get('/getProfile/:userId',verifyAccesToken,checkRole(['user']),controller.getProfileUrl.bind(controller))


route.patch('/updateImageUrl',verifyAccesToken,checkRole(['user']),controller.updateImageUrl.bind(controller))


route.get('/getAllNotification/:userId',verifyAccesToken,checkRole(['user']),controller.getAllNotification.bind(controller))

route.get('/checkConnectionStatus',verifyAccesToken,checkRole(['user']),controller.checkConnectionStatus.bind(controller))


route.patch('/unConnectUser',controller.onUnconnectUser.bind(controller))


route.post('/storePushNotification',controller.storePushNotification.bind(controller))

route.post('/UnsubscribeNotification',controller.UnsubscribeNotification.bind(controller))

route.post('/payment/order',controller.onPaymentOrder.bind(controller))

route.post('/payment/sucessfull',controller.onPaymentSuccesfull.bind(controller))

route.patch('/incrementSearchCount',controller.onChangeIncrementSearchCount.bind(controller))

route.get('/displayUserDetails/:id',controller.onDisplayUserDetails.bind(controller))

route.post('/hashPassword',controller.onHashPassword.bind(controller))


route.patch('/uploadUserProfileImage',controller.uploadUserProfileImage.bind(controller))

route.post('/deleteProfileImage',controller.onDeleteProfileImageUrl.bind(controller))

export { container }; // Exporting container as a named export

// Exporting route as default export
export default route;