import sharp from 'sharp'
import s3 from '../config/s3Client'
import { PutObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3'

/**
 * Uploads files on AWS S3 and returns the location URL.
 * @param fileBuffer - The file buffer to upload.
 * @param filePath - The path in the bucket where the file will be stored.
 * @param optimizeImage - Whether to optimize the image using sharp.
 * @returns The URL of the uploaded file.
 */
export const uploadImage = async (fileBuffer: Buffer, filePath: string, optimizeImage: boolean = false): Promise<string> => {
  try {
    // Optimizar la imagen si es necesario
    if (optimizeImage) {
      fileBuffer = await sharp(fileBuffer).resize(1024).jpeg({ quality: 80 }).toBuffer()
    }

    const params: PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: filePath,
      Body: fileBuffer,
      ContentType: 'image/jpeg'
    }

    const data = await s3.upload(params).promise()
    return data.Location
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

/**
 * Deletes a file from AWS S3.
 * @param filePath - The path in the bucket where the file is stored.
 * @returns A confirmation message if the file was deleted successfully.
 */
export const deleteImage = async (filePath: string): Promise<boolean> => {
  try {
    const params: DeleteObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: filePath
    }

    await s3.deleteObject(params).promise()
    return true
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new Error(`Could not delete file ${filePath}.`)
  }
}
