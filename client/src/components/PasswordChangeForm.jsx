import { useState } from 'react'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function PasswordChangeForm() {
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = async (e) => {
    e.preventDefault()
    if (!currentPwd || !newPwd || !confirmPwd) return alert('Please fill all fields')
    if (newPwd !== confirmPwd) return alert('New passwords do not match')
    const user = auth.currentUser
    if (!user) return alert('No authenticated user')

    setLoading(true)
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPwd)
      await reauthenticateWithCredential(user, cred)
      await updatePassword(user, newPwd)
      alert('Password updated successfully')
      setCurrentPwd('')
      setNewPwd('')
      setConfirmPwd('')
    } catch (err) {
      console.error(err)
      alert('Failed to change password: ' + (err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleChange} className="grid grid-cols-1 gap-3">
      <input type="password" placeholder="Current password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="input" />
      <input type="password" placeholder="New password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="input" />
      <input type="password" placeholder="Confirm new password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="input" />
      <div className="flex items-center space-x-3">
        <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Updating...' : 'Change Password'}</button>
      </div>
    </form>
  )
}
