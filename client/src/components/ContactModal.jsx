import { useState } from 'react'

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  if (!open) return null

  const validate = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required'
    if (!form.message.trim()) return 'Message is required'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) return alert(err)
    setLoading(true)
    try {
      // Try calling a /api/contact endpoint (server) first
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, to: 'support@accesshomehealthsupplies.com' }),
      })
      if (resp.ok) {
        setSuccess(true)
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        // fallback: try cloud function callable endpoint
        const fnResp = await fetch('/.netlify/functions/sendContact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, to: 'support@accesshomehealthsupplies.com' }),
        })
        if (fnResp.ok) {
          setSuccess(true)
          setForm({ name: '', email: '', phone: '', message: '' })
        } else {
          throw new Error('Send failed')
        }
      }
    } catch (err) {
      console.warn('Contact send failed', err)
      // final fallback: open mailto
      const mailto = `mailto:support@accesshomehealthsupplies.com?subject=${encodeURIComponent('Contact from website')}&body=${encodeURIComponent(`${form.name}\n${form.phone}\n\n${form.message}`)}`
      window.location.href = mailto
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
        </div>
        {success ? (
          <div className="p-4 bg-green-50 rounded">
            <p className="text-green-700">Thank you — your message has been sent. We will respond shortly.</p>
            <div className="mt-4 text-right">
              <button onClick={onClose} className="btn btn-primary">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
            <input className="input" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="input" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <textarea className="input" placeholder="Message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
