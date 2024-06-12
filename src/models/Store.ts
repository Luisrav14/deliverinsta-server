import mongoose, { Document, Schema } from 'mongoose'
import { StoreCategory, StoreStatus } from '../enums/storeStatus'

export interface IStore extends Document {
  uid: string
  name: string
  address: string
  googleMaps?: string
  email: string
  phone: string
  description?: string
  category: StoreCategory
  openTime: string
  closeTime: string
  daysOpen: string[]
  status: StoreStatus
  createdAt: string
  updatedAt: string
}

const storeSchema: Schema = new Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    googleMaps: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    category: {
      type: String,
      enum: Object.values(StoreCategory),
      required: true
    },
    schedule: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IStore>('Store', storeSchema)
