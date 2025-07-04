"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    return res.status(500).json({ error: err });
};
exports.default = errorHandler;
