"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidation = void 0;
var express_validator_1 = require("express-validator");
var runValidation = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        var errorsList = errors.array().map(function (error) { return error.msg; });
        return res.status(422).send({ message: errorsList[0], });
    }
    next();
};
exports.runValidation = runValidation;
