#!/usr/bin/env bash
set -euo pipefail
# Unified deploy: functions via gcloud (avoids firebase CLI analyzer issues), then hosting via firebase
PROJECT="accesshomehealth"
REGION="us-central1"
FUNCTION_NAME="sendOrderEmail"
FUNCTIONS_DIR="$(pwd)/functions"
# Default runtime (can be overridden by exporting RUNTIME)
RUNTIME="${RUNTIME:-nodejs18}"
# Secret resource names (adjust if your project number changes)
SENDGRID_SECRET="projects/312957331450/secrets/SENDGRID_KEY:latest"
FROM_ADDRESS_SECRET="projects/312957331450/secrets/FROM_ADDRESS:latest"

echo "Deploying Cloud Function ${FUNCTION_NAME} via gcloud..."
gcloud functions deploy "$FUNCTION_NAME" \
  --region="$REGION" \
  --project="$PROJECT" \
  --runtime="$RUNTIME" \
  --entry-point="$FUNCTION_NAME" \
  --trigger-http \
  --source "$FUNCTIONS_DIR" \
  --set-secrets=SENDGRID_KEY=$SENDGRID_SECRET \
  --set-secrets=FROM_ADDRESS=$FROM_ADDRESS_SECRET \
  --timeout=60s \
  --memory=256MB \
  --quiet

echo "Deploying Hosting via Firebase CLI..."
firebase deploy --project="$PROJECT" --only hosting

echo "Unified deploy complete. Hosting URL: https://accesshomehealth.web.app"
