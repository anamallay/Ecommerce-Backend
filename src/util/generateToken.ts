import jwt from 'jsonwebtoken';

import { dev } from '../config';
import { userInputType } from '../types/userType';

export const generateToken = (tokenPayload: userInputType) => {
  return jwt.sign(tokenPayload, dev.app.jwtUserActivationKey, { expiresIn: '30m' })
}