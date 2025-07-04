"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const conversation_1 = require("../../entities/conversation");
dotenv_1.default.config();
class conversationController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    chatRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { receiverId, userId } = req.body;
                const inputs = new conversation_1.Conversation([receiverId, userId]);
                const response = yield this.interactor.IConversation(inputs);
                if (response && response.allChat) {
                    return res.json({ chat: response.allChat, profile: response.profile, chatroom: response.chatroom });
                }
                else {
                    if (response)
                        return res.json({ profile: response });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    onCreateChatRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { receiverId, userId } = req.body;
                const input = new conversation_1.Conversation([receiverId, userId]);
                const response = yield this.interactor.ICreateChatRoom(input);
                return res.json({ response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllConversastion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const response = yield this.interactor.IGetAllConversation(userId);
                return res.json({ allChat: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    onSaveChatImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    const result = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                        folder: '/nearbychat'
                    });
                    if (result) {
                        return res.json({ status: true, result });
                    }
                    return res.json({ status: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    onClearChat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { selectedUserId, userId } = req.body;
                const response = yield this.interactor.IDeleteChat(selectedUserId, userId);
            }
            catch (error) {
                next(error);
            }
        });
    }
    onDeleteSingleChat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chatRoomId, userId } = req.body;
                const response = yield this.interactor.IDeleteSingleChat(chatRoomId, userId);
                if (response) {
                    return res.json({ status: true });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    OnuserTouserBlock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chatRoomId, userId } = req.body;
                const response = yield this.interactor.IuserTouserBlock(chatRoomId, userId);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    OnuserTouserUnblock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chatRoomId, userId } = req.body;
                const response = yield this.interactor.IuserTouserUnblock(chatRoomId, userId);
                return res.json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.conversationController = conversationController;
