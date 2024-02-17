import slugify from 'slugify'
// import fs from 'fs'
// import path from 'path'
import Product from '../models/productSchema'
import { IProduct, ProductInput, ProductType, productUpdateType } from '../types/productType'
import { createHttpError } from '../util/createHttpError'
import { deleteImage } from '../helper/ImageHelper'

interface IProductData {
  title?: string
  price?: number
  description?: string
  category?: string[]
  quantity?: number
  sold?: number
  shipping?: number
  image?: string
}

export const getProductsWithPagination = async (pageParam: string, limitParam: string, search: string) => {
  let page = Number(pageParam) || 1
  const limit = Number(limitParam) || 10
  const totalCount = await Product.countDocuments()
  const totalPages = Math.ceil(totalCount / limit)

  // const query = search ? { name: { $regex: search, $options: 'i' } } : {}
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')
  const filter = {
    $or: [
      { title: { $regex: searchRegExp } },
      { description: { $regex: searchRegExp } }, //*Corrected from $regax to $regex
    ],
  }

  if (page > totalPages) {
    page = totalPages > 0 ? totalPages : 1
  }

  const skip = (page - 1) * limit
  // {price: {$eq: 30}}
  // {$and: [{ price: { $gt: 20 } }, { quantity: { $eq: 5 } }],}
  // {price: {$gt: 20}}
  const payload = await Product.find(filter).populate('category').skip(skip).limit(limit)
  // .sort({ price: 1})
  return {
    payload,
    page,
    limit,
    totalCount,
  }
}
export const getProducts = async (search: string) => {
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')
  const filter = search
    ? {
        $or: [{ title: { $regex: searchRegExp } }, { description: { $regex: searchRegExp } }],
      }
    : {} // Simplified to handle an empty search string.

  const payload = await Product.find(filter).populate('category') // Removed skip and limit.
  const totalCount = payload.length // If you still need the total count of the matched documents.

  return {
    payload,
    totalCount, // Optional, depending on if you still want to provide a total count.
  }
}

export const getSingleProduct = async (slug: string) => {
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    throw createHttpError(404, 'Product not found!!')
  }
  return product
}

export const deleteProduct = async (slug: string) => {
  const deletedProduct = await Product.findOneAndDelete({
    slug: slug,
  })
  if (!deletedProduct) {
    throw createHttpError(404, 'Product not found!')
  }
  if (deletedProduct && deletedProduct.image) {
    deleteImage(deletedProduct.image)
  }

  return deletedProduct
}
export const createProduct = async (productInput: ProductInput): Promise<IProduct> => {
  const {
    title,
    price,
    description,
    category,
    quantity,
    sold,
    shipping,
    image = undefined,
  } = productInput

  const productExist = await Product.exists({ title: title })
  if (productExist) {
    throw createHttpError(404, 'Product already exists')
  }

  const newProduct: IProduct = new Product({
    title: title,
    slug: slugify(title),
    price: price,
    ...(image && { image: image }),
    description: description,
    quantity: quantity,
    category: category,
    sold: sold,
    shipping: shipping,
  })

  return newProduct.save()
}


export const updateProduct = async (slug: string, productData: IProductData) => {
  const { title } = productData

  const existingProduct = await Product.findOne({ slug: slug })
  if (!existingProduct) {
    throw createHttpError(404, `Product with slug ${slug} does not exist`)
  }

  if (title) {
    const isTitleExist = await Product.findOne({ title: title, _id: { $ne: existingProduct._id } })
    if (isTitleExist) {
      throw createHttpError(409, `Product with title ${title} already exists`)
    }
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { slug: slug },
    {
      ...productData,
      slug: title && typeof title === 'string' ? slugify(title, { lower: true }) : slug,
    },
    { new: true } 
  )

  return updatedProduct
}
