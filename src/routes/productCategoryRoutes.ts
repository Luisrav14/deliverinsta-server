import { Router } from 'express'
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} from '../controllers/productCategoryController'
import authMiddleware from '../middleware/authMiddleware'

const productCategoryRouter = Router()

productCategoryRouter.get('/', getCategoriesHandler)

productCategoryRouter.use(authMiddleware)

productCategoryRouter.post('/', createCategoryHandler)
productCategoryRouter.get('/:id', getCategoryByIdHandler)
productCategoryRouter.put('/:id', updateCategoryHandler)
productCategoryRouter.delete('/:id', deleteCategoryHandler)

export default productCategoryRouter
