import express from "express"


import {  conversationInteractor } from "../interactors/user/conversationInteractor";

import { conversationRepository } from "../repositories/user/conversationRepository";
import {  conversationController } from "../controllers/user/conversationController";


const route=express.Router()

const Repository = new  conversationRepository()
const Interactor = new conversationInteractor(Repository);
const controller = new conversationController(Interactor);




import multer from 'multer';
import { checkRole } from "../services/rba";
import { verifyAccesToken } from "../services/jwtService";


const storage = multer.diskStorage({})

const upload = multer({storage:storage})



route.post('/getSingleChat',verifyAccesToken,checkRole(['user']),controller.chatRoom.bind(controller))

route.post('/createChatRoom',verifyAccesToken,checkRole(['user']),controller.onCreateChatRoom.bind(controller))

route.get('/getAllConversation',verifyAccesToken,checkRole(['user']),controller.getAllConversastion.bind(controller))

route.post('/uploadChatPic',verifyAccesToken,checkRole(['user']),upload.single('image'),controller.onSaveChatImage.bind(controller))

route.post('/clearChat',controller.onClearChat.bind(controller))



route.delete('/deleteSingleChat',controller.onDeleteSingleChat.bind(controller))

route.patch('/userTouserBlock',controller.OnuserTouserBlock.bind(controller))

route.patch('/userTouserUnblock',controller.OnuserTouserUnblock.bind(controller))


export default route











