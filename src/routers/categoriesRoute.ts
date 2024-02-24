import { Router } from 'express'
import { categoryValidations, updateCategoryValidations } from '../validation/vaildations'
import { runValidation } from '../validation/runValidation'
import {
  createSingleCategory,
  deleteSingleCategory,
  getAllCategories,
  getSingleCategoryById,
  updateSingleCategory,
} from '../controller/categoriesController'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const router = Router()

router.get('/', getAllCategories)
router.get('/:id', /*isLoggedIn, isAdmin,*/ getSingleCategoryById)
router.post('/', /*isLoggedIn, isAdmin,*/ categoryValidations, runValidation, createSingleCategory)
router.put(
  '/:id',
  /*
  isLoggedIn,
  isAdmin,
  */
  updateCategoryValidations,
  runValidation,
  updateSingleCategory
)
router.delete('/:id',/* isLoggedIn, isAdmin,*/ deleteSingleCategory)

export default router
