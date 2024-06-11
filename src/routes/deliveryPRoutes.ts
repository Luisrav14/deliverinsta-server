// src/routes/deliveryPersonRoutes.ts
import { Router } from 'express'
import {
  createDeliveryPersonHandler,
  getDeliveryPersonByIdHandler,
  getAllDeliveryPersonsHandler,
  updateDeliveryPersonHandler,
  deleteDeliveryPersonHandler
} from '../controllers/deliveryPersonController'

const deliveryPRouter = Router()

deliveryPRouter.post('/', createDeliveryPersonHandler)
deliveryPRouter.get('/:id', getDeliveryPersonByIdHandler)
deliveryPRouter.get('/', getAllDeliveryPersonsHandler)
deliveryPRouter.put('/:id', updateDeliveryPersonHandler)
deliveryPRouter.delete('/:id', deleteDeliveryPersonHandler)

export default deliveryPRouter
