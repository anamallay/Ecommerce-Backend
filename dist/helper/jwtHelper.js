"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJSONWebToken = exports.createJSONWebToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJSONWebToken = function (tokenpayload, secretKey, expiresIn) {
    //     if (!tokenpayload) {
    //       throw Error('tokenpayload must be an object')
    //   }
    var token = jsonwebtoken_1.default.sign(tokenpayload, secretKey, {
        expiresIn: expiresIn,
    });
    return token;
};
exports.createJSONWebToken = createJSONWebToken;
var verifyJSONWebToken = function (token, secretKey) {
    //   const token = jwt.verify()
    //   return token
};
exports.verifyJSONWebToken = verifyJSONWebToken;
