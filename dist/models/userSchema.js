"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config");
var userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "user's first name must be at least 2 characters"],
        maxlength: [50, "user's first name must be at most 50 characters"],
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "user's last name must be at least 2 characters"],
        maxlength: [50, "user's last name must be at most 50 characters"],
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Please enter a valid email address',
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'password must be at least 6 characters'],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
        minlength: [3, 'address must be at least 3 characters'],
    },
    image: {
        type: String,
        default: config_1.dev.app.defaultProductImage,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    order: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
