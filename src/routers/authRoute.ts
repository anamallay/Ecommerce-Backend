import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'

import { login, logout } from '../controller/authController'
import { isLoggedIn, isLoggedOut, userId } from '../middlewares/auth'
import { loginValidation, userValidation } from '../validation/vaildations'
import { runValidation } from '../validation/runValidation'
import { forgetPassword, resetPassword } from '../controller/usersController'

const router = Router()

// const limiter = rateLimit({
// 	windowMs: 5 * 60 * 1000, // 5 minutes
//     limit: 7,
//     message: 'You have reached maximum request, please try after 5 minutes'
// });

router.post('/login', /* userId, limiter isLoggedOut, */ loginValidation, runValidation, login)
router.post('/logout', logout)
// forget and reset password
router.post('/forget-password', isLoggedOut, forgetPassword)
router.put('/reset-password', isLoggedOut, resetPassword)
export default router
