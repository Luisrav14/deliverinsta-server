import { Router } from 'express'
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} from '../controllers/productCategoryController'

const productCategoryRouter = Router()

productCategoryRouter.post('/', createCategoryHandler)
productCategoryRouter.get('/', getCategoriesHandler)
productCategoryRouter.get('/:id', getCategoryByIdHandler)
productCategoryRouter.put('/:id', updateCategoryHandler)
productCategoryRouter.delete('/:id', deleteCategoryHandler)

export default productCategoryRouter
