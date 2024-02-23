import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { dev } from '../config'
import User from '../models/userSchema'
import { createHttpError } from '../util/createHttpError'

interface CustomRequest extends Request {
  userId?: string
}

export const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token
    console.log('accessToken', accessToken)
    console.log('req.cookies', req.cookies) 

    if (!accessToken) {
      throw createHttpError(401, 'You are not logged in')
    }
    const decodedAccessToken = jwt.verify(accessToken, dev.app.jwtUserAccessKey) as JwtPayload
    if (!decodedAccessToken) {
      throw createHttpError(401, 'Invalid access token')
    }
    req.userId = decodedAccessToken._id
    next()
  } catch (error) {
    // console.error('Error in isLoggedIn middleware:', error)
    next(error)
  }
}

export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token
    if (accessToken) {
      throw createHttpError(401, 'You are already logged in')
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (!user?.isAdmin) {
      throw createHttpError(403, 'You are not authorized to access this route')
    }
    next()
  } catch (error) {
    next(error)
  }
}
