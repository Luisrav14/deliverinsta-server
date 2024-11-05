import { Schema } from 'mongoose'

const storeScheduleModel = new Schema(
  {
    day: {
      type: String,
      enum: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      required: true
    },
    openTime: {
      type: String,
      required: true
    },
    closeTime: {
      type: String,
      required: true
    }
  },
  { _id: false }
)

export default storeScheduleModel
