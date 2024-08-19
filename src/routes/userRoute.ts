import express from "express"

import { IUserRepository } from "../interfaces/user/IUserRepository";
import { UserRepository } from "../repositories/user/userRepository";
import { IUserInteractor } from "../interfaces/user/IUserInteractor";
import { UserInteractor } from "../interactors/user/userInteractor";
import { UserController } from "../controllers/user/userController";


import { verifyAccesToken } from "../services/jwtService";



import multer from 'multer';

const storage = multer.diskStorage({})

const upload = multer({storage:storage})


 const router=express.Router()


const userRepository: IUserRepository = new UserRepository();
const userInteractor: IUserInteractor = new UserInteractor(userRepository);
const controller = new UserController(userInteractor);

    
 
 router.post('/register',controller.onCreateUser.bind(controller))

 router.post('/refresh',controller.onRefreshToken.bind(controller))



router.post('/findUser',verifyAccesToken,controller.onFindUser.bind(controller))


router.get('/auth/google',controller.googleAuth.bind(controller))

router.get('/auth/google/callback',controller.googleAuthCallback.bind(controller))


router.post('/checkEmail',controller.findEmail.bind(controller))


router.post('/googleLogin',controller.googleLogin.bind(controller))


router.post('/login',controller.login.bind(controller))

router.post('/saveLocation',controller.saveLocation.bind(controller))










router.post('/uploadProfile',upload.single('image'),controller.uploadProfileUser.bind(controller))


router.get('/userStatus/:id',controller.userStatus.bind(controller))


router.get('/sendOtp',controller.sendOtp.bind(controller))

router.get('/verifyOtp',controller.verifyOtp.bind(controller))


router.put('/editUserDetails',controller.editUserDetails.bind(controller))



router.get('/getOrderSummary/:id',controller.onGetOrderSummary.bind(controller))

router.patch('/changePassword',controller.onChangePassword.bind(controller))



 export default router


