import { Request, Response } from 'express'
import * as productCategoryService from '../services/productCategoryService'

export const createCategoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await productCategoryService.createCategory(req.body)
    res.status(201).json({ ok: true, data: category })
  } catch (error) {
    console.error('Error creating category:', error)
    res.status(500).json({ ok: false, message: 'Error creating category.' })
  }
}

export const getCategoriesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await productCategoryService.getCategoriesWithSubcategories()
    res.status(200).json({ ok: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ ok: false, message: 'Error fetching categories.' })
  }
}

export const getCategoryByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await productCategoryService.getCategoryById(req.params.id)
    if (!category) {
      res.status(404).json({ ok: false, message: 'Category not found.' })
      return
    }
    res.status(200).json({ ok: true, data: category })
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ ok: false, message: 'Error fetching category.' })
  }
}

export const updateCategoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await productCategoryService.updateCategory(req.params.id, req.body)
    if (!category) {
      res.status(404).json({ ok: false, message: 'Category not found.' })
      return
    }
    res.status(200).json({ ok: true, data: category })
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ ok: false, message: 'Error updating category.' })
  }
}

export const deleteCategoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await productCategoryService.deleteCategory(req.params.id)
    if (!category) {
      res.status(404).json({ ok: false, message: 'Category not found.' })
      return
    }
    res.status(200).json({ ok: true, message: 'Category deleted successfully.' })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ ok: false, message: 'Error deleting category.' })
  }
}
