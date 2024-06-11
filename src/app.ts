import cors from 'cors'
import morgan from 'morgan'
import express from 'express'

import router from './routes'
import connectDB from './config/database'

const app = express()

app.use(morgan('dev'))

// Middlewares
app.use(cors())
app.use(express.json())

// MongoDB connection
connectDB()

// Routes
app.use('/api', router)

export default app
