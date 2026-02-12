const functions = require('firebase-functions')

// Keep module initialization minimal to avoid deploy-time timeouts.
// Lazy-load SendGrid and other heavy modules inside the function handler.

// Secrets are provided to the runtime via Secret Manager bindings (set during
// deployment). Access them through `process.env.SENDGRID_KEY` / `process.env.FROM_ADDRESS`.
// Use the standard https callable export to ensure compatibility with the
// Functions runtime loader.
exports.sendOrderEmail = functions.https.onCall(async (data, context) => {
  const { to, subject, html } = data || {}
  if (!to || !subject || !html) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing email parameters')
  }

  // Resolve secret: Secret Manager binding -> legacy config -> env
  let SENDGRID_KEY = process.env.SENDGRID_KEY || null
  try {
    const cfg = functions.config && functions.config().sendgrid
    SENDGRID_KEY = SENDGRID_KEY || (cfg && cfg.key) || process.env.SENDGRID_API_KEY || null
  } catch (e) {
    SENDGRID_KEY = SENDGRID_KEY || process.env.SENDGRID_API_KEY || null
  }

  // Normalize the key: ensure string and remove surrounding whitespace/newlines
  SENDGRID_KEY = SENDGRID_KEY ? String(SENDGRID_KEY).trim() : null
  if (!SENDGRID_KEY) {
    console.warn('SendGrid key not set; email skipped')
    return { success: false, message: 'SendGrid not configured' }
  }

  // Resolve FROM address: prefer secret-binding env, then legacy config, then env
  let FROM_ADDRESS = process.env.FROM_ADDRESS || null
  try {
    const cfg = functions.config && functions.config().sendgrid
    FROM_ADDRESS = FROM_ADDRESS || (cfg && cfg.from) || process.env.FROM_ADDRESS || null
  } catch (e) {
    FROM_ADDRESS = FROM_ADDRESS || process.env.FROM_ADDRESS || null
  }
  FROM_ADDRESS = FROM_ADDRESS ? String(FROM_ADDRESS).trim() : 'no-reply@accesshomehealthsupplies.com'

  // Branding: sender display name. Can be overridden via secret or env `FROM_NAME`.
  let FROM_NAME = process.env.FROM_NAME || null
  try {
    const cfg = functions.config && functions.config().sendgrid
    FROM_NAME = FROM_NAME || (cfg && cfg.from_name) || process.env.FROM_NAME || null
  } catch (e) {
    FROM_NAME = FROM_NAME || process.env.FROM_NAME || null
  }
  FROM_NAME = FROM_NAME ? String(FROM_NAME).trim() : 'Access Home Health Medical Supplies'

  let sgMail
  try {
    sgMail = require('@sendgrid/mail')
  } catch (e) {
    console.error('SendGrid module missing', e)
    throw new functions.https.HttpsError('internal', 'SendGrid module not installed')
  }

  try {
    if (typeof sgMail.setApiKey === 'function') sgMail.setApiKey(SENDGRID_KEY)
  } catch (e) {
    console.warn('sgMail.setApiKey failed', e)
  }

  try {
    await sgMail.send({
      to,
      from: { email: FROM_ADDRESS, name: FROM_NAME },
      replyTo: FROM_ADDRESS,
      subject,
      html,
    })
    return { success: true }
  } catch (err) {
    console.error('SendGrid error', err)
    // Return error details for debugging (temporary). Include message and
    // SendGrid response body if available. Do NOT include the API key.
    const errorDetail = {
      message: err && err.message ? err.message : String(err),
      responseBody: err && err.response && err.response.body ? err.response.body : null,
    }
    return { success: false, error: errorDetail }
  }
})

// HTTP wrapper for easy testing and non-callable clients.
exports.sendOrderEmailHttp = functions.https.onRequest(async (req, res) => {
  try {
    const payload = req.body && req.body.data ? req.body.data : req.body
    const { to, subject, html } = payload || {}
    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing email parameters' })
    }

    // Resolve SendGrid key and sender same as callable function
    let SENDGRID_KEY = process.env.SENDGRID_KEY || null
    try {
      const cfg = functions.config && functions.config().sendgrid
      SENDGRID_KEY = SENDGRID_KEY || (cfg && cfg.key) || process.env.SENDGRID_API_KEY || null
    } catch (e) {
      SENDGRID_KEY = SENDGRID_KEY || process.env.SENDGRID_API_KEY || null
    }
    SENDGRID_KEY = SENDGRID_KEY ? String(SENDGRID_KEY).trim() : null
    if (!SENDGRID_KEY) return res.status(500).json({ error: 'SendGrid not configured' })

    let FROM_ADDRESS = process.env.FROM_ADDRESS || null
    try {
      const cfg = functions.config && functions.config().sendgrid
      FROM_ADDRESS = FROM_ADDRESS || (cfg && cfg.from) || process.env.FROM_ADDRESS || null
    } catch (e) {
      FROM_ADDRESS = FROM_ADDRESS || process.env.FROM_ADDRESS || null
    }
    FROM_ADDRESS = FROM_ADDRESS ? String(FROM_ADDRESS).trim() : 'no-reply@accesshomehealthsupplies.com'

    let FROM_NAME = process.env.FROM_NAME || null
    try {
      const cfg = functions.config && functions.config().sendgrid
      FROM_NAME = FROM_NAME || (cfg && cfg.from_name) || process.env.FROM_NAME || null
    } catch (e) {
      FROM_NAME = FROM_NAME || process.env.FROM_NAME || null
    }
    FROM_NAME = FROM_NAME ? String(FROM_NAME).trim() : 'Access Home Health Medical Supplies'

    let sgMail
    try {
      sgMail = require('@sendgrid/mail')
      if (typeof sgMail.setApiKey === 'function') sgMail.setApiKey(SENDGRID_KEY)
    } catch (e) {
      console.error('SendGrid setup error', e)
      return res.status(500).json({ error: 'SendGrid setup failed' })
    }

    try {
      await sgMail.send({ to, from: { email: FROM_ADDRESS, name: FROM_NAME }, replyTo: FROM_ADDRESS, subject, html })
      return res.status(200).json({ success: true })
    } catch (err) {
      console.error('SendGrid error', err)
      const errorDetail = {
        message: err && err.message ? err.message : String(err),
        responseBody: err && err.response && err.response.body ? err.response.body : null,
      }
      return res.status(500).json({ success: false, error: errorDetail })
    }
  } catch (e) {
    console.error('sendOrderEmailHttp error', e)
    return res.status(500).json({ error: String(e) })
  }
})
