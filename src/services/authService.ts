import User, { IUser } from '../models/User'
import admin from '../config/firebaseAdmin'

export interface AuthResponse {
  user: IUser
  token: string
}

export const authenticateUser = async (token: string): Promise<AuthResponse> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    const firebaseUid = decodedToken.uid

    const user = await User.findOne({ firebaseId: firebaseUid })

    if (!user) {
      throw new Error('User not found in MongoDB')
    }

    const customToken = await admin.auth().createCustomToken(firebaseUid)

    return { user, token: customToken }
  } catch (error: any) {
    console.error('Error authenticating user:', error)
    throw new Error('Authentication failed')
  }
}
