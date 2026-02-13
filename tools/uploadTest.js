#!/usr/bin/env node
const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

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

  const bucket = admin.storage().bucket()

  // Create a small test file buffer
  const content = `upload test ${new Date().toISOString()}`
  const filename = `products/test-upload-${Date.now()}.txt`
  const file = bucket.file(filename)

  try {
    await file.save(Buffer.from(content), { resumable: false })
    console.log('Uploaded test file to', filename)
    try {
      const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 60 * 60 * 1000 })
      console.log('Signed URL (valid 1h):', url)
    } catch (err) {
      console.warn('Could not create signed URL:', err.message)
    }
  } catch (err) {
    console.error('Upload failed:', err.message || err)
    process.exitCode = 2
  }
}

main()
