import { Metadata } from 'next';
import policies from './menoobPolicies.json';
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