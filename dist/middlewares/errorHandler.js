"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    return res.status(error.status || 500).json({
        massage: error.message,
    });
};
exports.errorHandler = errorHandler;
