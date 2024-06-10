import { Request, Response } from 'express'
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
