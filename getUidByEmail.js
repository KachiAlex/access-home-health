const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'service-account.json');
try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch (err) {
  console.error('Failed to load service-account.json from', serviceAccountPath, err.message);
  process.exit(1);
}

const email = process.argv[2] || 'admin@accesshomehealthsupplies.com';

admin.auth().getUserByEmail(email)
  .then(user => {
    console.log('UID for', email, 'is', user.uid);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error fetching user by email:', err.code || err.message || err);
    process.exit(1);
  });
