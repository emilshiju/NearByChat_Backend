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
exports.socketHandeler = void 0;
const appConst_1 = require("../../utils/appConst");
const inversify_1 = require("inversify");
// import { IPofileRepository } from "../../interfaces/user/profile/IProfileRepository";
const container = new inversify_1.Container();
const repo = container.get(appConst_1.INTERFACE_TYPE.ProfileRepository);
class socketHandeler {
    constructor(profileRepository) {
        this.repository = profileRepository;
    }
    acceptedRequest(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.socketHandeler = socketHandeler;
