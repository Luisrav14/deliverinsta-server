import { Request, Response, NextFunction } from 'express'
import { verifyFirebaseToken } from '../utils/firebase'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).send('Access Denied')
  }

  try {
    // const decodedToken = await verifyFirebaseToken(token)
    // req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).send('Invalid Token')
  }
}

export default authMiddleware
