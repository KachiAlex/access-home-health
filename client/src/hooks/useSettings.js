import { useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const useSettings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'app_settings', 'config'))
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data())
        } else {
          setSettings({ facebookAppId: '' })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSettings = async (newSettings) => {
    try {
      await setDoc(doc(db, 'app_settings', 'config'), newSettings, { merge: true })
      setSettings(newSettings)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return { settings, loading, error, updateSettings }
}
