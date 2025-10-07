import { Metadata } from 'next';
import { getBrandDisplayName, getContactInfo } from './contactUs/contactUs';
import { getImagePath } from '@/utils/imageToCdn';

interface MetadataConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export const generateMetadata = (config: MetadataConfig): Metadata => {
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

// Predefined metadata for common pages
export const getHomeMetadata = (): Metadata => {
  const brandName = getBrandDisplayName();
  return generateMetadata({
    title: "Home",
    description: `${brandName} - A gamer's true identity. Discover exclusive gaming apparel and accessories.`,
    path: "/",
  });
};

export const getContactMetadata = (): Metadata => {
  const brandName = getBrandDisplayName();
  return generateMetadata({
    title: "Contact Us",
    description: `Get in touch with ${brandName} for inquiries, support, and more.`,
    path: "/contact",
  });
};

export const getProfileMetadata = (): Metadata => {
  const brandName = getBrandDisplayName();
  return generateMetadata({
    title: "Profile",
    description: `Manage your ${brandName} account, orders, and preferences.`,
    path: "/profile",
  });
};