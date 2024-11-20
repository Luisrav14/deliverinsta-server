import mongoose, { Schema, Document, model } from 'mongoose'

export interface IProductSubcategory extends Document {
  name: string
  parentCategory?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ProductSubategorySchema = new Schema<IProductSubcategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory'
    }
  },
  { timestamps: true }
)

export const ProductSubcategory = model<IProductSubcategory>('ProductSubategories', ProductSubategorySchema)
