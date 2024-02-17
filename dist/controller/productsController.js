"use strict";
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
exports.getFilteredProducts = exports.updateSingleProduct = exports.createSingleProduct = exports.deleteSingleProduct = exports.getSingleProductBySlug = exports.getAllProducts = exports.getAllProductsWithPagination = void 0;
var slugify_1 = __importDefault(require("slugify"));
var productService_1 = require("../services/productService");
var productSchema_1 = __importDefault(require("../models/productSchema"));
var createHttpError_1 = require("../util/createHttpError");
require('dotenv').config();
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
var getAllProductsWithPagination = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, search, result, totalPages, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
                limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 4;
                search = typeof req.query.search === 'string' ? req.query.search : '';
                return [4 /*yield*/, (0, productService_1.getProductsWithPagination)(page.toString(), limit.toString(), search)];
            case 1:
                result = _a.sent();
                totalPages = Math.ceil(result.totalCount / limit);
                res.status(200).json({
                    message: 'Returns all products',
                    data: result.payload,
                    pagination: {
                        page: result.page,
                        limit: result.limit,
                        totalCount: result.totalCount,
                        totalPages: totalPages,
                    },
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllProductsWithPagination = getAllProductsWithPagination;
var getAllProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var search, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                search = typeof req.query.search === 'string' ? req.query.search : '';
                return [4 /*yield*/, (0, productService_1.getProducts)(search)];
            case 1:
                result = _a.sent();
                res.status(200).json({
                    message: 'Returns all products',
                    data: result.payload,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var getSingleProductBySlug = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, product, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                slug = req.params.slug;
                return [4 /*yield*/, (0, productService_1.getSingleProduct)(slug)];
            case 1:
                product = _a.sent();
                res.status(200).json({
                    message: 'Product found',
                    payload: product,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSingleProductBySlug = getSingleProductBySlug;
var deleteSingleProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, product, urlParts, fileName, publicId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                slug = req.params.slug;
                return [4 /*yield*/, productSchema_1.default.findOne({ slug: slug })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Product not found',
                        })];
                }
                if (!product.image) return [3 /*break*/, 3];
                urlParts = product.image.split('/');
                fileName = urlParts[urlParts.length - 1];
                publicId = fileName.split('.')[0];
                return [4 /*yield*/, cloudinary_1.v2.uploader.destroy("sda-product/".concat(publicId))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, productSchema_1.default.findByIdAndDelete(product._id)];
            case 4:
                _a.sent();
                res.status(200).json({
                    message: 'Product deleted successfully',
                });
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteSingleProduct = deleteSingleProduct;
var createSingleProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productInput, response, product, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                productInput = {
                    title: req.body.title,
                    slug: (0, slugify_1.default)(req.body.title),
                    price: req.body.price,
                    description: req.body.description,
                    category: req.body.category,
                    quantity: req.body.quantity,
                    sold: req.body.sold,
                    shipping: req.body.shipping,
                    image: 'default-image-path',
                };
                if (!req.file) return [3 /*break*/, 2];
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(req.file.path, {
                        folder: 'sda-product',
                    })];
            case 1:
                response = _a.sent();
                productInput.image = response.secure_url;
                _a.label = 2;
            case 2: return [4 /*yield*/, (0, productService_1.createProduct)(productInput)];
            case 3:
                product = _a.sent();
                res.status(201).json({
                    message: 'Product created',
                    payload: product,
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createSingleProduct = createSingleProduct;
var updateSingleProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, data, oldImagePublicId, existingProduct, urlParts, uploadResponse, updatedProduct, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                slug = req.params.slug;
                data = req.body;
                oldImagePublicId = null;
                return [4 /*yield*/, productSchema_1.default.findOne({ slug: slug })];
            case 1:
                existingProduct = _a.sent();
                if (!existingProduct) {
                    throw (0, createHttpError_1.createHttpError)(404, "Product with slug ".concat(slug, " does not exist"));
                }
                if (existingProduct.image) {
                    urlParts = existingProduct.image.split('/');
                    oldImagePublicId = urlParts[urlParts.length - 1].split('.')[0].split('v')[1];
                }
                if (!req.file) return [3 /*break*/, 4];
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(req.file.path, {
                        folder: 'sda-product',
                    })];
            case 2:
                uploadResponse = _a.sent();
                data.image = uploadResponse.secure_url;
                if (!oldImagePublicId) return [3 /*break*/, 4];
                return [4 /*yield*/, cloudinary_1.v2.uploader.destroy(oldImagePublicId)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, (0, productService_1.updateProduct)(slug, data)];
            case 5:
                updatedProduct = _a.sent();
                res.status(200).json({
                    message: 'Update product by slug successfully',
                    payload: updatedProduct,
                });
                return [3 /*break*/, 7];
            case 6:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateSingleProduct = updateSingleProduct;
var getFilteredProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, priceRangeMin, priceRangeMax, filter, products, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, category = _a.category, priceRangeMin = _a.priceRangeMin, priceRangeMax = _a.priceRangeMax;
                filter = {};
                if (category) {
                    filter.category = category;
                }
                if (priceRangeMin && priceRangeMax) {
                    filter.price = { $gte: Number(priceRangeMin), $lte: Number(priceRangeMax) };
                }
                return [4 /*yield*/, productSchema_1.default.find(filter)];
            case 1:
                products = _b.sent();
                res.status(200).json({
                    message: 'Returns filtered products',
                    payload: products,
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFilteredProducts = getFilteredProducts;
