import express from 'express'
import authMiddleware from '../middleware/authMiddleware'
import * as productController from '../controllers/productController'

const productRouter = express.Router()

productRouter.get('/', productController.getProductsWithPaginationHandler)

productRouter.use(authMiddleware)

productRouter.post('/', productController.createProductHandler)
productRouter.get('/:id', productController.getProductHandler)
productRouter.get('/store/:storeId', productController.getProductsByStoreHandler)
productRouter.put('/:id', productController.updateProductHandler)
productRouter.delete('/:id', productController.deleteProductHandler)

export default productRouter
