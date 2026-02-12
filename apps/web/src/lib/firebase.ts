import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCg_os6nNaG-B_24raKr_vqdqwpoULgFP8",
  authDomain: "accesshomehealth.firebaseapp.com",
  projectId: "accesshomehealth",
  storageBucket: "accesshomehealth.firebasestorage.app",
  messagingSenderId: "312957331450",
  appId: "1:312957331450:web:b01d02d3597d87b07ee643",
  measurementId: "G-576XCJ82NV"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let analytics;

if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { analytics };
