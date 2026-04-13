import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getAllFAQs } from '@/lib/faqs';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Tax Refund FAQ 2025 — Common Questions Answered',
    description: 'Answers to the most common tax refund questions. When will I get my refund? Why is my refund delayed? How do I track my IRS refund?',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/faq`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/faq`])),
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const faqs = getAllFAQs();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <SchemaLD schema={faqSchema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'FAQ' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Tax Refund FAQ 2025</h1>
          <p className="text-green-200 text-lg">
            Answers to {faqs.length} common tax refund questions
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <FAQAccordion faqs={faqs} />
        <AdsterraDisplay />
      </div>
    </>
  );
}
