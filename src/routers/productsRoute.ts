import { Router } from 'express'

import { isAdmin, isLoggedIn } from '../middlewares/auth'
import { ProductValidation, updateProductValidation } from '../validation/vaildations'
import { runValidation } from '../validation/runValidation'
import {
  createSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  getAllProductsWithPagination,
  getSingleProductBySlug,
  updateSingleProduct,
} from '../controller/productsController'
import { uploadProduct } from '../middlewares/uploadFile'

const router = Router()
router.get('/', getAllProducts) // without pagination
router.get('/pagination', getAllProductsWithPagination) //with pagination
router.get('/:slug', getSingleProductBySlug)
// router.get('/filtered-products', getFilteredProducts)
router.post(
  '/',
  isLoggedIn,
  isAdmin,
  uploadProduct.single('image'),
  ProductValidation,
  runValidation,
  createSingleProduct
)
router.put(
  '/:slug',
  isLoggedIn,
  isAdmin,
  uploadProduct.single('image'),
  updateProductValidation,
  runValidation,
  updateSingleProduct
)
router.delete('/:slug', isLoggedIn, isAdmin, deleteSingleProduct)

export default router
