import { Request, Response } from 'express'
import { createDeliveryP, getDeliveryById, getAllDeliveryP, updateDeliveryP, deleteDeliveryP } from '../services/deliveryPersonService'

export const createDeliveryPersonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPerson = await createDeliveryP(req.body)
    res.status(201).json({ ok: true, data: deliveryPerson })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: error })
  }
}

export const getDeliveryPersonByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPerson = await getDeliveryById(req.params.id)
    if (deliveryPerson) {
      res.status(200).json({ ok: true, data: deliveryPerson })
    } else {
      res.status(404).json({ ok: false, error: 'Delivery person not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: error })
  }
}

export const getAllDeliveryPersonsHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPersons = await getAllDeliveryP()
    res.status(200).json({ ok: true, data: deliveryPersons })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: error })
  }
}

export const updateDeliveryPersonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPerson = await updateDeliveryP(req.params.id, req.body)
    if (deliveryPerson) {
      res.status(200).json({ ok: true, data: deliveryPerson })
    } else {
      res.status(404).json({ ok: false, error: 'Delivery person not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: error })
  }
}

export const deleteDeliveryPersonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPerson = await deleteDeliveryP(req.params.id)
    if (deliveryPerson) {
      res.status(200).json({ ok: true, data: deliveryPerson })
    } else {
      res.status(404).json({ ok: false, error: 'Delivery person not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: error })
  }
}
