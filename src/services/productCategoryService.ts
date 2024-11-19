import { IProductCategory, ProductCategory } from '../models/ProductCategory'

export const createCategory = async (data: Partial<IProductCategory>): Promise<IProductCategory> => {
  const category = new ProductCategory(data)
  return category.save()
}

export const getCategories = async (): Promise<IProductCategory[]> => {
  return ProductCategory.find()
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
