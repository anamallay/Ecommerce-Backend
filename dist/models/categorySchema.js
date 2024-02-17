"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlenght: [2, "category name should be more than 2 characters "],
        maxlenght: [50, "category name should be less than 50 characters"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
}, { timestamps: true });
exports.category = (0, mongoose_1.model)('category', categorySchema);
