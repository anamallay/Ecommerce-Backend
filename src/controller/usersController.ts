import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../models/userSchema'
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import {
  banUserById,
  unbanUserById,
  deleteUserById,
  findUser,
  getUsers,
} from '../services/userService'
import { handleSendEmail } from '../helper/sendEmail'
import { generateToken } from '../util/generateToken'
import { verifyToken } from '../util/verifyToken'
import { UserType, userInputType } from '../types/userType'
import { createHttpError } from '../util/createHttpError'
import { deleteImage, replaceImageUser } from '../helper/ImageHelper'
import { dev } from '../config'
import { EmailDataType } from '../types/emailDataType'

require('dotenv').config()
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search ? String(req.query.search) : ''

    const {
      payload,
      page: currentPage,
      limit: currentLimit,
      totalCount,
      totalPages,
    } = await getUsers(page, limit, search)

    res.status(200).json({
      success: true,
      payload,
      pageInfo: {
        currentPage,
        currentLimit,
        totalCount,
        totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
}
export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUser(req.params.id)
    res.status(200).json({ message: 'User retrieved successfully', payload: user })
  } catch (error) {
    next(error)
  }
}
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password, address, phone, isAdmin } = req.body
    const image = req.file
    const imagePath = image?.path

    const hashedPassword = await bcrypt.hash(password, 10)
    const tokenpayload: UserType = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      address,
      phone,
      isAdmin,
    }
    if (imagePath) {
      tokenpayload.image = imagePath
    }

    const isUserExists = await User.exists({ email: email })
    if (isUserExists) {
      return next(createHttpError(409, 'User already exists'))
    }

    const token = jwt.sign(tokenpayload, dev.app.jwtUserActivationKey, {
      expiresIn: '1h',
    })

    const emailData = {
      email: email,
      subject: 'Activate your account',
      html: `
    <h1>Welcome to Our Service</h1>
    <p>Please click on the link below to activate your account:</p>
    <a href="http://localhost:3000/users/activate-account/${token}">Activate Account</a>
    <p>Thank you for joining us!</p>`,
    }
    await handleSendEmail(emailData)
    res.status(200).json({
      message: 'Check your email to activate your account',
      token: token,
    })
  } catch (error) {
    next(error)
  }
}
export const activeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.params.token
    console.log('token:', token)

    if (!token) {
      return next(createHttpError(404, 'Please provide a token'))
    }
    const decoded = jwt.verify(token, dev.app.jwtUserActivationKey) as JwtPayload
    if (!decoded) {
      throw createHttpError(401, 'Invalid token')
    }

    let imageUrl = 'default-image-path'

    if (decoded.image) {
      const response = await cloudinary.uploader.upload(decoded.image, {
        folder: 'sda-user',
      })
      imageUrl = response.secure_url
    }
    decoded.image = imageUrl


    await User.create(decoded)
    res.status(201).json({ message: 'User is registered successfully' })
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
      const errorMessage =
        error instanceof TokenExpiredError ? 'Your token has expired' : 'Invalid token'
      next(createHttpError(401, errorMessage))
    } else {
      next(error)
    }
  }
}

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await banUserById(req.params.id)
    res.status(200).json({
      message: 'User successfully banned',
    })
  } catch (error) {
    next(error)
  }
}
export const unbanUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await unbanUserById(req.params.id)
    res.status(200).json({
      message: 'User successfully unbanned',
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await deleteUserById(req.params.id)
    if (user && user.image && user.image !== 'default-image-path') {
      // Assuming the image URL is stored in user.image and it's a Cloudinary URL
      const imageUrl = user.image
      const parts = imageUrl.split('/')
      const publicId = parts[parts.length - 1].split('.')[0] // Extracting public ID assuming format "vXXXXXX/folder/filename.jpg"

      cloudinary.uploader.destroy(publicId, function (error: any, result: any) {
        if (error) {
          console.log('Cloudinary deletion error:', error)
        } else {
          console.log('Cloudinary deletion result:', result)
        }
      })
    }

    res.status(204).json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const formatError = createHttpError(400, 'Id format is not valid')
      next(formatError)
    } else {
      console.error(error)
      next(createHttpError(500, 'Internal Server Error'))
    }
  }
}
export const updateSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, params } = req
    const { id } = params
    const img = req.file?.path

    if (img) {
      await replaceImageUser(req.file, id, body)
    }

    const updatedUser = await User.findOneAndUpdate({ _id: id }, body, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      message: 'Update user successfully',
      payload: updatedUser,
    })
  } catch (error) {
    next(error)
  }
}
export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    if (!email) {
      throw createHttpError(400, 'Email is required')
    }
    const user = await User.findOne({ email: email })

    if (!user) {
      throw createHttpError(409, 'User does not exist please register')
    }
    const token = jwt.sign({ email }, dev.app.jwtresetPassword, { expiresIn: '20m' })
    const activationLink = `http://localhost:3000/resetpassword/${token}`

    const emailData: EmailDataType = {
      email,
      subject: 'Password Reset Instructions',
      html: `
      <h1>Hello ${user.first_name}</h1>
        <h1>Password Reset Requested</h1>
        <p>If you requested a password reset, click on the link below to set a new password:</p>
        <a href="${activationLink}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>`,
    }
    await handleSendEmail(emailData)
    res.status(200).json({
      message: 'please check your email to reset your password',
      payload: token,
    })
  } catch (error) {
    next(error)
  }
}
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body
    const decoded = jwt.verify(token, dev.app.jwtresetPassword) as JwtPayload
    if (!decoded) {
      throw createHttpError(400, 'Invalid token')
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { password: bcrypt.hashSync(password, 10) } },
      { new: true }
    )

    if (!updatedUser) {
      throw createHttpError(400, 'Invalid token')
    }
    res.status(200).json({
      message: 'Reset Password successfully',
    })
  } catch (error) {
    next(error)
  }
}
