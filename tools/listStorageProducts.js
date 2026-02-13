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

  const bucket = admin.storage().bucket()
  try {
    const [files] = await bucket.getFiles({ prefix: 'products/' })
    if (!files || files.length === 0) {
      console.log('No files found under products/')
      return
    }
    console.log(`Found ${files.length} files under products/:`)
    for (let i = 0; i < files.length && i < 20; i++) {
      const f = files[i]
      console.log('-', f.name)
      try {
        const [url] = await f.getSignedUrl({ action: 'read', expires: Date.now() + 60 * 60 * 1000 })
        console.log('  signedUrl:', url)
      } catch (err) {
        console.warn('  could not create signed url:', err.message)
      }
    }
  } catch (err) {
    console.error('Error listing files:', err.message)
    process.exitCode = 2
  }
}

main()
