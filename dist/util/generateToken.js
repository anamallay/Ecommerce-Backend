"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var generateToken = function (tokenPayload) {
    return jsonwebtoken_1.default.sign(tokenPayload, config_1.dev.app.jwtUserActivationKey, { expiresIn: '30m' });
};
exports.generateToken = generateToken;
