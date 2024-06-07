import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

export const verifyFirebaseToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    throw new Error('Invalid Firebase token')
  }
}
