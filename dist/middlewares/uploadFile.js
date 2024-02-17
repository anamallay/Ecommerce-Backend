"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUser = exports.uploadProduct = void 0;
var multer_1 = __importDefault(require("multer"));
var productStorge = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
var userStorge = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    var allowedTpes = ['image/jpeg', 'image/png', 'image/png'];
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('File is not an image'));
    }
    if (!allowedTpes.includes(file.mimetype)) {
        return cb(new Error('Image type not allowed'));
    }
    cb(null, true);
};
exports.uploadProduct = (0, multer_1.default)({
    storage: productStorge,
    // limits: {fileSize: 1024 * 1024 * 1},
    fileFilter: fileFilter,
});
exports.uploadUser = (0, multer_1.default)({
    storage: userStorge,
    fileFilter: fileFilter,
});
