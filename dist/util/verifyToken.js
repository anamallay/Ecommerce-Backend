"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var verifyToken = function (token) {
    return jsonwebtoken_1.default.verify(token, config_1.dev.app.jwtUserActivationKey);
};
exports.verifyToken = verifyToken;
