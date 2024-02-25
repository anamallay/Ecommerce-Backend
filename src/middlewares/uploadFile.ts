import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

const storage = multer.memoryStorage();

const productStorge = multer.diskStorage({
  // destination: function (req: Request, file: Express.Multer.File, cb) {
  //   cb(null, 'public/images/products')
  // },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const userStorge = multer.diskStorage({
  // destination: function (req: Request, file: Express.Multer.File, cb) {
  //   cb(null, 'public/images/users')
  // },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTpes = ['image/jpeg', 'image/png', 'image/png']

  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File is not an image'))
  }
  if (!allowedTpes.includes(file.mimetype)) {
    return cb(new Error('Image type not allowed'))
  }
  cb(null, true)
}


export const uploadProduct = multer({
  storage: productStorge,
  fileFilter: fileFilter,
})


export const uploadUser = multer({
  storage: userStorge,
  fileFilter: fileFilter,
})
// this is a multer middlewares for uploading image
export const uploadProductImg = multer({
  storage: productStorge,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
}).single('image')

export const uploadUserImg = multer({
  storage: userStorge,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
}).single('image')