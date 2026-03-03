console.log('Access Health functions: loading index.js')
const functions = require('firebase-functions')

// --- PayPal helpers ---
const PAYPAL_BASE = 'https://api-m.sandbox.paypal.com'
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_SECRET = process.env.PAYPAL_SECRET

const missingCreds = !PAYPAL_CLIENT_ID || !PAYPAL_SECRET

async function getAccessToken() {
  if (missingCreds) {
    console.error('PayPal creds missing at runtime', {
      hasId: !!PAYPAL_CLIENT_ID,
      hasSecret: !!PAYPAL_SECRET,
      envKeys: Object.keys(process.env || {}).filter((k) => k.startsWith('PAYPAL')),
    })
    throw new Error('PayPal credentials not configured (PAYPAL_CLIENT_ID/PAYPAL_SECRET)')
  }
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')
  const resp = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`PayPal token error: ${resp.status} ${text}`)
  }
  const data = await resp.json()
  return data.access_token
}

const paypalCreateOrder = functions
  .runWith({ secrets: ['PAYPAL_CLIENT_ID', 'PAYPAL_SECRET'] })
  .https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  try {
    const { amount, currency = 'USD', description = 'Order', items = [] } = req.body || {}
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    const accessToken = await getAccessToken()
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: { currency_code: currency, value: Number(amount).toFixed(2) },
          description,
          items: items.map((item) => ({
            name: item.name,
            quantity: String(item.quantity || 1),
            unit_amount: {
              currency_code: currency,
              value: Number(item.price || 0).toFixed(2),
            },
          })),
        },
      ],
    }

    const resp = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await resp.json().catch(() => ({}))
    if (!resp.ok || !data.id) {
      console.error('PayPal create error', resp.status, data)
      return res.status(resp.status || 500).json({ error: data?.message || 'Create order failed' })
    }

    return res.status(200).json({ id: data.id })
  } catch (err) {
    console.error('paypalCreateOrder error', err)
    return res.status(500).json({ error: err.message || 'internal' })
  }
})

const paypalCaptureOrder = functions
  .runWith({ secrets: ['PAYPAL_CLIENT_ID', 'PAYPAL_SECRET'] })
  .https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  try {
    const { orderId } = req.body || {}
    if (!orderId) return res.status(400).json({ error: 'orderId is required' })

    const accessToken = await getAccessToken()
    const resp = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      console.error('PayPal capture error', resp.status, data)
      return res.status(resp.status || 500).json({ error: data?.message || 'Capture failed' })
    }

    return res.status(200).json({ success: true, orderId, details: data })
  } catch (err) {
    console.error('paypalCaptureOrder error', err)
    return res.status(500).json({ error: err.message || 'internal' })
  }
})

// Minimal no-op contact handler kept for deploy compatibility.
const sendContact = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  try {
    const payload = req.body || {}
    console.log('sendContact (noop) received payload:', JSON.stringify(payload))
    return res.status(200).json({ success: true, note: 'email flow disabled for deploy' })
  } catch (err) {
    console.error('sendContact noop error', err)
    return res.status(500).json({ error: 'internal' })
  }
})

exports.paypalCreateOrder = paypalCreateOrder
exports.paypalCaptureOrder = paypalCaptureOrder
exports.sendContact = sendContact
