import { Request, Response } from 'express'
import * as productService from '../services/productService'

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body)
    res.status(201).json({ ok: true, data: product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false })
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
