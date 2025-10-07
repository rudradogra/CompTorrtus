export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutContent {
  paragraphs: string[];
}

export interface AboutData {
  title: string;
  icon: string;
  image: AboutImage;
  content: AboutContent;
}

export interface AboutConfig {
  about: AboutData;
}