import { Router } from 'express'
import userRouter from './userRoutes'
import storeRouter from './storeRoutes'
import deliveryPRouter from './deliveryPRoutes'

const router = Router()

router.use('/users', userRouter)
router.use('/stores', storeRouter)
router.use('/delivery-users', deliveryPRouter)

export default router
