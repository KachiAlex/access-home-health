// Minimal no-op contact handler to allow function deployment while email flow
// is disabled for debugging. Revert to real implementation after deploy.
console.log('Access Health functions: loading index.js')
const functions = require('firebase-functions')

exports.sendContact = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  try {
    // Accept the payload, log it, but do not attempt to send email.
    const payload = req.body || {}
    console.log('sendContact (noop) received payload:', JSON.stringify(payload))
    return res.status(200).json({ success: true, note: 'email flow disabled for deploy' })
  } catch (err) {
    console.error('sendContact noop error', err)
    return res.status(500).json({ error: 'internal' })
  }
})
