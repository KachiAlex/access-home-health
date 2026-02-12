import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from '../config/firebase'

// Log an analytics event to Firestore
export async function logEvent(type, payload = {}) {
  try {
    const ref = collection(db, 'analytics')
    await addDoc(ref, {
      type,
      payload,
      createdAt: new Date(),
    })
  } catch (err) {
    console.error('Error logging analytics event', err)
  }
}

// Fetch analytics events (simple list)
export async function fetchEvents(limit = 200) {
  const q = query(collection(db, 'analytics'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export default { logEvent, fetchEvents }
