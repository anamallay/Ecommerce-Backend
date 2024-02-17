import { Schema, model } from 'mongoose'
import { IOrder } from '../types/orderType'

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, trim: true },
      },
    ],
    payment: { type: Object, required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['Not processed', 'Processing', 'shipped', 'delivered', 'cancelled'],
      default: 'Not processed',
    },
  },
  { timestamps: true }
)

// orderSchema.path('products').validate(function (value: IProduct['slug'][]) {
//   return value.length >= 1
// }, 'Must have at least one product')

export const Order = model<IOrder>('Order', orderSchema)
