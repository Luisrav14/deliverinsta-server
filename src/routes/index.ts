import { Router } from 'express'
import userRouter from './userRoutes'
import storeRouter from './storeRoutes'

const router = Router()

router.use('/users', userRouter)
router.use('/stores', storeRouter)

export default router
