import aboutData from './aboutMenoob.json';
import type { AboutData, AboutConfig } from '@/lib/contactUs/about.types';

export function getAboutData(): AboutData {
  return (aboutData as AboutConfig).about;
}

export function getAboutTitle(): string {
  return getAboutData().title;
}

export function getAboutIcon(): string {
  return getAboutData().icon;
}

export function getAboutImage(): { src: string; alt: string } {
  return getAboutData().image;
}

export function getAboutContent(): string[] {
  return getAboutData().content.paragraphs;
}