"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSubscription = void 0;
var searchSubscription = /** @class */ (function () {
    function searchSubscription(name, maxCount, price, timePeriod, description, imageUrl) {
        this.name = name;
        this.maxCount = maxCount;
        this.price = price;
        this.timePeriod = timePeriod;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    return searchSubscription;
}());
exports.searchSubscription = searchSubscription;
