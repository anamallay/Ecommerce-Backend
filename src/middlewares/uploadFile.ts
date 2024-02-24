import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

// Correct storage configurations
const productStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, 'public/images/products');
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const userStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
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


// Multer middleware for product images
export const uploadProductImg = multer({
  storage: productStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
}).single('image');

// Multer middleware for user images
export const uploadUserImg = multer({
  storage: userStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
}).single('image');