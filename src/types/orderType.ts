import { Document } from 'mongoose'
import { IUser, UserType } from './userType'
import { IProduct } from './productType'


// export interface IOrder extends Document {
//   /*  _id: string;
//     user: UserType['_id'];
//     products: IProduct['slug'][];
//     createdAt?: Date;
//     updatedAt?: Date;
//     __v: number;*/
//     products: IOrderProduct[];
//     //payment: IorderPayment;
//     user: IUser['_id'];
//     status:
//     "Not processed"
//     | "Processing"
//     | "shipped"
//     | "delivered"
//     | "cancelled" ;
// };

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
