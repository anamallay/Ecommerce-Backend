import { ICategory } from "./categoryType";
import { Document } from 'mongoose'

export type ProductType = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    shipping?: number;
    category: ICategory['_id'];
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
  
// export type ProductInput = Omit<ProductType, '_id'>;
  
export interface IProduct extends Document {
  save: any
  title: string
  slug: string
  price: number
  image: string
  quantity: number
  sold: number
  shipping?: number
  category: ICategory['_id']
  description: string
  createAt?: string
  updatedAt?: string
  countInStock: number
};
export type ProductInput = Pick<
  IProduct,
  | 'title'
  | 'slug'
  | 'price'
  | 'description'
  | 'category'
  | 'quantity'
  | 'sold'
  | 'shipping'
  | 'image'
>

export type productUpdateType = Partial<ProductInput>