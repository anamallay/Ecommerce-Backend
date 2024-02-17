"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpError = void 0;
var createHttpError = function (status, message) {
    var error = new Error();
    error.message = message;
    error.status = status;
    return error;
};
exports.createHttpError = createHttpError;
