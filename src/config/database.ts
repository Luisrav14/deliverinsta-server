import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const uri = process.env.MONGODB_URI || ''

const connectDB = async () => {
  try {
    await mongoose.connect(uri!)
    console.log('[mongodb] Database connected')
  } catch (error) {
    console.error('[mongodb] Error connecting to database', error)
  }
}

export default connectDB
