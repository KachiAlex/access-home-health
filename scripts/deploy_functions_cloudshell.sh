#!/usr/bin/env bash
set -euo pipefail

# Cloud Shell deploy helper for Firebase Functions
# Usage: Open Google Cloud Shell, clone this repo (if not already), then run:
#   bash scripts/deploy_functions_cloudshell.sh

echo "Starting Firebase Functions deploy for project: accesshomehealth"

# ensure project is set
gcloud config set project accesshomehealth

cd "$(dirname "$0")"/..
cd functions

echo "Installing dependencies (prefer npm ci; fall back to npm install)"
if npm ci; then
  echo "npm ci succeeded"
else
  echo "npm ci failed — falling back to npm install"
  npm install
fi

# Ensure firebase CLI is available; Cloud Shell typically has it.
if ! command -v firebase >/dev/null 2>&1; then
  echo "Installing Firebase CLI (this may ask for confirmation)"
  curl -sL https://firebase.tools | bash
fi

echo "Validating package.json and simple load check"
node -e "require('./index.js'); console.log('functions index loaded OK')"

echo "Deploying functions (debug output)"
npx firebase-tools deploy --only functions --project accesshomehealth --debug

echo "Deploy finished"
