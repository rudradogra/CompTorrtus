// Site configuration types
export interface SocialMediaPlatform {
  handle: string;
  url: string;
}

export interface SocialMedia {
  title: string;
  description: string;
  platforms: {
    instagram: SocialMediaPlatform;
    facebook: SocialMediaPlatform;
    twitter: SocialMediaPlatform;
    linkedin: SocialMediaPlatform;
  };
}

export interface ContactInfo {
  pageTitle: string;
  description1: string;
  email: {
    title: string;
    description: string;
    address: string;
  };
  address: {
    title: string;
    description: string;
    full: string;
  };
  phone: {
    title: string;
    description: string;
    number: string;
    additionalInfo: string;
  };
  socialMedia: SocialMedia;
  website: {
    title: string;
    url: string;
  };
}

export interface Brand {
  name: string;
  displayName: string;
  tagline: string;
}

export interface Company {
  legalName: string;
  founded: string;
  location: string;
}

export interface SiteConfig {
  contact: ContactInfo;
  brand: Brand;
  company: Company;
}