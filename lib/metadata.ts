import { Metadata } from 'next';
import { getBrandDisplayName, getContactInfo, getContactPageContent } from './contactUs/contactUs';
import { getImagePath } from '@/utils/imageToCdn';
import metadataData from './menoob/menoobMetadata.json';
import { MetadataConfig } from './contactUs/metadata.types';

const typedMetadataData = metadataData as MetadataConfig;

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export const generateMetadata = (config: MetadataOptions): Metadata => {
  const brandName = getBrandDisplayName();
  const contactInfo = getContactInfo();
  const baseUrl = contactInfo.website.url;
  
  const fullTitle = `${config.title} - ${brandName}`;
  const url = config.path ? `${baseUrl}${config.path}` : baseUrl;
  const imageUrl = config.image || getImagePath("/banner/banner.png");
  
  return {
    title: fullTitle,
    description: config.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: fullTitle,
      description: config.description,
      url: url,
      images: [
        {
          url: imageUrl,
          alt: `${config.title} - ${brandName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: config.description,
      images: [
        {
          url: imageUrl,
          alt: `${config.title} - ${brandName}`,
        },
      ],
    },
  };
};

// Get page metadata from JSON configuration
export const getPageMetadata = (pageKey: string): Metadata => {
  const pageConfig = typedMetadataData.pages[pageKey];
  if (!pageConfig) {
    throw new Error(`Metadata not found for page: ${pageKey}`);
  }
  
  return generateMetadata({
    title: pageConfig.title,
    description: pageConfig.description,
    path: pageConfig.path,
    image: pageConfig.image,
  });
};

// Predefined metadata for common pages
export const getHomeMetadata = (): Metadata => {
  return getPageMetadata('home');
};

export const getContactMetadata = (): Metadata => {
  const contactPageContent = getContactPageContent();
  const contactInfo = getContactInfo();
  
  return generateMetadata({
    title: contactPageContent.pageTitle,
    description: contactPageContent.description1,
    path: "/contact",
    image: getImagePath("/banner/banner.png"),
  });
};

export const getProfileMetadata = (): Metadata => {
  return getPageMetadata('profile');
};

// New helper functions for other pages
export const getLandingPageMetadata = (): Metadata => {
  return getPageMetadata('landingPage');
};

export const getProductsMetadata = (): Metadata => {
  return getPageMetadata('products');
};

export const getLoginMetadata = (): Metadata => {
  return getPageMetadata('login');
};

export const getSignupMetadata = (): Metadata => {
  return getPageMetadata('signup');
};

export const getAdminMetadata = (): Metadata => {
  return getPageMetadata('admin');
};

export const getCancellationAndRefundMetadata = (): Metadata => {
  return getPageMetadata('cancellationAndRefund');
};

export const getCancellationAndRefundPolicyMetadata = (): Metadata => {
  return getPageMetadata('cancellationAndRefundPolicy');
};