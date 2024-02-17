"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true, trim: true },
        },
    ],
    payment: { type: Object, required: true },
    buyer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['Not processed', 'Processing', 'shipped', 'delivered', 'cancelled'],
        default: 'Not processed',
    },
}, { timestamps: true });
// orderSchema.path('products').validate(function (value: IProduct['slug'][]) {
//   return value.length >= 1
// }, 'Must have at least one product')
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
