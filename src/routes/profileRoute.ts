import express from "express"

import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";

import { ProfileInteractor } from "../interactors/user/profileInteractor";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { ProfileRepository } from "../repositories/user/profileRepository";
import { profileController } from "../controllers/user/profileController";
import { verifyAccesToken } from "../services/jwtService";
import { checkRole } from "../services/rba";




const route=express.Router()




const profileRepository: IPofileRepository = new ProfileRepository();
const profileInteractor: IProfileInteractor = new ProfileInteractor(profileRepository);
const controller: profileController = new profileController(profileInteractor);



route.post('/submitProfile',verifyAccesToken,checkRole(['user']),controller.onSubmitProfile.bind(controller))


route.get('/getProfile/:userId',verifyAccesToken,checkRole(['user']),controller.getProfileUrl.bind(controller))


route.patch('/updateImageUrl',verifyAccesToken,checkRole(['user']),controller.updateImageUrl.bind(controller))


route.get('/getAllNotification/:userId',verifyAccesToken,checkRole(['user']),controller.getAllNotification.bind(controller))

route.get('/checkConnectionStatus',verifyAccesToken,checkRole(['user']),controller.checkConnectionStatus.bind(controller))





route.post('/storePushNotification',controller.storePushNotification.bind(controller))

route.post('/UnsubscribeNotification',controller.UnsubscribeNotification.bind(controller))

route.post('/payment/order',controller.onPaymentOrder.bind(controller))

route.post('/payment/sucessfull',controller.onPaymentSuccesfull.bind(controller))

route.patch('/incrementSearchCount',controller.onChangeIncrementSearchCount.bind(controller))

route.get('/displayUserDetails/:id',controller.onDisplayUserDetails.bind(controller))

route.post('/hashPassword',controller.onHashPassword.bind(controller))


route.patch('/uploadUserProfileImage',controller.uploadUserProfileImage.bind(controller))

route.post('/deleteProfileImage',controller.onDeleteProfileImageUrl.bind(controller))


export default route;