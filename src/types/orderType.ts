import { Document } from 'mongoose'
import { IUser, UserType } from './userType'
import { IProduct } from './productType'


//TODO made by me
export interface IOrder extends Document {
  products: IOrderProduct[]
  payment: IOrderPayment
  buyer: IUser['_id']
  status: 'Not processed' | 'Processing' | 'shipped' | 'delivered' | 'cancelled'
}
export interface IOrderProduct {
  product: IProduct['slug']
  quantity: number
}
export interface IOrderPayment {}
