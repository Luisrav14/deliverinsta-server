import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a unique file name using UUID.
 * @param originalFileName - The original file name.
 * @param folderPath - The folder where the file will be stored.
 * @returns A unique file path.
 */
export const generateUniqueFileName = (originalFileName: string, folderPath: string): string => {
  const fileExtension = originalFileName.split('.').pop() || ''
  const uniqueId = uuidv4()
  return `${folderPath}/${uniqueId}.${fileExtension}`
}

export const cleanFilePath = (url: string): string => {
  const parsedUrl = new URL(url)
  return parsedUrl.pathname.substring(1)
}
