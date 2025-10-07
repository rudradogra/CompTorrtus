export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image: string;
}

export interface MetadataDefaults {
  image: string;
  twitterCard: string;
}

export interface MetadataConfig {
  pages: {
    [key: string]: PageMetadata;
  };
  defaults: MetadataDefaults;
}