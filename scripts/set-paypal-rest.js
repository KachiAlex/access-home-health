const { GoogleAuth } = require('google-auth-library')
const https = require('https')
const path = require('path')
const fs = require('fs')

async function main() {
  const keyPath = path.join(__dirname, '..', 'service-account.json')
  if (!fs.existsSync(keyPath)) {
    throw new Error(`service-account.json not found at ${keyPath}`)
  }

  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/datastore'],
  })
  const client = await auth.getClient()
  const token = await client.getAccessToken()
  if (!token || !token.token) throw new Error('Failed to obtain access token')

  const body = JSON.stringify({
    fields: {
      paypalClientId: { stringValue: 'C6D677GUTXPV4' }
    }
  })

  const options = {
    hostname: 'firestore.googleapis.com',
    path: '/v1/projects/accesshomehealth/databases/(default)/documents/app_settings/config?updateMask.fieldPaths=paypalClientId',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}`,
      'Content-Length': Buffer.byteLength(body),
    },
  }

  await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          console.log('paypalClientId set OK')
          resolve()
        } else {
          console.error('Failed', res.statusCode, data)
          reject(new Error(`Status ${res.statusCode}`))
        }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
