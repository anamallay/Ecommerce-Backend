import { Router } from 'express'
import { contactUs } from '../controller/contactUsController'

const router = Router()

router.post('/', contactUs)
export default router

