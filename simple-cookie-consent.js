// Simple Cookie Consent Pop-Up Using GTM and JavaScript
// By Muhammad Ali - muhammadali.xyz
// Read more on https://muhammadali.xyz/js-simple-cookie-consent/

(function() {
  // Configurations
  var consentHeading = 'Your Cookie Preferences';
  var consentMessage = 'This website uses cookies to give our users the best experience. You can manage your settings below or find out by reading our <a href="#">Cookie Policy</a>.';
  var consentAllowBtn = 'Allow All Cookies';
  var consentDenyBtn = 'Use Necessary Only';
  var consentModalId = 'simple-cookie-consent'; // ID of pop-up modal
  var cookieName = 'cookie-consent'; // Name of consent cookie
  var cookieValidity = 12; // Cookie expiry in months
  var consentUpdate = 0000000000000; // Consent policy update timestamp, in milliseconds (13 chars)
  var cookieDomain = location.hostname; // Default location.hostname - Do not edit if unsure

  // Specify HTML and CSS
  var consentModalHTML = '<div class="cookie-consent-container"><div class="cookie-consent-notice"><h5>'+consentHeading+'</h5><hr><p>'+consentMessage+'</p></div><div class="cookie-consent-selection"><button value="false" class="cookie-consent-deny">'+consentDenyBtn+'</button><button value="true" class="cookie-consent-allow">'+consentAllowBtn+'</button></div></div>';
  var consentModalCSS = '#'+consentModalId+'{height:100vh;width:100vw;position:fixed;top:0;left:0;resize:vertical;overflow:auto;z-index:999999999;background:rgba(0,0,0,.7)}#simple-cookie-consent .cookie-consent-container{position:absolute;top:50%;left:20px;right:20px;margin:-100px auto 0;background:#fff;padding:20px;max-width:500px}#simple-cookie-consent .cookie-consent-selection{text-align:right}#simple-cookie-consent button{border:none;padding:10px 20px;margin:10px 0 0 10px;background:0 0;font-size:1.1em}#simple-cookie-consent button.cookie-consent-allow{background-color:#04aa6d;color:#fff}#simple-cookie-consent button.cookie-consent-allow:focus,#simple-cookie-consent button.cookie-consent-allow:hover{background-color:#059862;cursor:pointer}#simple-cookie-consent button.cookie-consent-deny{padding:5px 0;font-size:.9em;opacity:.8}#simple-cookie-consent button.cookie-consent-deny:focus,button.cookie-consent-deny:hover{opacity:1;cursor:pointer}#simple-cookie-consent hr{margin:15px 0}';

  // Function to get cookie by name 
  var documentCookies = document.cookie;
  function getCookie(name) {
    var v = documentCookies.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }
  var userConsent = getCookie(cookieName); // Get consent cookie

  function triggerModal() {
    // Insert HTML into the <body>
    var consentDiv = document.createElement('div');
    consentDiv.setAttribute('id', consentModalId);
    consentDiv.innerHTML = consentModalHTML;
    document.body.appendChild(consentDiv);

    // Insert CSS into the <head>
    var consentCSS = document.createElement('style');
    consentCSS.innerHTML = consentModalCSS;
    document.head.appendChild(consentCSS);

    var consentModal = document.getElementById(consentModalId);
    var consentButtons = document.querySelectorAll('#'+consentModalId+' .cookie-consent-selection button');
    consentButtons = Array.prototype.slice.apply(consentButtons);
    for (var i = 0; i < consentButtons.length; ++i) {
      consentButtons[i].addEventListener('click', function(e) {
        e.preventDefault();
        setConsent(this.getAttribute('value'));
        consentModal.parentNode.removeChild(consentModal);
      });
    }
  }

  // Function to set consent cookie
  function setConsent(consent) {
    var cookieExpiry = new Date(); // Get current date
    cookieExpiry = new Date(cookieExpiry.setMonth(cookieExpiry.getMonth() + cookieValidity)); // Create expiry date
    document.cookie = cookieName+'={"consent":'+consent+',"timestamp": "'+Date.now()+'"}; domain='+cookieDomain+'; path=/; expires='+cookieExpiry+';'; // Create new cookie
    try {
      dataLayer.push({'event': 'cookie-consent'});
    } catch(e) {
    console.log(e.message);
    }
  }

  //Check if user consent exists (userConsent variable will now has JSON-like value)
  if(userConsent) { // if userConsent variable exists
    userConsent = JSON.parse(userConsent); // Parse into JSON object
    if(userConsent.timestamp < consentUpdate) { // Compare cookie timestamp with consentUpdate
      document.cookie = cookieName+'=; domain='+cookieDomain+'; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Delete existing cookie
      triggerModal(); // Trigger pop-up
    }
  } else {
    triggerModal();
  }
})();