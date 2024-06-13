import mongoose, { Document, Schema } from 'mongoose'
import { UserRole } from '../enums/userTypes'

export interface IUser extends Document {
  firebaseId: string
  name: string
  email: string
  password: string
  address: string
  phone: string
  type: UserRole
  created_at: string
  updated_at: string
}

const userSchema: Schema = new Schema(
  {
    firebaseId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    fullName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>('User', userSchema)
