import { Router } from 'express'
import {
  createUserHandler,
  getUserByIdHandler,
  getAllUsersHandler,
  updateUserHandler,
  deleteUserHandler
} from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'

const userRouter = Router()

userRouter.post('/', authMiddleware, createUserHandler)
userRouter.get('/:id', authMiddleware, getUserByIdHandler)
userRouter.get('/', authMiddleware, getAllUsersHandler)
userRouter.put('/:id', authMiddleware, updateUserHandler)
userRouter.delete('/:id', authMiddleware, deleteUserHandler)

export default userRouter
