// Custom Sidebar is useful in interactive browsers, but wall kiosks run inside
// Android WebViews where the global sidebar extension is unnecessary and can
// delay Home Assistant startup on older hardware.
const isAndroidWebView = /\bAndroid\b/i.test(navigator.userAgent)
  && /(?:;|\s)wv\)/i.test(navigator.userAgent);

if (!isAndroidWebView) {
  import("/hacsfiles/custom-sidebar/custom-sidebar-plugin.js?v=17.0.0");
}
