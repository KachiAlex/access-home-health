import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

export async function uploadProductImage(file, path = 'products') {
  if (!file) throw new Error('No file provided')
  const filename = `${Date.now()}_${file.name}`
  const storageRef = ref(storage, `${path}/${filename}`)
  const snapshot = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  return { url, path: snapshot.ref.fullPath }
}

export default { uploadProductImage }
