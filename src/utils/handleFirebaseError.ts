export const handleFirebaseError = (errorCode: string): string => {
  let errorMessage = 'Unknown error'

  switch (errorCode) {
    case 'auth/wrong-password':
      errorMessage = 'Contraseña incorrecta'
      break
    case 'auth/user-not-found':
      errorMessage = 'Usuario no encontrado'
      break
    case 'auth/invalid-email':
      errorMessage = 'Correo electrónico no válido'
      break
    case 'auth/invalid-credential':
      errorMessage = 'Credenciales inválidas'
      break
    case 'auth/email-already-exists':
      errorMessage = 'El correo electrónico ya está en uso'
      break
    case 'auth/weak-password':
      errorMessage = 'La contraseña es demasiado débil'
      break
    case 'auth/operation-not-allowed':
      errorMessage = 'Operación no permitida'
      break
    default:
      errorMessage = 'Error desconocido'
      break
  }

  return errorMessage
}
