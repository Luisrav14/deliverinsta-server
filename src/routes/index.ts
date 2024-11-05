import { Router } from 'express'
import authRouter from './authRoutes'
import userRouter from './userRoutes'
import storeRouter from './storeRoutes'
import productRouter from './productRoutes'
import deliveryPRouter from './deliveryPRoutes'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/stores', storeRouter)
router.use('/products', productRouter)
router.use('/delivery-users', deliveryPRouter)

export default router
