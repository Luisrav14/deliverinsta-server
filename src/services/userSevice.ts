import User, { IUser } from '../models/User'
import admin from '../config/firebaseAdmin'

export const createUser = async (userData: Partial<IUser>): Promise<{ user: IUser; token: string }> => {
  try {
    const userRecord = await admin.auth().createUser({
      email: userData.email,
      password: userData.password
    })

    const token = await admin.auth().createCustomToken(userRecord.uid)

    const user = new User({
      firebaseId: userRecord.uid,
      ...userData
    })

    await user.save()

    return { user, token }
  } catch (error: any) {
    if (error.errorInfo) {
      throw new Error(error.errorInfo.code)
    } else {
      throw error
    }
  }
}

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id)
}

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find()
}

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, userData, { new: true })
}

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id)
}
