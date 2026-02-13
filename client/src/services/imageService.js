import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

export async function uploadProductImage(file, path = 'products') {
  if (!file) throw new Error('No file provided')
  const filename = `${Date.now()}_${file.name}`
  const storageRef = ref(storage, `${path}/${filename}`)
  try {
    console.log('Uploading product image to', storageRef.fullPath || `${path}/${filename}`)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    console.log('Upload successful, download URL:', url)
    return { url, path: snapshot.ref.fullPath }
  } catch (err) {
    console.error('uploadProductImage error:', err && err.message ? err.message : err)
    // rethrow so callers can handle and productService will fallback
    throw err
  }
}

export default { uploadProductImage }
