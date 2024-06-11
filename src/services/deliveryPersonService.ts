import DeliveryPerson, { IDeliveryPerson } from '../models/DeliveryPerson'

export const createDeliveryP = async (deliveryPData: IDeliveryPerson): Promise<IDeliveryPerson> => {
  const deliveryP = new DeliveryPerson(deliveryPData)
  return await deliveryP.save()
}

export const getDeliveryById = async (id: string): Promise<IDeliveryPerson | null> => {
  return await DeliveryPerson.findById(id)
}

export const getAllDeliveryP = async (): Promise<IDeliveryPerson[]> => {
  return await DeliveryPerson.find()
}

export const updateDeliveryP = async (id: string, userData: Partial<IDeliveryPerson>): Promise<IDeliveryPerson | null> => {
  return await DeliveryPerson.findByIdAndUpdate(id, userData, { new: true })
}

export const deleteDeliveryP = async (id: string): Promise<IDeliveryPerson | null> => {
  return await DeliveryPerson.findByIdAndDelete(id)
}
