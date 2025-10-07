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

// Generate social media links from configuration
export const socialMediaLinks = (() => {
  const platforms = getSocialMediaPlatforms();
  return [
    {
      title: "Instagram",
      href: platforms.instagram.url,
      icon: "/icons/socialMediaIcons/instagram.svg",
    },
    {
      title: "Linkedin", 
      href: platforms.linkedin.url,
      icon: "/icons/socialMediaIcons/linkedin.svg",
    },
    {
      title: "Facebook",
      href: platforms.facebook.url, 
      icon: "/icons/socialMediaIcons/facebook.svg",
    },
    {
      title: "Twitter",
      href: platforms.twitter.url,
      icon: "/icons/socialMediaIcons/twitter.svg",
    },
  ];
})();

export const faqsData = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of services, including web development, mobile app development, UI/UX design, SEO, digital marketing, and more.",
  },
  {
    question: "Do you specialize in any particular industry?",
    answer:
      "We have experience working across various industries, including e-commerce, healthcare, education, finance, and more. Our team is adaptable and can tailor solutions to meet the specific needs of different sectors.",
  },
  {
    question: "Do you provide maintenance and support services?",
    answer:
      "We offer a comprehensive range of services, including web development, mobile app development, UI/UX design, SEO, digital marketing, and more.",
  },
  {
    question: "What is your development process like?",
    answer:
      "We offer a comprehensive range of services, including web development, mobile app development, UI/UX design, SEO, digital marketing, and more.",
  },
  {
    question: "Do you offer website hosting and domain registration?",
    answer:
      "We offer a comprehensive range of services, including web development, mobile app development, UI/UX design, SEO, digital marketing, and more.",
  },
];

export const landingPageFaqs = [
  {
    question:
      "What makes Menoob's GTA 6 oversized T-shirts different from regular gaming merchandise?",
    answer:
      "Our GTA 6 oversized T-shirts are crafted with premium 100% cotton fabric, featuring authentic Rockstar-inspired designs with superior print quality that doesn't fade or crack. Each shirt is designed with the perfect oversized fit that gaming enthusiasts love, combining comfort with style.",
  },
  {
    question: "What sizes are available for GTA 6 oversized T-shirts?",
    answer:
      "We offer sizes from S to XL in our oversized fit collection. Our oversized design means even smaller sizes provide a relaxed, comfortable fit. We recommend checking our detailed size chart for the perfect fit based on your preferred level of oversized styling.",
  },
  {
    question: "Are Menoob GTA 6 T-shirts made with 100% cotton?",
    answer:
      "Yes, all our GTA 6 oversized T-shirts are made with premium 100% cotton fabric sourced from certified suppliers. This ensures maximum breathability, comfort, and durability for long gaming sessions and daily wear.",
  },
  {
    question: "How is the print quality on GTA 6 oversized T-shirts?",
    answer:
      "We use advanced DTG (Direct-to-Garment) printing technology and high-quality reactive inks that ensure vibrant colors and sharp details. Our prints are designed to withstand multiple washes without fading, cracking, or peeling.",
  },
  {
    question: "Can I get custom designs on my GTA 6 oversized T-shirt?",
    answer:
      "Absolutely! Menoob offers custom-made GTA 6 oversized T-shirts where you can add your gaming username, favorite GTA characters, or personalized text. Contact our design team to discuss your custom requirements.",
  },
  {
    question:
      "How do I place an order for a GTA 6 oversized T-shirt on menoob.in?",
    answer:
      "Simply browse our GTA 6 collection, select your preferred design and size, add to cart, and proceed to checkout. We accept multiple payment methods including UPI, cards, and net banking for your convenience.",
  },
  {
    question:
      "Do you offer bulk orders for GTA 6 T-shirts for gaming communities?",
    answer:
      "Yes, we provide special bulk pricing for gaming communities, esports teams, and group orders. Contact us directly for custom quotes on orders of 10 or more GTA 6 oversized T-shirts.",
  },
  {
    question: "What is the delivery time for GTA 6 oversized T-shirts?",
    answer:
      "Standard delivery takes 3-7 business days across India. For custom-made GTA 6 T-shirts, allow an additional 2-3 days for production. We also offer express delivery options for urgent orders.",
  },
  {
    question: "Do you ship GTA 6 T-shirts internationally?",
    answer:
      "Currently, we ship within India only. However, we're expanding our international shipping options. Follow us on social media for updates on global shipping availability.",
  },
  {
    question: "Is there a tracking facility for my GTA 6 T-shirt order?",
    answer:
      "Yes, once your order is dispatched, you'll receive a tracking number via SMS and email. You can track your GTA 6 oversized T-shirt order in real-time through our website or the courier partner's portal.",
  },
  {
    question:
      "How should I wash my GTA 6 oversized T-shirt to maintain quality?",
    answer:
      "Wash in cold water (30°C max), turn inside out before washing, avoid bleach, and air dry preferably. Iron on medium heat if needed. Following these steps will keep your GTA 6 T-shirt looking fresh and extend its lifespan.",
  },
  {
    question: "Will the GTA 6 design fade after washing?",
    answer:
      "Our premium printing technology ensures designs remain vibrant even after multiple washes. However, following proper care instructions will maximize the longevity of your GTA 6 oversized T-shirt's appearance.",
  },
  {
    question: "Are Menoob GTA 6 T-shirts made in India?",
    answer:
      "Yes, all our GTA 6 oversized T-shirts are proudly made in India using local manufacturing facilities that maintain international quality standards. We support local craftsmanship while delivering world-class gaming merchandise.",
  },
  {
    question: "Is Menoob an official Rockstar Games merchandise partner?",
    answer:
      "Menoob creates original designs inspired by gaming culture. Our GTA 6 T-shirts feature unique artistic interpretations and are not official Rockstar Games licensed products. All designs are original creations by our design team.",
  },
  {
    question: "Can I buy GTA 6 oversized T-shirts as gifts?",
    answer:
      "Definitely! Our GTA 6 T-shirts make perfect gifts for gaming enthusiasts. We offer gift wrapping options and can include personalized messages. Many customers choose our custom-made options for special occasions.",
  },
  {
    question: "What is the price range for GTA 6 oversized T-shirts?",
    answer:
      "Our GTA 6 oversized T-shirts are competitively priced starting from ₹599 for standard designs. Custom-made and premium quality options are priced higher. Check our website for current pricing and ongoing offers.",
  },
  {
    question: "Do you offer discounts on GTA 6 T-shirt purchases?",
    answer:
      "Yes, we regularly offer seasonal discounts, bulk order discounts, and special promotional offers. Subscribe to our newsletter and follow our social media channels for the latest deals on GTA 6 merchandise.",
  },
  {
    question: "What is the return policy for GTA 6 oversized T-shirts?",
    answer:
      "We offer a 7-day return policy for unused items in original condition with tags attached. Custom-made GTA 6 T-shirts are non-returnable unless there's a manufacturing defect.",
  },
  {
    question: "Can I exchange my GTA 6 T-shirt for a different size?",
    answer:
      "Yes, size exchanges are accepted within 7 days of delivery, provided the item is unused and in original condition. You'll need to cover return shipping costs for size exchanges.",
  },
  {
    question: "What if I receive a damaged GTA 6 oversized T-shirt?",
    answer:
      "If you receive a damaged or defective GTA 6 T-shirt, contact our customer support within 48 hours with photos. We'll arrange a free replacement or full refund as per your preference.",
  },
];

