import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import fileUpload from 'express-fileupload'

import router from './routes'
import connectDB from './config/database'

const app = express()

app.use(morgan('dev'))

// Middlewares
app.use(cors())
app.use(express.json())

// Files upload config
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: false,
    createParentPath: true
  })
)

// MongoDB connection
connectDB()

// Routes
app.use('/api', router)

export default app
