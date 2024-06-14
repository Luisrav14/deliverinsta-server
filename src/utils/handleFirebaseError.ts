export const handleFirebaseError = (error: any): string => {
  let errorMessage = 'Unknown error'

  if (error.code) {
    switch (error.code) {
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
      case 'auth/email-already-in-use':
        errorMessage = 'El correo electrónico ya está en uso'
        break
      case 'auth/weak-password':
        errorMessage = 'La contraseña es demasiado débil'
        break
      case 'auth/operation-not-allowed':
        errorMessage = 'Operación no permitida'
        break
      // Agrega más casos según sea necesario
      default:
        errorMessage = 'Error desconocido'
        break
    }
  } else {
    errorMessage = error.message || 'Unknown error'
  }

  return errorMessage
}
