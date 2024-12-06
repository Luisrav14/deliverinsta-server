import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

import { uploadImage } from '../utils/s3'
import * as productService from '../services/productService'
import { generateUniqueFileName } from '../utils/utils'
import Product from '../models/Product'

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  const data = req.body

  if (!req.files || !req.files.image) {
    res.status(400).json({ ok: false, message: 'Image file is required.' })
    return
  }

  try {
    // Manejo del archivo de imagen
    const imageFile = req.files.image as fileUpload.UploadedFile

    // Generar un nombre único para el archivo
    const uniqueFileName = generateUniqueFileName(imageFile.name, 'products')

    // Subir la imagen al bucket AWS S3 en la carpeta "products"
    const imageUrl = await uploadImage(imageFile.data, uniqueFileName, true)

    const productData = { ...data, image: imageUrl }

    const product = await productService.createProduct(productData)

    res.status(201).json({ ok: true, data: product })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ ok: false, message: 'Error creating product.' })
  }
}

export const getProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id)
    if (!product) {
      res.status(404).json({ ok: false, error: 'Product not found' })
    }
    res.status(200).json({ ok: true, data: product })
  } catch (error) {
    console.error(error)

    res.status(500).json({ ok: false })
  }
}

export const getProductsByStoreHandler = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string, 10) || 1
  const limit = parseInt(req.query.limit as string, 10) || 10
  const sortBy = (req.query.sortBy as string) || 'name'
  const order = req.query.order === 'desc' ? -1 : 1
  const search = (req.query.search as string) || ''

  try {
    const filter: Record<string, any> = { storeId: req.params.storeId }
    if (search) {
      filter.name = { $regex: search, $options: 'i' } // Search by name, case-insensitive
    }

    const total = await Product.countDocuments(filter)
    const products = await Product.find(filter)
      .populate('category')
      .sort({ [sortBy]: order }) // Sort by specific prop
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      ok: true,
      data: products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ ok: false, message: 'Error fetching products.' })
  }
}

export const getProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts()
    res.status(200).json({ ok: true, data: products })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false })
  }
}

export const updateProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body)
    if (!product) {
      res.status(404).json({ ok: false, error: 'Product not found' })
    }
    res.status(200).json({ ok: true, data: product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false })
  }
}

export const deleteProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.deleteProduct(req.params.id)
    if (!product) {
      res.status(404).json({ ok: false, error: 'Product not found' })
    }
    res.status(200).json({ ok: true, message: 'Product deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false })
  }
}
