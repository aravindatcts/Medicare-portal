// ─────────────────────────────────────────────
// Shared TypeScript Interfaces — CMS Content
// ─────────────────────────────────────────────

export interface CmsImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface CmsBlock<T = any> {
  id: string;
  componentType: string;
  props: T;
}

export interface CmsPage {
  id: string;
  title: string;
  blocks: CmsBlock[];
}

// Example specific block props
export interface CmsHeroBannerProps {
  tag: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaAction: string;
  backgroundImage?: CmsImage;
}

export interface CmsFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CmsFaqSectionProps {
  title: string;
  faqs: CmsFaqItem[];
}
