import { SiteConfig } from './contactUs.types';
import siteConfigData from '../menoob/meNoobContact.json';

// Type-safe configuration getter
export const getSiteConfig = (): SiteConfig => {
  return siteConfigData as SiteConfig;
};

// Convenience functions for specific sections
export const getContactInfo = () => getSiteConfig().contact;
export const getBrandInfo = () => getSiteConfig().brand;
export const getCompanyInfo = () => getSiteConfig().company;

// Helper functions for common use cases
export const getBrandName = () => getSiteConfig().brand.name;
export const getBrandDisplayName = () => getSiteConfig().brand.displayName;
export const getContactEmail = () => getSiteConfig().contact.email.address;
export const getContactPhone = () => getSiteConfig().contact.phone.number;
export const getCompanyAddress = () => getSiteConfig().contact.address.full;

// Website helpers
export const getWebsiteUrl = () => getSiteConfig().contact.website.url;

// Social media helpers
export const getSocialMediaPlatforms = () => getSiteConfig().contact.socialMedia.platforms;
export const getInstagramUrl = () => getSiteConfig().contact.socialMedia.platforms.instagram.url;
export const getInstagramHandle = () => getSiteConfig().contact.socialMedia.platforms.instagram.handle;

// Contact page content helpers
export const getContactPageContent = () => ({
  pageTitle: getSiteConfig().contact.pageTitle,
  description1: getSiteConfig().contact.description1,
});

// Brand tagline helper
export const getBrandTagline = () => getSiteConfig().brand.tagline;

// Company information helpers
export const getCompanyLegalName = () => getSiteConfig().company.legalName;
export const getCompanyFoundedYear = () => getSiteConfig().company.founded;
export const getCompanyLocation = () => getSiteConfig().company.location;