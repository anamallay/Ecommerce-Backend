import { Document } from 'mongoose'

export type categoryI = {
  _id: string
  title: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
}

export type CategoryInput = Omit<categoryI, '_id'>

export interface ICategory extends Document {
  _id: string
  title: string
  slug: string
  createdAt?: string
  updatedAt?: string
  __v: number
}
