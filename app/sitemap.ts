import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllStates } from '@/lib/states';
import { getAllFAQs } from '@/lib/faqs';

const BASE_URL = 'https://refund-timeline.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const states = getAllStates();
  const faqs = getAllFAQs();

  const staticRoutes = ['', '/states', '/estimator', '/federal', '/eitc', '/track', '/faq'];

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  const statePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    states.map((state) => ({
      url: `${BASE_URL}/${locale}/states/${state.slug}`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const faqPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    faqs.map((faq) => ({
      url: `${BASE_URL}/${locale}/faq/${faq.slug}`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...statePages, ...faqPages];
}
