import { Request } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/userSchema'
import { createHttpError } from '../util/createHttpError'

export const verifyUserData = async (req: Request) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) {
    throw createHttpError(404, 'Invalid email')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw createHttpError(401, 'Invalid password')
  }
  if (user.isBanned) {
    throw createHttpError(
      403,
      'Unfortunately, your account is banned. please contact technical support for more information'
    )
  }
  return user
}
