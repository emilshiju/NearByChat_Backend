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
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationInteractor = void 0;
class conversationInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    IConversation(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RConversation(input);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ICreateChatRoom(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RCreateChatRoom(input);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IGetAllConversation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RGetAllConversation(userId);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IDeleteChat(selectedUserId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RDelteChat(selectedUserId, userId);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IDeleteSingleChat(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.RDeleteSingleChat(chatRoomId, userId);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IuserTouserBlock(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respone = yield this.repository.RuserTouserBlock(chatRoomId, userId);
                return respone;
            }
            catch (error) {
                throw error;
            }
        });
    }
    IuserTouserUnblock(chatRoomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respone = yield this.repository.RuserTouserUnblock(chatRoomId, userId);
                return respone;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.conversationInteractor = conversationInteractor;
