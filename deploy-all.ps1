param(
  [string]$Project = 'accesshomehealth',
  [string]$Region = 'us-central1',
  [string]$FunctionName = 'sendOrderEmail',
  [string]$Runtime = 'nodejs18'
)
$FunctionsDir = Join-Path -Path (Get-Location) -ChildPath 'functions'
$SendGridSecret = 'projects/312957331450/secrets/SENDGRID_KEY:latest'
$FromAddressSecret = 'projects/312957331450/secrets/FROM_ADDRESS:latest'

Write-Output "Deploying Cloud Function $FunctionName via gcloud..."
gcloud functions deploy $FunctionName `
  --region=$Region `
  --project=$Project `
  --runtime=$Runtime `
  --entry-point=$FunctionName `
  --trigger-http `
  --source "$FunctionsDir" `
  --set-secrets=SENDGRID_KEY=$SendGridSecret `
  --set-secrets=FROM_ADDRESS=$FromAddressSecret `
  --timeout=60s `
  --memory=256MB `
  --quiet

Write-Output "Deploying Hosting via Firebase CLI..."
firebase deploy --project=$Project --only hosting

Write-Output "Unified deploy complete. Hosting URL: https://accesshomehealth.web.app"
