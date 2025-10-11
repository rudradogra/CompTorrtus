'use client';

import Script from 'next/script';

// Meta Pixel component that only initializes the pixel (no automatic tracking)
const MetaPixel = () => {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

// Utility functions for tracking specific events
export const trackViewContent = (contentName: string, contentId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_ids: [contentId],
      value: value,
      currency: 'INR'
    });
  }
};

export const trackInitiateCheckout = (value: number, contents: Array<{id: string, quantity: number}> = []) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: value,
      currency: 'INR',
      contents: contents
    });
  }
};

export const trackAddToCart = (contentName: string, contentId: string, value: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: contentName,
      content_ids: [contentId],
      value: value,
      currency: 'INR'
    });
  }
};

export const trackPurchase = (value: number, contents: Array<{id: string, quantity: number}> = []) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: 'INR',
      contents: contents
    });
  }
};

export const trackProductClick = (contentName: string, contentId: string, source: string = 'homepage') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ProductClick', {
      content_name: contentName,
      content_ids: [contentId],
      source: source
    });
  }
};

export const trackRemoveFromCart = (contentName: string, contentId: string, value: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'RemoveFromCart', {
      content_name: contentName,
      content_ids: [contentId],
      value: value,
      currency: 'INR'
    });
  }
};

export default MetaPixel;