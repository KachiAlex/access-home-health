const admin = require('../functions/node_modules/firebase-admin')
const path = require('path')

async function main() {
  const serviceAccountPath = path.join(__dirname, '..', 'service-account.json')
  const serviceAccount = require(serviceAccountPath)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  const db = admin.firestore()
  await db.doc('app_settings/config').set({ paypalClientId: 'C6D677GUTXPV4' }, { merge: true })
  console.log('paypalClientId updated in app_settings/config')
}

main().catch((err) => {
  console.error('Failed to set paypalClientId', err)
  process.exit(1)
})
