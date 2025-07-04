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
exports.locationRepository = void 0;
const userLocation_1 = __importDefault(require("../../frameWorks/mongodb/models/userLocation"));
class locationRepository {
    saveLocation(data, userId, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkUserLocation = yield userLocation_1.default.find({ userId: userId });
                yield userLocation_1.default.findOneAndUpdate({ userId: userId }, {
                    $set: {
                        "location.type": "Point", // Set GeoJSON type
                        "location.coordinates": [data.longitude, data.latitude],
                        radius: radius,
                    },
                }, { upsert: true, new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.locationRepository = locationRepository;
