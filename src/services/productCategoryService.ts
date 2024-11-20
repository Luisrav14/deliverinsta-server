import { ProductSubcategory } from '../models/ProductSubcategory'
import { IProductCategory, ProductCategory } from '../models/ProductCategory'

export const createCategory = async (data: Partial<IProductCategory>): Promise<IProductCategory> => {
  const category = new ProductCategory(data)
  return category.save()
}

export const getCategories = async () => {
  return ProductCategory.find().lean()
}

export const getCategoriesWithSubcategories = async () => {
  try {
    const categories = await ProductCategory.find().exec()

    const categoriesWithSubcategories = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await ProductSubcategory.find({ parentCategory: category._id }).exec()

        return {
          ...category.toObject(),
          subcategories
        }
      })
    )

    return categoriesWithSubcategories
  } catch (error) {
    console.error('Error fetching categories with subcategories:', error)
    throw error
  }
}

export const getCategoryById = async (id: string): Promise<IProductCategory | null> => {
  return ProductCategory.findById(id)
}

export const updateCategory = async (id: string, data: Partial<IProductCategory>): Promise<IProductCategory | null> => {
  return ProductCategory.findByIdAndUpdate(id, data, { new: true })
}

export const deleteCategory = async (id: string): Promise<IProductCategory | null> => {
  return ProductCategory.findByIdAndDelete(id)
}
