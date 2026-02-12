import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { uploadProductImage } from './imageService'

export const productsCollection = collection(db, 'products')

export const getProducts = async () => {
  try {
    const q = query(productsCollection, orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const addProduct = async (productData) => {
  try {
    // If a File was provided, attempt to upload it first and set image URL.
    // If upload fails, log the error and continue saving the product without an image.
    if (productData.imageFile) {
      try {
        const { url, path } = await uploadProductImage(productData.imageFile)
        productData.image = url
        productData.imagePath = path
        delete productData.imageFile
      } catch (uploadErr) {
        console.warn('Image upload failed, saving product without image:', uploadErr)
        // keep image/imagePath unset so product still saves
        delete productData.imageFile
      }
    }
    const docRef = await addDoc(productsCollection, {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { id: docRef.id, ...productData }
  } catch (error) {
    console.error('Error adding product:', error)
    throw error
  }
}

export const updateProduct = async (productId, productData) => {
  try {
    // If a new File was provided, attempt to upload and update image.
    // If upload fails, log and continue updating other fields.
    if (productData.imageFile) {
      try {
        const { url, path } = await uploadProductImage(productData.imageFile)
        productData.image = url
        productData.imagePath = path
        delete productData.imageFile
      } catch (uploadErr) {
        console.warn('Image upload failed during update; proceeding without image change:', uploadErr)
        delete productData.imageFile
      }
    }
    const productRef = doc(db, 'products', productId)
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date(),
    })
    return { id: productId, ...productData }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId))
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

export const seedProducts = async (products) => {
  try {
    for (const product of products) {
      await addProduct(product)
    }
    return true
  } catch (error) {
    console.error('Error seeding products:', error)
    throw error
  }
}
