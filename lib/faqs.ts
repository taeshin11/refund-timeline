import faqData from '@/data/faq-fallback.json';

export type FAQ = {
  slug: string;
  question: string;
  answer: string;
  category: string;
};

export function getAllFAQs(): FAQ[] {
  return faqData as FAQ[];
}

export function getFAQBySlug(slug: string): FAQ | null {
  return getAllFAQs().find((f) => f.slug === slug) || null;
}

export function getFAQSlugs(): string[] {
  return getAllFAQs().map((f) => f.slug);
}

export function getFAQsByCategory(category: string): FAQ[] {
  return getAllFAQs().filter((f) => f.category === category);
}
