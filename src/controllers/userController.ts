import { Request, Response } from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/userSevice'
import { handleFirebaseError } from '../utils/handleFirebaseError'

export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await createUser(req.body)

    res.status(201).json({
      ok: true,
      data: user,
      token
    })
  } catch (error) {
    console.error(error)
    const errorMessage = handleFirebaseError(error)

    res.status(500).json({
      ok: false,
      error: errorMessage
    })
  }
}

export const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserById(req.params.id)
    if (user) {
      res.status(200).json({
        ok: true,
        data: user
      })
    } else {
      res.status(404).json({ ok: false, message: 'User not found' })
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: error })
  }
}

export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers()

    res.status(200).json({ ok: true, data: users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: error })
  }
}

export const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await updateUser(req.params.id, req.body)
    if (user) {
      res.status(200).json({ ok: true, data: user })
    } else {
      res.status(404).json({ ok: false, message: 'User not found' })
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({ ok: false, error: error })
  }
}

export const deleteUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await deleteUser(req.params.id)
    if (user) {
      res.status(200).json({ ok: true, message: 'User deleted successfully' })
    } else {
      res.status(404).json({ ok: false, message: 'User not found' })
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({ ok: false, error: error })
  }
}
