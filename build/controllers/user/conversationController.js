"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationController = void 0;
var inversify_1 = require("inversify");
var appConst_1 = require("../../utils/appConst");
var dotenv_1 = __importDefault(require("dotenv"));
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var conversation_1 = require("../../entities/conversation");
dotenv_1.default.config();
var conversationController = /** @class */ (function () {
    function conversationController(interactor) {
        this.interactor = interactor;
    }
    conversationController.prototype.chatRoom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, receiverId, userId, inputs, response, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log("chat rommmmmmmmmmmm chat rommmmm chat rommmmmmmmmmmmmmmm chat rom mmmmmmmmmmmmmmmmmmmmmmmmm");
                        _a = req.body, receiverId = _a.receiverId, userId = _a.userId;
                        inputs = new conversation_1.Conversation([receiverId, userId]);
                        return [4 /*yield*/, this.interactor.IConversation(inputs)];
                    case 1:
                        response = _b.sent();
                        console.log("kkkkkk       7777      kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                        console.log(response.chatroom);
                        if (response && response.allChat) {
                            return [2 /*return*/, res.json({ chat: response.allChat, profile: response.profile, chatroom: response.chatroom })];
                        }
                        else {
                            if (response)
                                return [2 /*return*/, res.json({ profile: response })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    conversationController.prototype.onCreateChatRoom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, receiverId, userId, input, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, receiverId = _a.receiverId, userId = _a.userId;
                        input = new conversation_1.Conversation([receiverId, userId]);
                        return [4 /*yield*/, this.interactor.ICreateChatRoom(input)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ response: response })];
                }
            });
        });
    };
    conversationController.prototype.getAllConversastion = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.query.userId;
                        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeee  232323232323");
                        console.log(userId);
                        return [4 /*yield*/, this.interactor.IGetAllConversation(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json({ allChat: response })];
                }
            });
        });
    };
    conversationController.prototype.onSaveChatImage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("etiiiiiiiiiiiiiiiiiiiiiiiiiiiii poyeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(req.file);
                        if (!req.file) return [3 /*break*/, 2];
                        console.log("keriiiiiiiiiiiiiii");
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(req.file.path, {
                                folder: '/nearbychat'
                            })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            return [2 /*return*/, res.json({ status: true, result: result })];
                        }
                        return [2 /*return*/, res.json({ status: false })];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    conversationController.prototype.onClearChat = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedUserId, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("kkkk vanuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
                        _a = req.body, selectedUserId = _a.selectedUserId, userId = _a.userId;
                        console.log("delteddddddddddddddddddddddddddddddddddddddddddddddddddddddd  userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
                        console.log(selectedUserId);
                        return [4 /*yield*/, this.interactor.IDeleteChat(selectedUserId, userId)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // async onDeleteAllMessages(req:Request,res:Response,next:NextFunction){
    //     const { messagesId }=req.body
    //     console.log("messsssssssss ")
    //     console.log(messagesId)
    //     const response=await this.interactor.IDeleteAllMessages(messagesId)
    //     return res.status(200).json({status:true})
    // }
    conversationController.prototype.onDeleteSingleChat = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, chatRoomId, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, chatRoomId = _a.chatRoomId, userId = _a.userId;
                        console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                        console.log(chatRoomId, userId);
                        return [4 /*yield*/, this.interactor.IDeleteSingleChat(chatRoomId, userId)];
                    case 1:
                        response = _b.sent();
                        if (response) {
                            return [2 /*return*/, res.json({ status: true })];
                        }
                        console.log("errrrrrrrrrrrrrorrrrrrrrrrrrrrrrrrrr");
                        return [2 /*return*/];
                }
            });
        });
    };
    conversationController.prototype.OnuserTouserBlock = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, chatRoomId, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, chatRoomId = _a.chatRoomId, userId = _a.userId;
                        console.log(req.body);
                        console.log("user to user block vanuu   chatRoomId userId chatroomid chatroomid userid userid userid");
                        console.log(userId, chatRoomId);
                        return [4 /*yield*/, this.interactor.IuserTouserBlock(chatRoomId, userId)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    conversationController.prototype.OnuserTouserUnblock = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, chatRoomId, userId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("sencd vanu second vanu second vanu");
                        _a = req.body, chatRoomId = _a.chatRoomId, userId = _a.userId;
                        return [4 /*yield*/, this.interactor.IuserTouserUnblock(chatRoomId, userId)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json({ data: response })];
                }
            });
        });
    };
    conversationController = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(appConst_1.INTERFACE_TYPE.ConversationInteractor)),
        __metadata("design:paramtypes", [Object])
    ], conversationController);
    return conversationController;
}());
exports.conversationController = conversationController;
