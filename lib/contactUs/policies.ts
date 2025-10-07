import { Metadata } from 'next';
import policies from '../menoob/menoobPolicies.json';
import privacyPolicy from '../menoob/privacyPolicyMenoob.json';
import returnAndExchange from '../menoob/returnAndExchangeMenoob.json';
import shippingPolicy from '../menoob/shippingPolicyMenoob.json';
import termsAndConditions from '../menoob/termsAndConditionsMenoob.json';
import { getImagePath } from '../../utils/imageToCdn';

export interface PolicyItem {
  title?: string;
  content: string;
}

export interface PolicySection {
  title: string;
  type: string;
  items?: PolicyItem[];
  description?: string;
  content?: string;
  contactInfo?: {
    email: string;
    phone?: string | null;
  };
}

export interface PolicyData {
  title: string;
  lastUpdated: string;
  description: string;
  sections: PolicySection[];
}

export function getCancellationAndRefundPolicy(): PolicyData {
  return policies.cancellationAndRefund;
}

export function getPrivacyPolicy(): PolicyData {
  return privacyPolicy.privacyPolicy;
}

export function getReturnAndExchangePolicy(): PolicyData {
  return returnAndExchange.returnAndExchange;
}

export function getShippingPolicy(): PolicyData {
  return shippingPolicy.shippingPolicy;
}

export function getTermsAndConditions(): PolicyData {
  return termsAndConditions.termsAndConditions;
}

export function getCancellationAndRefundMetadata(): Metadata {
  const policy = policies.cancellationAndRefund;
  
  return {
    title: policy.title,
    description: "Understand our cancellation and refund policy for a seamless shopping experience at Menoob.",
    metadataBase: new URL("https://menoob.in/"),
    openGraph: {
      title: policy.title,
      description: "Understand our cancellation and refund policy for a seamless shopping experience at Menoob.",
      url: "https://www.menoob.in/cancellation-and-refund",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Cancellation and Refund Policy Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: policy.title,
      description: "Understand our cancellation and refund policy for a seamless shopping experience at Menoob.",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Cancellation and Refund Policy Image",
        },
      ],
    },
  };
}

export function getPrivacyPolicyMetadata(): Metadata {
  return {
    title: "Privacy Policy - Menoob",
    description: "Understand how we collect, use, and protect your information at Menoob.",
    metadataBase: new URL("https://menoob.in/"),
    openGraph: {
      title: "Privacy Policy - Menoob",
      description: "Understand how we collect, use, and protect your information at Menoob.",
      url: "https://www.menoob.in/privacy-policy",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Privacy Policy Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy - Menoob",
      description: "Understand how we collect, use, and protect your information at Menoob.",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Privacy Policy Image",
        },
      ],
    },
  };
}

export function getReturnAndExchangeMetadata(): Metadata {
  return {
    title: "Return & Exchange Policy - Menoob",
    description: "Understand our return and exchange policy to ensure a hassle-free shopping experience at Menoob.",
    metadataBase: new URL("https://menoob.in/"),
    openGraph: {
      title: "Return & Exchange Policy - Menoob",
      description: "Understand our return and exchange policy to ensure a hassle-free shopping experience at Menoob.",
      url: "https://www.menoob.in/return-policy",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Return Policy Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Return & Exchange Policy - Menoob",
      description: "Understand our return and exchange policy to ensure a hassle-free shopping experience at Menoob.",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Return Policy Image",
        },
      ],
    },
  };
}

export function getShippingPolicyMetadata(): Metadata {
  const policy = shippingPolicy.shippingPolicy;
  
  return {
    title: policy.title,
    description: "Understand our shipping policy for a smooth delivery experience at Menoob.",
    metadataBase: new URL("https://menoob.in/"),
    openGraph: {
      title: policy.title,
      description: "Understand our shipping policy for a smooth delivery experience at Menoob.",
      url: "https://www.menoob.in/shipping-policy",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Shipping Policy Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: policy.title,
      description: "Understand our shipping policy for a smooth delivery experience at Menoob.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: "https://www.menoob.in/shipping-policy",
    },
  };
}

export function getTermsAndConditionsMetadata(): Metadata {
  const policy = termsAndConditions.termsAndConditions;
  
  return {
    title: policy.title,
    description: "Please read our terms and conditions carefully before using our website.",
    metadataBase: new URL("https://menoob.in/"),
    openGraph: {
      title: policy.title,
      description: "Please read our terms and conditions carefully before using our website.",
      url: "https://www.menoob.in/terms-and-conditions",
      images: [
        {
          url: getImagePath("/banner/banner.png"),
          alt: "Terms and Conditions Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: policy.title,
      description: "Please read our terms and conditions carefully before using our website.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: "https://www.menoob.in/terms-and-conditions",
    },
  };
}
