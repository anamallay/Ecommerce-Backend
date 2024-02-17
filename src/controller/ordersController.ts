import { NextFunction, Request, Response } from 'express'
import * as mongoose from 'mongoose'
import { IOrder, IOrderProduct } from '../types/orderType'
import { Order } from '../models/orderSchema'
import { findOrder, getOrders } from '../services/orderService'
import { createHttpError } from '../util/createHttpError'
import { gateway } from '../config/braintree'
import { IProduct } from '../types/productType'
import Product from '../models/productSchema'

interface CustomRequest extends Request {
  userId?: string
}

export const processPayment = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cartItems } = req.body
    const { products, payment } = cartItems

    const newOrder: IOrder = new Order({
      products: products.map((item: IOrderProduct) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      payment: payment,
      buyer: req.userId,
    })

    await newOrder.save()
    res.send({
      message: 'Payment was successful and order was created',
      payload: newOrder,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await getOrders()
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      payload: orders,
    })
  } catch (error) {
    return next(error)
  }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const newOrder = await findOrder(id)
    res.status(200).json({ message: 'Get Order Successfully!', payload: newOrder })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      createHttpError(400, 'id format not valid')
    } else {
      return next(error)
    }
  }
}
export const getOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const orders = await Order.find({ buyer: userId })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: 'title price',
        },
      })
      .populate('buyer', 'first_name last_name')
    res.status(200).json({ message: 'Get Order Successfully!', payload: orders })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      createHttpError(400, 'id format not valid')
    } else {
      return next(error)
    }
  }
}

export const generateBraintreeClientToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const braintreeClientToken = await gateway.clientToken.generate({})

    if (!braintreeClientToken) {
      throw createHttpError(400, 'Braintree client token was not generated')
    }
    res.status(200).json({
      message: 'Braintree token generated successfully!',
      payload: braintreeClientToken.clientToken,
    })
  } catch (error) {
    return next(error)
  }
}

export const handleBraintreePayment = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nonce, cartItems, amount } = req.body
    console.log(req.body)

    const result = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    })

    console.log('Payment process result:', result.success)
    if (result.success) {
      console.log('Transaction ID: ' + result.transaction.id)
      const newOrder: IOrder = new Order({
        products: cartItems.map((item: IOrderProduct) => ({
          product: item,
          quantity: item.quantity,
        })),
        payment: {
          method: 'card credit',
          amount: amount,
        },
        buyer: req.userId,
        // status: 'Processing',
      })

      await newOrder.save()
      // update the sold value for the products

      const bulkOps = cartItems.map((product: IProduct) => {
        return {
          updateOne: {
            filter: { _id: product._id },
            update: { $inc: { sold: product.quantity } },
          },
        }
      })

      await Product.bulkWrite(bulkOps)

      res.status(201).json({
        message: 'Order was successfully!',
      })
    } else {
      console.error(result.message)
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    return next(error)
  }
}

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params
  const { status } = req.body 

  try {
    const validStatuses = ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    })
  } catch (error) {
    console.error('Error updating order status:', error)
    return next(error) 
  }
}

export const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params; 

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', payload: deletedOrder });
  } catch (error) {
    return next(error);
  }
};

