import mongoose, { Document, Schema } from 'mongoose'
import { AvailabilityStatus } from '../enums/deliveryPerson'

export interface IDeliveryPerson extends Document {
  uid: mongoose.Types.ObjectId
  vehicleType: string
  licensePlate: string
  availabilityStatus: AvailabilityStatus
  currentLocation: string
  createdAt: Date
  updatedAt: Date
}

const deliveryPersonSchema: Schema = new Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    vehicleType: {
      type: String,
      required: true
    },
    licensePlate: {
      type: String,
      required: false
    },
    available: {
      type: Boolean,
      default: false
    },
    currentLocation: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

export default mongoose.model<IDeliveryPerson>('DeliveryPerson', deliveryPersonSchema)
