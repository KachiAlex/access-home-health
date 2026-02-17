import axios from 'axios'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com'

const ensureCredentials = () => {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal client credentials are not configured')
  }
}

const getAccessToken = async () => {
  ensureCredentials()
  const response = await axios.post(
    `${PAYPAL_API_BASE}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  return response.data.access_token
}

export const createPayPalOrder = async ({ amount, currency = 'USD', description, items = [] }) => {
  if (!amount) {
    throw new Error('Amount is required to create PayPal order')
  }

  const accessToken = await getAccessToken()
  const orderPayload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: typeof amount === 'number' ? amount.toFixed(2) : amount,
        },
        description,
        items: items?.map((item) => ({
          name: item.name?.slice(0, 120) || 'Item',
          quantity: String(item.quantity || 1),
          unit_amount: {
            currency_code: currency,
            value: Number(item.price || 0).toFixed(2),
          },
        })),
      },
    ],
  }

  const response = await axios.post(`${PAYPAL_API_BASE}/v2/checkout/orders`, orderPayload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}

export const capturePayPalOrder = async (orderId) => {
  if (!orderId) {
    throw new Error('orderId is required to capture PayPal order')
  }

  const accessToken = await getAccessToken()
  const response = await axios.post(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response.data
}
