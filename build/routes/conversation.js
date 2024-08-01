"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationContainer = void 0;
var express_1 = __importDefault(require("express"));
var inversify_1 = require("inversify");
var conversationContainer = new inversify_1.Container();
exports.conversationContainer = conversationContainer;
var appConst_1 = require("../utils/appConst");
var conversationInteractor_1 = require("../interactors/user/conversationInteractor");
var conversationRepository_1 = require("../repositories/user/conversationRepository");
var conversationController_1 = require("../controllers/user/conversationController");
conversationContainer
    .bind(appConst_1.INTERFACE_TYPE.ConversationInteractor).to(conversationInteractor_1.conversationInteractor);
conversationContainer
    .bind(appConst_1.INTERFACE_TYPE.ConversationRepository).to(conversationRepository_1.conversationRepository);
conversationContainer.bind(appConst_1.INTERFACE_TYPE.ConversationController).to(conversationController_1.conversationController);
var controller = conversationContainer.get(appConst_1.INTERFACE_TYPE.ConversationController);
var route = express_1.default.Router();
var multer_1 = __importDefault(require("multer"));
var rba_1 = require("../services/rba");
var jwtService_1 = require("../services/jwtService");
var storage = multer_1.default.diskStorage({});
var upload = (0, multer_1.default)({ storage: storage });
route.post('/getSingleChat', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.chatRoom.bind(controller));
route.post('/createChatRoom', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.onCreateChatRoom.bind(controller));
route.get('/getAllConversation', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), controller.getAllConversastion.bind(controller));
route.post('/uploadChatPic', jwtService_1.verifyAccesToken, (0, rba_1.checkRole)(['user']), upload.single('image'), controller.onSaveChatImage.bind(controller));
route.post('/clearChat', controller.onClearChat.bind(controller));
// route.delete('/deleteMessages',controller.onDeleteAllMessages.bind(controller))
route.delete('/deleteSingleChat', controller.onDeleteSingleChat.bind(controller));
route.patch('/userTouserBlock', controller.OnuserTouserBlock.bind(controller));
route.patch('/userTouserUnblock', controller.OnuserTouserUnblock.bind(controller));
exports.default = route;
