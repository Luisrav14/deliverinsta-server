import { Schema, Document, model } from 'mongoose'

export interface IProductCategory extends Document {
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

export const ProductCategory = model<IProductCategory>('ProductCategory', ProductCategorySchema)
