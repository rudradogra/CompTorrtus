export const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Latest Collection",
    href: "/products",
  },
  {
    title: "About Us",
    href: "/#about",
  },
  // {
  //   title: "FAQ",
  //   href: "/products//gta-vi-oversized-t-shirt/#faq",
  // },
];

import { getSocialMediaPlatforms } from './contactUs/contactUs';
import faqData from './menoob/menoobFaqs.json';

// Generate social media links from configuration
export const socialMediaLinks = (() => {
  const platforms = getSocialMediaPlatforms();
  const links = [];
  
  if (platforms.instagram) {
    links.push({
      title: "Instagram",
      href: platforms.instagram.url,
      icon: "/icons/socialMediaIcons/instagram.svg",
    });
  }
  
  if (platforms.linkedin) {
    links.push({
      title: "Linkedin", 
      href: platforms.linkedin.url,
      icon: "/icons/socialMediaIcons/linkedin.svg",
    });
  }
  
  if (platforms.facebook) {
    links.push({
      title: "Facebook",
      href: platforms.facebook.url, 
      icon: "/icons/socialMediaIcons/facebook.svg",
    });
  }
  
  if (platforms.twitter) {
    links.push({
      title: "Twitter",
      href: platforms.twitter.url,
      icon: "/icons/socialMediaIcons/twitter.svg",
    });
  }
  
  return links;
})();

// Import FAQ data from JSON configuration
export const faqsData = faqData.generalFAQs;

export const landingPageFaqs = faqData.landingPageFAQs;

