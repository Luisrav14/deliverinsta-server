import Product, { IProduct } from '../models/Product'

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(productData)
  return await product.save()
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id)
}

export const getAllProducts = async (storeId: string): Promise<IProduct[]> => {
  return await Product.find({ storeId })
}

export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, productData, { new: true })
}

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id)
}
