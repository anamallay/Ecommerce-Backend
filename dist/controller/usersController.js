"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.updateSingleUser = exports.deleteUser = exports.unbanUser = exports.banUser = exports.activeUser = exports.registerUser = exports.getSingleUser = exports.getAllUsers = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema_1 = __importDefault(require("../models/userSchema"));
var jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
var userService_1 = require("../services/userService");
var sendEmail_1 = require("../helper/sendEmail");
var createHttpError_1 = require("../util/createHttpError");
var ImageHelper_1 = require("../helper/ImageHelper");
var config_1 = require("../config");
require('dotenv').config();
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, search, _a, payload, currentPage, currentLimit, totalCount, totalPages, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                page = Number(req.query.page) || 1;
                limit = Number(req.query.limit) || 10;
                search = req.query.search ? String(req.query.search) : '';
                return [4 /*yield*/, (0, userService_1.getUsers)(page, limit, search)];
            case 1:
                _a = _b.sent(), payload = _a.payload, currentPage = _a.page, currentLimit = _a.limit, totalCount = _a.totalCount, totalPages = _a.totalPages;
                res.status(200).json({
                    success: true,
                    payload: payload,
                    pageInfo: {
                        currentPage: currentPage,
                        currentLimit: currentLimit,
                        totalCount: totalCount,
                        totalPages: totalPages,
                    },
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getSingleUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userService_1.findUser)(req.params.id)];
            case 1:
                user = _a.sent();
                res.status(200).json({ message: 'User retrieved successfully', payload: user });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSingleUser = getSingleUser;
var registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, email, password, address, phone, isAdmin, image, imagePath, hashedPassword, tokenpayload, isUserExists, token, emailData, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, password = _a.password, address = _a.address, phone = _a.phone, isAdmin = _a.isAdmin;
                image = req.file;
                imagePath = image === null || image === void 0 ? void 0 : image.path;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                tokenpayload = {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    address: address,
                    phone: phone,
                    isAdmin: isAdmin,
                };
                if (imagePath) {
                    tokenpayload.image = imagePath;
                }
                return [4 /*yield*/, userSchema_1.default.exists({ email: email })];
            case 2:
                isUserExists = _b.sent();
                if (isUserExists) {
                    return [2 /*return*/, next((0, createHttpError_1.createHttpError)(409, 'User already exists'))];
                }
                token = jsonwebtoken_1.default.sign(tokenpayload, config_1.dev.app.jwtUserActivationKey, {
                    expiresIn: '1h',
                });
                emailData = {
                    email: email,
                    subject: 'Activate your account',
                    html: "\n    <h1>Welcome to Our Service</h1>\n    <p>Please click on the link below to activate your account:</p>\n    <a href=\"http://localhost:3000/users/activate-account/".concat(token, "\">Activate Account</a>\n    <p>Thank you for joining us!</p>"),
                };
                return [4 /*yield*/, (0, sendEmail_1.handleSendEmail)(emailData)];
            case 3:
                _b.sent();
                res.status(200).json({
                    message: 'Check your email to activate your account',
                    token: token,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var activeUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, imageUrl, response, error_4, errorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                token = req.params.token;
                console.log('token:', token);
                if (!token) {
                    return [2 /*return*/, next((0, createHttpError_1.createHttpError)(404, 'Please provide a token'))];
                }
                decoded = jsonwebtoken_1.default.verify(token, config_1.dev.app.jwtUserActivationKey);
                if (!decoded) {
                    throw (0, createHttpError_1.createHttpError)(401, 'Invalid token');
                }
                imageUrl = 'default-image-path';
                if (!decoded.image) return [3 /*break*/, 2];
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(decoded.image, {
                        folder: 'sda-user',
                    })];
            case 1:
                response = _a.sent();
                imageUrl = response.secure_url;
                _a.label = 2;
            case 2:
                decoded.image = imageUrl;
                return [4 /*yield*/, userSchema_1.default.create(decoded)];
            case 3:
                _a.sent();
                res.status(201).json({ message: 'User is registered successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                if (error_4 instanceof jsonwebtoken_1.TokenExpiredError || error_4 instanceof jsonwebtoken_1.JsonWebTokenError) {
                    errorMessage = error_4 instanceof jsonwebtoken_1.TokenExpiredError ? 'Your token has expired' : 'Invalid token';
                    next((0, createHttpError_1.createHttpError)(401, errorMessage));
                }
                else {
                    next(error_4);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.activeUser = activeUser;
var banUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userService_1.banUserById)(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json({
                    message: 'User successfully banned',
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.banUser = banUser;
var unbanUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userService_1.unbanUserById)(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json({
                    message: 'User successfully unbanned',
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unbanUser = unbanUser;
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, imageUrl, parts, publicId, error_7, formatError;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userService_1.deleteUserById)(req.params.id)];
            case 1:
                user = _a.sent();
                if (user && user.image && user.image !== 'default-image-path') {
                    imageUrl = user.image;
                    parts = imageUrl.split('/');
                    publicId = parts[parts.length - 1].split('.')[0] // Extracting public ID assuming format "vXXXXXX/folder/filename.jpg"
                    ;
                    cloudinary_1.v2.uploader.destroy(publicId, function (error, result) {
                        if (error) {
                            console.log('Cloudinary deletion error:', error);
                        }
                        else {
                            console.log('Cloudinary deletion result:', result);
                        }
                    });
                }
                res.status(204).json({
                    message: 'User deleted successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                if (error_7 instanceof mongoose_1.default.Error.CastError) {
                    formatError = (0, createHttpError_1.createHttpError)(400, 'Id format is not valid');
                    next(formatError);
                }
                else {
                    console.error(error_7);
                    next((0, createHttpError_1.createHttpError)(500, 'Internal Server Error'));
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var updateSingleUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, params, id, img, updatedUser, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                body = req.body, params = req.params;
                id = params.id;
                img = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                if (!img) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, ImageHelper_1.replaceImageUser)(req.file, id, body)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2: return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ _id: id }, body, { new: true })];
            case 3:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.status(200).json({
                    message: 'Update user successfully',
                    payload: updatedUser,
                });
                return [3 /*break*/, 5];
            case 4:
                error_8 = _b.sent();
                next(error_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateSingleUser = updateSingleUser;
var forgetPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, activationLink, emailData, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = req.body.email;
                if (!email) {
                    throw (0, createHttpError_1.createHttpError)(400, 'Email is required');
                }
                return [4 /*yield*/, userSchema_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw (0, createHttpError_1.createHttpError)(409, 'User does not exist please register');
                }
                token = jsonwebtoken_1.default.sign({ email: email }, config_1.dev.app.jwtresetPassword, { expiresIn: '20m' });
                activationLink = "http://localhost:3000/resetpassword/".concat(token);
                emailData = {
                    email: email,
                    subject: 'Password Reset Instructions',
                    html: "\n      <h1>Hello ".concat(user.first_name, "</h1>\n        <h1>Password Reset Requested</h1>\n        <p>If you requested a password reset, click on the link below to set a new password:</p>\n        <a href=\"").concat(activationLink, "\">Reset Password</a>\n        <p>If you did not request a password reset, please ignore this email.</p>"),
                };
                return [4 /*yield*/, (0, sendEmail_1.handleSendEmail)(emailData)];
            case 2:
                _a.sent();
                res.status(200).json({
                    message: 'please check your email to reset your password',
                    payload: token,
                });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                next(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.forgetPassword = forgetPassword;
var resetPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, decoded, updatedUser, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, token = _a.token, password = _a.password;
                decoded = jsonwebtoken_1.default.verify(token, config_1.dev.app.jwtresetPassword);
                if (!decoded) {
                    throw (0, createHttpError_1.createHttpError)(400, 'Invalid token');
                }
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ email: decoded.email }, { $set: { password: bcrypt_1.default.hashSync(password, 10) } }, { new: true })];
            case 1:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    throw (0, createHttpError_1.createHttpError)(400, 'Invalid token');
                }
                res.status(200).json({
                    message: 'Reset Password successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _b.sent();
                next(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
