import cors from 'cors'
import express from 'express'
import connectDB from './config/database'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// MongoDB connection
connectDB()

export default app
