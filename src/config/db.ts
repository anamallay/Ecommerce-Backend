import mongoose from 'mongoose'

import { dev } from '.'

export const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url)
    console.log('Database connected successfully')
  } catch (error) {
    console.log('MongoDB connection error: ', error)
  }
}
