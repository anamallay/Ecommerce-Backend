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
exports.deleteOrderById = exports.updateOrderStatus = exports.handleBraintreePayment = exports.generateBraintreeClientToken = exports.getOrderByUser = exports.getOrderById = exports.getAllOrders = exports.processPayment = void 0;
var mongoose = __importStar(require("mongoose"));
var orderSchema_1 = require("../models/orderSchema");
var orderService_1 = require("../services/orderService");
var createHttpError_1 = require("../util/createHttpError");
var braintree_1 = require("../config/braintree");
var productSchema_1 = __importDefault(require("../models/productSchema"));
var processPayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartItems, products, payment, newOrder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartItems = req.body.cartItems;
                products = cartItems.products, payment = cartItems.payment;
                newOrder = new orderSchema_1.Order({
                    products: products.map(function (item) { return ({
                        product: item.product,
                        quantity: item.quantity,
                    }); }),
                    payment: payment,
                    buyer: req.userId,
                });
                return [4 /*yield*/, newOrder.save()];
            case 1:
                _a.sent();
                res.send({
                    message: 'Payment was successful and order was created',
                    payload: newOrder,
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
exports.processPayment = processPayment;
var getAllOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, orderService_1.getOrders)()];
            case 1:
                orders = _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'Orders fetched successfully',
                    payload: orders,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, next(error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrders = getAllOrders;
var getOrderById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, newOrder, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, orderService_1.findOrder)(id)];
            case 1:
                newOrder = _a.sent();
                res.status(200).json({ message: 'Get Order Successfully!', payload: newOrder });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3 instanceof mongoose.Error.CastError) {
                    (0, createHttpError_1.createHttpError)(400, 'id format not valid');
                }
                else {
                    return [2 /*return*/, next(error_3)];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrderById = getOrderById;
var getOrderByUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, orderSchema_1.Order.find({ buyer: userId })
                        .populate({
                        path: 'products',
                        populate: {
                            path: 'product',
                            select: 'title price',
                        },
                    })
                        .populate('buyer', 'first_name last_name')];
            case 1:
                orders = _a.sent();
                res.status(200).json({ message: 'Get Order Successfully!', payload: orders });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (error_4 instanceof mongoose.Error.CastError) {
                    (0, createHttpError_1.createHttpError)(400, 'id format not valid');
                }
                else {
                    return [2 /*return*/, next(error_4)];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrderByUser = getOrderByUser;
var generateBraintreeClientToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var braintreeClientToken, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, braintree_1.gateway.clientToken.generate({})];
            case 1:
                braintreeClientToken = _a.sent();
                if (!braintreeClientToken) {
                    throw (0, createHttpError_1.createHttpError)(400, 'Braintree client token was not generated');
                }
                res.status(200).json({
                    message: 'Braintree token generated successfully!',
                    payload: braintreeClientToken.clientToken,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, next(error_5)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.generateBraintreeClientToken = generateBraintreeClientToken;
var handleBraintreePayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nonce, cartItems, amount, result, newOrder, bulkOps, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, nonce = _a.nonce, cartItems = _a.cartItems, amount = _a.amount;
                console.log(req.body);
                return [4 /*yield*/, braintree_1.gateway.transaction.sale({
                        amount: amount,
                        paymentMethodNonce: nonce,
                        options: {
                            submitForSettlement: true,
                        },
                    })];
            case 1:
                result = _b.sent();
                console.log('Payment process result:', result.success);
                if (!result.success) return [3 /*break*/, 4];
                console.log('Transaction ID: ' + result.transaction.id);
                newOrder = new orderSchema_1.Order({
                    products: cartItems.map(function (item) { return ({
                        product: item,
                        quantity: item.quantity,
                    }); }),
                    payment: {
                        method: 'card credit',
                        amount: amount,
                    },
                    buyer: req.userId,
                    // status: 'Processing',
                });
                return [4 /*yield*/, newOrder.save()
                    // update the sold value for the products
                ];
            case 2:
                _b.sent();
                bulkOps = cartItems.map(function (product) {
                    return {
                        updateOne: {
                            filter: { _id: product._id },
                            update: { $inc: { sold: product.quantity } },
                        },
                    };
                });
                return [4 /*yield*/, productSchema_1.default.bulkWrite(bulkOps)];
            case 3:
                _b.sent();
                res.status(201).json({
                    message: 'Order was successfully!',
                });
                return [3 /*break*/, 5];
            case 4:
                console.error(result.message);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_6 = _b.sent();
                console.error('Error processing payment:', error_6);
                return [2 /*return*/, next(error_6)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.handleBraintreePayment = handleBraintreePayment;
var updateOrderStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, status, validStatuses, updatedOrder, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.orderId;
                status = req.body.status;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                validStatuses = ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
                if (!validStatuses.includes(status)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid status value' })];
                }
                return [4 /*yield*/, orderSchema_1.Order.findByIdAndUpdate(orderId, { status: status }, { new: true })];
            case 2:
                updatedOrder = _a.sent();
                if (!updatedOrder) {
                    return [2 /*return*/, res.status(404).json({ message: 'Order not found' })];
                }
                res.status(200).json({
                    message: 'Order status updated successfully',
                    order: updatedOrder,
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error('Error updating order status:', error_7);
                return [2 /*return*/, next(error_7)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderStatus = updateOrderStatus;
var deleteOrderById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, deletedOrder, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = req.params.orderId;
                return [4 /*yield*/, orderSchema_1.Order.findByIdAndDelete(orderId)];
            case 1:
                deletedOrder = _a.sent();
                if (!deletedOrder) {
                    return [2 /*return*/, res.status(404).json({ message: 'Order not found' })];
                }
                res.status(200).json({ message: 'Order deleted successfully', payload: deletedOrder });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                return [2 /*return*/, next(error_8)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteOrderById = deleteOrderById;
