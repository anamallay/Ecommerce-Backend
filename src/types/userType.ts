import { IOrder } from './orderType'
import { Document } from 'mongoose'
export interface IUser extends Document {
  first_name: string
  last_name: string
  email: string
  password: string
  image?: string
  address: string
  phone: string
  // order: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
  updatedAt?: string
  // __v?: number
}
export type userInputType = Omit<IUser, '_id' | 'slug' | 'createdAt' | 'updatedAt' | '__v'>
export type userUpdateType = Partial<userInputType>

export type UserType = {
  first_name: string
  last_name: string
  image?: string
  email: string
  password: string
  address: string
  phone: string
  isAdmin?: boolean
  isBanned?: boolean
  // __v?: number
}
// For user isLoggedIn
export interface CustomRequest extends Request {
  user_id?: string
}