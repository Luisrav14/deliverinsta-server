import { Request, Response, NextFunction } from 'express'
import { verifyFirebaseToken } from '../utils/firebase'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No hay token en la petición' })
  }

  try {
    const decodedToken = await verifyFirebaseToken(token)
    // console.log(decodedToken)
    ;(req as any).user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}

export default authMiddleware
