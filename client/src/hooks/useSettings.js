import { useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const defaultSettings = {
  facebookAppId: '',
  paypalClientId: '',
  paypalEnabled: true,
  paystackApiKey: '',
  paystackEnabled: true,
  sendGridKey: '',
}

export const useSettings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'app_settings', 'config'))
        if (settingsDoc.exists()) {
          setSettings({ ...defaultSettings, ...settingsDoc.data() })
        } else {
          setSettings(defaultSettings)
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
      setSettings((prev) => ({ ...(prev || {}), ...newSettings }))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return { settings, loading, error, updateSettings }
}
