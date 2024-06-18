import { Router } from 'express'
import { authenticateUserHandler } from '../controllers/authController'

const authRouter = Router()

authRouter.post('/login', authenticateUserHandler)

export default authRouter
