import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { verifyUserData } from '../services/authService'
import { dev } from '../config'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await verifyUserData(req)
    const accessToken = jwt.sign({ _id: user._id }, dev.app.jwtUserAccessKey, { expiresIn: '30m' })
    res.cookie('access_token', accessToken, {
      maxAge: 15 * 60 * 1000, // 10 minutes
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
    res.status(200).send({
      message: 'You have successfully logged in',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')
    res.status(200).send({
      message: 'You have successfully logged out',
    })
  } catch (error) {
    next(error)
  }
}
