import mongoose from 'mongoose';

import { UserType } from '../types/userType';
import { dev } from '../config';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "user's first name must be at least 2 characters"],
      maxlength: [50, "user's first name must be at most 50 characters"],
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "user's last name must be at least 2 characters"],
      maxlength: [50, "user's last name must be at most 50 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        message: 'Please enter a valid email address',
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, 'password must be at least 6 characters'],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      minlength: [3, 'address must be at least 3 characters'],
    },
    image: {
      type: String,
      default: dev.app.defaultProductImage,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<UserType>('User', userSchema);