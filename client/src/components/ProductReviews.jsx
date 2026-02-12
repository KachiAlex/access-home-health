import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useReviews } from '../hooks/useReviews'

const ProductReviews = ({ productId }) => {
  const { user } = useAuth()
  const { reviews, loading, error, addReview } = useReviews(productId)
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Please log in to leave a review')
    if (!text) return alert('Please enter a review')
    try {
      setSubmitting(true)
      await addReview({ productId, userId: user.uid, rating, text })
      setText('')
      setRating(5)
      alert('Review submitted — thank you!')
    } catch (err) {
      alert('Error submitting review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-amber-400">{'★'.repeat(Math.round((reviews.reduce((s, r) => s + (r.rating||0), 0) || 0) / (reviews.length || 1)))}</div>
          <div className="text-sm text-gray-600">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
        </div>
        <button onClick={() => setOpen(!open)} className="text-sm text-blue-600 hover:underline">{open ? 'Hide reviews' : 'Write / View reviews'}</button>
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          {loading ? (
            <p className="text-sm">Loading reviews...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error loading reviews.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {reviews.map((r) => (
                <li key={r.id} className="p-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.userId || 'Customer'}</div>
                    <div className="text-amber-400">{'★'.repeat(r.rating || 5)}</div>
                  </div>
                  {r.text && <div className="text-gray-700">{r.text}</div>}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex items-center gap-2 mb-2">
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className={`text-2xl ${n <= rating ? 'text-amber-400' : 'text-gray-300'}`}>★</button>
              ))}
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="input mb-2" rows={2} placeholder="Optional review text" />
            <div className="flex gap-2">
              <button disabled={submitting} className="btn btn-primary text-sm">{submitting ? 'Submitting...' : 'Submit'}</button>
              <button type="button" onClick={() => { setOpen(false) }} className="btn btn-outline text-sm">Close</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ProductReviews
