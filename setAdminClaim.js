const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

async function setAdmin(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log('Custom claim set for', uid);
    process.exit(0);
  } catch (err) {
    console.error('Error setting claim:', err);
    process.exit(1);
  }
}

// Replace with the user's UID (found in Firebase Console -> Authentication -> user)
const uid = 'aANGlr0gyOQFdgEaWw3vTz0gtX53';
setAdmin(uid);
