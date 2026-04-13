import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getAllFAQs, getFAQBySlug, getFAQSlugs } from '@/lib/faqs';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { FAQAccordion } from '@/components/FAQAccordion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function generateStaticParams() {
  const locales = routing.locales;
  const slugs = getFAQSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) return {};

  return {
    title: faq.question,
    description: faq.answer.slice(0, 160),
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/faq/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/faq/${slug}`])
      ),
    },
  };
}

export default async function FAQSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const faq = getFAQBySlug(slug);

  if (!faq) notFound();

  const relatedFaqs = getAllFAQs()
    .filter((f) => f.slug !== slug && f.category === faq.category)
    .slice(0, 5);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }],
  };

  return (
    <>
      <SchemaLD schema={schema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'FAQ', href: `/${locale}/faq` },
            { label: faq.question.slice(0, 40) + '...' },
          ]} />
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{faq.question}</h1>
          <span className="bg-green-600/50 text-green-100 px-3 py-1 rounded-full text-xs capitalize">
            {faq.category.replace(/-/g, ' ')}
          </span>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm mb-8">
          <p className="text-green-800 leading-relaxed">{faq.answer}</p>
        </div>

        <Link href={`/${locale}/faq`} className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-800 mb-8">
          <ChevronLeft size={16} />
          Back to all FAQs
        </Link>

        {relatedFaqs.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-green-900 text-xl mb-4">Related Questions</h2>
            <FAQAccordion faqs={relatedFaqs} />
          </div>
        )}
      </div>
    </>
  );
}
