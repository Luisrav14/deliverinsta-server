import { Request, Response } from 'express'
import { handleFirebaseError } from '../utils/firebase'
import { authenticateUser } from '../services/authService'

export const authenticateUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body
    const { user, token: customToken } = await authenticateUser(token)

    res.status(200).json({
      user,
      token: customToken
    })
  } catch (error: any) {
    console.error(error)

    const errorMessage = handleFirebaseError(error.message)

    res.status(500).json({
      ok: false,
      error: errorMessage
    })
  }
}
