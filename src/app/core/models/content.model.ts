export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroContent {
  headline: string;
  subline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface ValueProposition {
  icon: string;
  title: string;
  description: string;
}

export interface CoreArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  link: string;
  icon: string;
}

export interface ServicePageContent {
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  intro: string;
  sections: ServiceSection[];
  ctaText: string;
}

export interface ServiceSection {
  title: string;
  content: string;
  bulletPoints?: string[];
  highlighted?: boolean;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description?: string;
}

export interface PersonProfile {
  name: string;
  title: string;
  image: ImageAsset;
  statement: string;
  timeline: TimelineEntry[];
}

export interface ContactInfo {
  companyName: string;
  owner: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface AboutTeaser {
  headline: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  image: ImageAsset;
}

export interface CtaBanner {
  headline: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  variant?: 'dark' | 'light';
}
