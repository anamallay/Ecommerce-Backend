import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

import {
  createProduct,
  getProducts,
  getProductsWithPagination,
  getSingleProduct,
  updateProduct,
} from '../services/productService'
import Product from '../models/productSchema'
import { createHttpError } from '../util/createHttpError'
import { replaceImageProduct } from '../helper/ImageHelper'
import { productUpdateType } from '../types/productType'
require('dotenv').config()
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const getAllProductsWithPagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 1
    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 4
    const search = typeof req.query.search === 'string' ? req.query.search : ''

    const result = await getProductsWithPagination(page.toString(), limit.toString(), search)

    const totalPages = Math.ceil(result.totalCount / limit)

    res.status(200).json({
      message: 'Returns all products',
      data: result.payload,
      pagination: {
        page: result.page,
        limit: result.limit,
        totalCount: result.totalCount,
        totalPages: totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
}
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : ''

    const result = await getProducts(search)

    res.status(200).json({
      message: 'Returns all products',
      data: result.payload,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug
    const product = await getSingleProduct(slug)

    res.status(200).json({
      message: 'Product found',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug
    const product = await Product.findOne({ slug: slug })
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    if (product.image) {
      const urlParts = product.image.split('/')
      const fileName = urlParts[urlParts.length - 1]
      const publicId = fileName.split('.')[0] 
      await cloudinary.uploader.destroy(`sda-product/${publicId}`)
    }

    await Product.findByIdAndDelete(product._id)

    res.status(200).json({
      message: 'Product deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let productInput = {
      title: req.body.title,
      slug: slugify(req.body.title),
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      quantity: req.body.quantity,
      sold: req.body.sold,
      shipping: req.body.shipping,
      image: 'default-image-path',
    }

    if (req.file) {
      // const response = await cloudinary.uploader.upload(req.file.path, {
      //   folder: 'sda-product',
      // })
      // Convert buffer to a base64 string or use a direct buffer upload if supported
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      const response = await cloudinary.uploader.upload(fileStr, {
        folder: 'sda-product',
      })

      productInput.image = response.secure_url
    }

    const product = await createProduct(productInput)

    res.status(201).json({
      message: 'Product created',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const data = req.body
    let oldImagePublicId = null

    const existingProduct = await Product.findOne({ slug: slug })
    if (!existingProduct) {
      throw createHttpError(404, `Product with slug ${slug} does not exist`)
    }

    if (existingProduct.image) {
      const urlParts = existingProduct.image.split('/')
      oldImagePublicId = urlParts[urlParts.length - 1].split('.')[0].split('v')[1]
    }

    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'sda-product',
      })
      data.image = uploadResponse.secure_url

      if (oldImagePublicId) {
        await cloudinary.uploader.destroy(oldImagePublicId)
      }
    }

    const updatedProduct = await updateProduct(slug, data)

    res.status(200).json({
      message: 'Update product by slug successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const getFilteredProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, priceRangeMin, priceRangeMax } = req.query
    const filter: any = {}
    if (category) {
      filter.category = category
    }
    if (priceRangeMin && priceRangeMax) {
      filter.price = { $gte: Number(priceRangeMin), $lte: Number(priceRangeMax) }
    }
    const products = await Product.find(filter)
    res.status(200).json({
      message: 'Returns filtered products',
      payload: products,
    })
  } catch (error) {
    next(error)
  }
}
