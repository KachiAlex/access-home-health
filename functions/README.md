# Firebase Functions

This folder contains Firebase Cloud Functions. To install dependencies and deploy:

```bash
cd functions
npm install
# set SendGrid key via Firebase functions config
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
firebase deploy --only functions:sendOrderEmail
```

The `sendOrderEmail` function is an HTTPS callable that sends an email via SendGrid.
