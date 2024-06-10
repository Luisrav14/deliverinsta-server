import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import connectDB from './config/database'
import router from './routes'

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
