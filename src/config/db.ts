import mongoose from 'mongoose'
import { dev } from '.' // Assuming this imports your development configuration correctly

export const connectDB = async () => {
  let dbUrl = dev.db.url // Default to development URL

  // Override dbUrl if running in production environment and MONGODB_URI is provided
  if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI) {
    dbUrl = process.env.MONGODB_URI
  }

  try {
    await mongoose.connect(dbUrl)
    console.log('Database is connected')
  } catch (error) {
    console.error('MongoDB connection error: ', error)
  }
}
