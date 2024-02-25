import { Request } from "express";
import bcrypt from 'bcrypt';

import User from "../models/userSchema";
import { createHttpError } from "../util/createHttpError";

export const verifyUserData = async (req: Request) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(!user) {
        throw createHttpError(404, "Invalid email");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw createHttpError(401, 'Invalid password')
    }
    if(user.isBanned) {
        throw createHttpError(
          403,
          'Unfortunately, your account is banned. please contact technical support for more information'
        )
    }
    return user;
};

// export const login = async (email: string, password: string) => {
//   const usersExist = await User.findOne({ email: email })

//   if (!usersExist) {
//     throw createHttpError(404, 'User does not exist')
//   }
//   console.log('pass: ', password, 'usersExist.password: ', usersExist.password)
//   const passwordMatch = await bcrypt.compare(password, usersExist.password)

//   if (!passwordMatch) {
//     throw createHttpError(404, 'Password does not match')
//   }

//   if (usersExist?.isBanned) {
//     throw createHttpError(403, 'Unauthorized access, you are banned please contact admin@gmail.com')
//   }
//   return usersExist
// }