import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { verifyUserData } from '../services/authService'
import { dev } from '../config'
interface CustomRequest extends Request {
  userId?: string
}
export const login = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await verifyUserData(req)
    const accessToken = jwt.sign({ _id: user._id }, dev.app.jwtUserAccessKey, { expiresIn: '30m' })
    res.cookie('access_token', accessToken, {
      maxAge: 15 * 60 * 1000, // 10 minutes
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
    })
    res.status(200).send({
      message: 'You have successfully logged in',
      payload: user,
    })
  } catch (error) {
    console.log('error', error)

    next(error)
  }
}

export const logout = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')
    res.status(200).send({
      message: 'You have successfully logged out',
    })
  } catch (error) {
    next(error)
  }
}
