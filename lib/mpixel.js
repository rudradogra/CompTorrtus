// Meta Pixel (Facebook Pixel) implementation
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Initialize Meta Pixel
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track custom events
export const event = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Standard e-commerce events
export const purchase = (value, currency = 'USD', contents = []) => {
  event('Purchase', {
    value: value,
    currency: currency,
    contents: contents
  });
};

export const addToCart = (contentName, contentIds, value, currency = 'USD') => {
  event('AddToCart', {
    content_name: contentName,
    content_ids: contentIds,
    value: value,
    currency: currency
  });
};

export const viewContent = (contentName, contentIds, value, currency = 'USD') => {
  event('ViewContent', {
    content_name: contentName,
    content_ids: contentIds,
    value: value,
    currency: currency
  });
};

export const initiateCheckout = (value, currency = 'USD', contents = []) => {
  event('InitiateCheckout', {
    value: value,
    currency: currency,
    contents: contents
  });
};

export const search = (searchString) => {
  event('Search', {
    search_string: searchString
  });
};

export const lead = () => {
  event('Lead');
};

export const completeRegistration = () => {
  event('CompleteRegistration');
};

// Initialize the pixel
export const initPixel = () => {
  if (typeof window === 'undefined' || !FB_PIXEL_ID) return;

  // Check if already initialized
  if (window.fbq) return;

  // Facebook Pixel Code
  /* eslint-disable */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Default export for easy importing
const metaPixel = {
  FB_PIXEL_ID,
  pageview,
  event,
  purchase,
  addToCart,
  viewContent,
  initiateCheckout,
  search,
  lead,
  completeRegistration,
  initPixel
};

export default metaPixel;