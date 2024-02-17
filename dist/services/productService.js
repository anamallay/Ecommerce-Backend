"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getSingleProduct = exports.getProducts = exports.getProductsWithPagination = void 0;
var slugify_1 = __importDefault(require("slugify"));
// import fs from 'fs'
// import path from 'path'
var productSchema_1 = __importDefault(require("../models/productSchema"));
var createHttpError_1 = require("../util/createHttpError");
var ImageHelper_1 = require("../helper/ImageHelper");
var getProductsWithPagination = function (pageParam, limitParam, search) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, totalCount, totalPages, searchRegExp, filter, skip, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = Number(pageParam) || 1;
                limit = Number(limitParam) || 10;
                return [4 /*yield*/, productSchema_1.default.countDocuments()];
            case 1:
                totalCount = _a.sent();
                totalPages = Math.ceil(totalCount / limit);
                searchRegExp = new RegExp('.*' + search + '.*', 'i');
                filter = {
                    $or: [
                        { title: { $regex: searchRegExp } },
                        { description: { $regex: searchRegExp } }, //*Corrected from $regax to $regex
                    ],
                };
                if (page > totalPages) {
                    page = totalPages > 0 ? totalPages : 1;
                }
                skip = (page - 1) * limit;
                return [4 /*yield*/, productSchema_1.default.find(filter).populate('category').skip(skip).limit(limit)
                    // .sort({ price: 1})
                ];
            case 2:
                payload = _a.sent();
                // .sort({ price: 1})
                return [2 /*return*/, {
                        payload: payload,
                        page: page,
                        limit: limit,
                        totalCount: totalCount,
                    }];
        }
    });
}); };
exports.getProductsWithPagination = getProductsWithPagination;
var getProducts = function (search) { return __awaiter(void 0, void 0, void 0, function () {
    var searchRegExp, filter, payload, totalCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchRegExp = new RegExp('.*' + search + '.*', 'i');
                filter = search
                    ? {
                        $or: [{ title: { $regex: searchRegExp } }, { description: { $regex: searchRegExp } }],
                    }
                    : {} // Simplified to handle an empty search string.
                ;
                return [4 /*yield*/, productSchema_1.default.find(filter).populate('category')]; // Removed skip and limit.
            case 1:
                payload = _a.sent() // Removed skip and limit.
                ;
                totalCount = payload.length // If you still need the total count of the matched documents.
                ;
                return [2 /*return*/, {
                        payload: payload,
                        totalCount: totalCount,
                    }];
        }
    });
}); };
exports.getProducts = getProducts;
var getSingleProduct = function (slug) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.findOne({ slug: slug })];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw (0, createHttpError_1.createHttpError)(404, 'Product not found!!');
                }
                return [2 /*return*/, product];
        }
    });
}); };
exports.getSingleProduct = getSingleProduct;
var deleteProduct = function (slug) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productSchema_1.default.findOneAndDelete({
                    slug: slug,
                })];
            case 1:
                deletedProduct = _a.sent();
                if (!deletedProduct) {
                    throw (0, createHttpError_1.createHttpError)(404, 'Product not found!');
                }
                if (deletedProduct && deletedProduct.image) {
                    (0, ImageHelper_1.deleteImage)(deletedProduct.image);
                }
                return [2 /*return*/, deletedProduct];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var createProduct = function (productInput) { return __awaiter(void 0, void 0, void 0, function () {
    var title, price, description, category, quantity, sold, shipping, _a, image, productExist, newProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                title = productInput.title, price = productInput.price, description = productInput.description, category = productInput.category, quantity = productInput.quantity, sold = productInput.sold, shipping = productInput.shipping, _a = productInput.image, image = _a === void 0 ? undefined : _a;
                return [4 /*yield*/, productSchema_1.default.exists({ title: title })];
            case 1:
                productExist = _b.sent();
                if (productExist) {
                    throw (0, createHttpError_1.createHttpError)(404, 'Product already exists');
                }
                newProduct = new productSchema_1.default(__assign(__assign({ title: title, slug: (0, slugify_1.default)(title), price: price }, (image && { image: image })), { description: description, quantity: quantity, category: category, sold: sold, shipping: shipping }));
                return [2 /*return*/, newProduct.save()];
        }
    });
}); };
exports.createProduct = createProduct;
var updateProduct = function (slug, productData) { return __awaiter(void 0, void 0, void 0, function () {
    var title, existingProduct, isTitleExist, updatedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = productData.title;
                return [4 /*yield*/, productSchema_1.default.findOne({ slug: slug })];
            case 1:
                existingProduct = _a.sent();
                if (!existingProduct) {
                    throw (0, createHttpError_1.createHttpError)(404, "Product with slug ".concat(slug, " does not exist"));
                }
                if (!title) return [3 /*break*/, 3];
                return [4 /*yield*/, productSchema_1.default.findOne({ title: title, _id: { $ne: existingProduct._id } })];
            case 2:
                isTitleExist = _a.sent();
                if (isTitleExist) {
                    throw (0, createHttpError_1.createHttpError)(409, "Product with title ".concat(title, " already exists"));
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, productSchema_1.default.findOneAndUpdate({ slug: slug }, __assign(__assign({}, productData), { slug: title && typeof title === 'string' ? (0, slugify_1.default)(title, { lower: true }) : slug }), { new: true })];
            case 4:
                updatedProduct = _a.sent();
                return [2 /*return*/, updatedProduct];
        }
    });
}); };
exports.updateProduct = updateProduct;
