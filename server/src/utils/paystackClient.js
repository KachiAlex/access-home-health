import axios from 'axios'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_API_BASE = process.env.PAYSTACK_API_BASE || 'https://api.paystack.co'

const ensureCredentials = () => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('Paystack secret key is not configured')
  }
}

export const verifyPaystackTransaction = async (reference) => {
  ensureCredentials()
  if (!reference) {
    throw new Error('reference is required to verify Paystack transaction')
  }

  const response = await axios.get(`${PAYSTACK_API_BASE}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data?.data
}
