export const initFacebookSDK = (appId) => {
  if (!appId) {
    console.warn('Facebook App ID not configured')
    return false
  }

  if (window.FB) {
    // SDK already loaded, just update config
    FB.AppEvents.setAppId(appId)
    return true
  }

  // Load SDK dynamically
  window.fbAsyncInit = function() {
    FB.init({
      appId: appId,
      xfbml: true,
      version: 'v18.0'
    })
  }

  // Load the SDK script
  const script = document.createElement('script')
  script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=${appId}`
  script.async = true
  script.defer = true
  script.crossOrigin = 'anonymous'
  document.body.appendChild(script)

  return true
}

export const shareToFacebook = (product) => {
  const productUrl = `${window.location.origin}?product=${product.id}`
  const message = `Check out this amazing product: ${product.name} - $${product.price.toFixed(2)}`

  if (window.FB) {
    FB.ui(
      {
        method: 'share',
        href: productUrl,
        hashtag: '#MedicalSupplies',
        quote: message,
        display: 'popup',
      },
      function() {}
    )
  } else {
    // Fallback to simple share URL
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    window.open(shareUrl, 'facebook-share-dialog', 'width=800,height=600')
  }
}
