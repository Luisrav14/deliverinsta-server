import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

import Store from '../models/Store'
import { deleteImage, uploadImage } from '../utils/s3'
import { cleanFilePath, generateUniqueFileName } from '../utils/utils'
import { createStore, deleteStore, getAllStores, getStoreById, updateStore } from '../services/storeService'

export const createStoreHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await createStore(req.body)

    res.status(201).json({ ok: true, data: store })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: error })
  }
}

export const getStoreByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await getStoreById(req.params.id)

    if (store) {
      res.status(200).json({ ok: true, data: store })
    } else {
      res.status(404).json({ message: 'Store not found' })
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: error })
  }
}

export const getAllStoresHandler = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string, 10) || 1
  const limit = parseInt(req.query.limit as string, 10) || 10
  const sortBy = (req.query.sortBy as string) || 'name'
  const order = req.query.order === 'desc' ? -1 : 1
  const search = (req.query.search as string) || ''
  const category = (req.query.category as string) || ''

  try {
    const filter: Record<string, any> = {}

    if (search) filter.name = { $regex: search, $options: 'i' }

    if (category) filter.category = category

    const total = await Store.find(filter).countDocuments()

    const stores = await Store.find(filter)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      ok: true,
      data: stores,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    })
  } catch (error) {
    console.error('Error fetching stores:', error)

    res.status(500).json({ ok: false, message: 'Error fetching stores.' })
  }
}

export const updateStoreHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await updateStore(req.params.id, req.body)

    if (store) {
      res.status(200).json({ ok: true, data: store })
    } else {
      res.status(404).json({ message: 'Store not found' })
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: error })
  }
}

export const deleteStoreHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await deleteStore(req.params.id)

    if (user) {
      res.status(200).json({ ok: true, message: 'User deleted successfully' })
    } else {
      res.status(404).json({ message: 'Store not found' })
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: error })
  }
}

export const updateStoreLogo = async (req: Request, res: Response): Promise<void> => {
  const storeId = req.params.id

  const store = await Store.findOne({ _id: storeId })

  if (!storeId) {
    console.error('Store ID is required')
    res.status(400).json({ ok: false, message: 'Store ID is required.' })
    return
  }

  if (!req.files || !req.files.image) {
    console.error('Image file is required')
    res.status(400).json({ ok: false, message: 'Image file is required.' })
    return
  }

  try {
    const imageFile = req.files.image as fileUpload.UploadedFile

    const uniqueFileName = generateUniqueFileName(imageFile.name, 'stores')

    const imageUrl = await uploadImage(imageFile.data, uniqueFileName, true)

    if (store && store.logo) await deleteImage(cleanFilePath(store.logo))

    await updateStore(storeId, { logo: imageUrl })
    res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Error saving store logo:', error)
    res.status(500).json({ ok: false, message: 'Error saving store logo.' })
  }
}
