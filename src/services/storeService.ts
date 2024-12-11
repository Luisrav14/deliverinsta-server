import Store, { IStore } from '../models/Store'

export const createStore = async (storeData: IStore): Promise<IStore> => {
  const store = new Store(storeData)
  return await store.save()
}

export const getStoreById = async (id: string): Promise<IStore | null> => {
  return await Store.findOne({ uid: id })
}

export const getAllStores = async (query: any): Promise<IStore[]> => {
  return await Store.find(query)
}

export const updateStore = async (id: string, userData: Partial<IStore>): Promise<IStore | null> => {
  return await Store.findByIdAndUpdate(id, userData, { new: true })
}

export const deleteStore = async (id: string): Promise<IStore | null> => {
  return await Store.findByIdAndDelete(id)
}
