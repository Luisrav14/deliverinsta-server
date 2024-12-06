import { Request, Response } from 'express'
import { createStore, deleteStore, getAllStores, getStoreById, updateStore } from '../services/storeService'
import fileUpload from 'express-fileupload'
import { generateUniqueFileName } from '../utils/generateUniqueFileName'
import { uploadImage } from '../utils/uploads'

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
  try {
    const stores = await getAllStores()

    res.status(201).json({ ok: true, data: stores })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: error })
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

  if (!storeId) {
    res.status(400).json({ ok: false, message: 'Store ID is required.' })
    return
  }

  if (!req.files || !req.files.image) {
    res.status(400).json({ ok: false, message: 'Image file is required.' })
    return
  }

  try {
    const imageFile = req.files.image as fileUpload.UploadedFile

    const uniqueFileName = generateUniqueFileName(imageFile.name, 'stores')

    const imageUrl = await uploadImage(imageFile.data, uniqueFileName, true)

    await updateStore(storeId, { logo: imageUrl })

    res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Error saving store logo:', error)
    res.status(500).json({ ok: false, message: 'Error saving store logo.' })
  }
}
