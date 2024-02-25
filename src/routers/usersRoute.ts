import { Router } from 'express'
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth'
import { updateUserValidation, userValidation } from '../validation/vaildations'
import { runValidation } from '../validation/runValidation'
import {
  activeUser,
  banUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  registerUser,
  unbanUser,
  updateSingleUser,
} from '../controller/usersController'
import { uploadUser } from '../middlewares/uploadFile'

const router = Router()

router.get('/',/*isLoggedIn, isAdmin,*/ getAllUsers)
router.get('/:id',/* isLoggedIn, */getSingleUser)
router.post(
  '/register',
  uploadUser.single('image'),
  /*
  isLoggedOut,
  */
  userValidation,
  runValidation,
  registerUser
)
router.post('/activate-account/:token', /*isLoggedOut,*/ activeUser)
router.put(
  '/:id',
  uploadUser.single('image'),
  isLoggedIn,
  updateUserValidation,
  runValidation,
  updateSingleUser
)
router.delete('/:id', /*isLoggedIn, isAdmin,*/ deleteUser)
router.put('/ban/:id', /*isLoggedIn, isAdmin,*/ banUser)
router.put(`/unban/:id`, /*isLoggedIn, isAdmin,*/ unbanUser)
export default router
