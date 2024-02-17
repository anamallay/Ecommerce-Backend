"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var myLogger = function (req, res, next) {
    var filePath = './src/logs/requests.txt';
    var currentDate = new Date();
    var date = currentDate.toLocaleDateString();
    var time = currentDate.toLocaleTimeString();
    var msg = "Method: ".concat(req.method, ", Path: ").concat(req.path, ", Date: ").concat(date, ", Time: ").concat(time, "\n");
    fs_1.default.appendFile(filePath, msg, function (err) {
        if (err) {
            return next(new Error('FAILED TO LOG'));
        }
        next();
    });
};
exports.default = myLogger;
