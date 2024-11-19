import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  price: number
  description?: string
  category: mongoose.Types.ObjectId
  // stock: number
  image: string
  available: boolean
  storeId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
    /* stock: {
      type: Number,
      required: true,
      default: 0
    }, */
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model<IProduct>('Product', productSchema)
