import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

import { uploadImage } from '../utils/uploads'
import * as productService from '../services/productService'
import { generateUniqueFileName } from '../utils/generateUniqueFileName'

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  const data = req.body

  // Verificar si se subió un archivo
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

    // Crear el producto en la base de datos
    const product = await productService.createProduct(productData)

    // Responder con éxito
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

export const getAllProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts(req.params.storeId)
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
