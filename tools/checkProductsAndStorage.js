#!/usr/bin/env node
const admin = require('firebase-admin')

async function main() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Please set GOOGLE_APPLICATION_CREDENTIALS to your service-account.json path')
    process.exit(1)
  }

  const storageBucketEnv = process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: storageBucketEnv || undefined,
  })

  const db = admin.firestore()
  const bucket = admin.storage().bucket()

  try {
    const productsRef = db.collection('products')
    const snapshot = await productsRef.orderBy('createdAt', 'desc').limit(20).get()
    if (snapshot.empty) {
      console.log('No products found')
      return
    }

    for (const doc of snapshot.docs) {
      const data = doc.data()
      console.log('---')
      console.log('id:', doc.id)
      console.log('name:', data.name)
      console.log('image (field):', data.image)
      console.log('imagePath:', data.imagePath)

      if (data.imagePath) {
        const file = bucket.file(data.imagePath)
        try {
          const [exists] = await file.exists()
          console.log('storage exists:', exists)
          if (exists) {
            try {
              const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 60 * 60 * 1000 })
              console.log('signedUrl:', url)
            } catch (err) {
              console.warn('Could not get signed URL:', err.message)
            }
          }
        } catch (err) {
          console.warn('Error checking storage file:', err.message)
        }
      }
    }
  } catch (err) {
    console.error('Error querying products:', err)
    process.exitCode = 2
  }
}

main()
