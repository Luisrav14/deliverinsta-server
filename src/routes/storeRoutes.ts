import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import {
  createStoreHandler,
  deleteStoreHandler,
  getAllStoresHandler,
  getStoreByIdHandler,
  updateStoreHandler,
  updateStoreLogo
} from '../controllers/storeController'

const storeRouter = Router()

storeRouter.get('/', getAllStoresHandler)
storeRouter.post('/', authMiddleware, createStoreHandler)
storeRouter.get('/:id', authMiddleware, getStoreByIdHandler)
storeRouter.put('/:id', authMiddleware, updateStoreHandler)
storeRouter.delete('/:id', authMiddleware, deleteStoreHandler)
storeRouter.put('/update-logo/:id', authMiddleware, updateStoreLogo)

export default storeRouter
