import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import {
  createStoreHandler,
  deleteStoreHandler,
  getAllStoresHandler,
  getStoreByIdHandler,
  updateStoreHandler
} from '../controllers/storeController'

const storeRouter = Router()

storeRouter.post('/', authMiddleware, createStoreHandler)
storeRouter.get('/:id', authMiddleware, getStoreByIdHandler)
storeRouter.get('/', authMiddleware, getAllStoresHandler)
storeRouter.put('/:id', authMiddleware, updateStoreHandler)
storeRouter.delete('/:id', authMiddleware, deleteStoreHandler)

export default storeRouter
