import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getSchedule, scheduleData } from '@/lib/schedule';
import { getAllFAQs } from '@/lib/faqs';
import { RefundScheduleTable } from '@/components/RefundScheduleTable';
import { EITCNotice } from '@/components/EITCNotice';
import { DeadlineCountdown } from '@/components/DeadlineCountdown';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Timeline } from '@/components/Timeline';
import { SchemaLD } from '@/components/SchemaLD';
import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import Link from 'next/link';
import { ExternalLink, Clock, CheckCircle, DollarSign } from 'lucide-react';

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
    title: 'IRS Tax Refund Schedule 2025 — When Will I Get My Refund?',
    description:
      'Check the 2025 IRS tax refund schedule. Find out when your federal and state refund will arrive. Refund date estimator for e-file, paper return, direct deposit, and check.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}`])),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const rows = getSchedule();
  const faqs = getAllFAQs();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RefundTimeline',
    url: 'https://refund-timeline.vercel.app',
    description: 'Federal and state tax refund dates and schedule 2025.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://refund-timeline.vercel.app/${locale}/states/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check Your IRS Tax Refund Status',
    description: 'Step-by-step guide to tracking your 2025 federal tax refund using the IRS Where\'s My Refund tool.',
    totalTime: 'PT5M',
    step: [
      { '@type': 'HowToStep', name: 'File your return', text: 'File your federal tax return electronically for fastest processing.' },
      { '@type': 'HowToStep', name: 'Wait 24 hours', text: 'Wait 24 hours after e-filing (4 weeks for paper returns) before checking status.' },
      { '@type': 'HowToStep', name: 'Visit IRS WMR', text: 'Go to irs.gov/refunds — the official IRS Where\'s My Refund tool.' },
      { '@type': 'HowToStep', name: 'Enter your info', text: 'Enter your Social Security Number, filing status, and exact refund amount.' },
      { '@type': 'HowToStep', name: 'Check status', text: 'View your refund status: Return Received, Refund Approved, or Refund Sent.' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 10).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <SchemaLD schema={websiteSchema} />
      <SchemaLD schema={howToSchema} />
      <SchemaLD schema={faqSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-600/50 text-green-100 rounded-full px-4 py-1.5 text-sm mb-4">
            <Clock size={14} />
            2025 Tax Season · Accepting Returns Since Jan 27
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            When Will My Tax Refund Arrive?
          </h1>
          <p className="text-green-200 text-xl mb-6">
            2025 IRS & State Tax Refund Schedule
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.irs.gov/refunds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-md"
            >
              <ExternalLink size={16} />
              Check IRS Refund Status
            </a>
            <Link
              href={`/${locale}/estimator`}
              className="inline-flex items-center gap-2 bg-green-600 text-white border border-green-400 px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition-colors"
            >
              <DollarSign size={16} />
              Estimate My Refund
            </Link>
          </div>
          <p className="text-green-300 text-xs mt-4">
            Not affiliated with the IRS. For official info, visit{' '}
            <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="underline">
              IRS.gov
            </a>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* EITC Notice */}
        <EITCNotice />

        {/* Native Ad */}
        <AdsterraNativeBanner />

        {/* IRS Schedule Table */}
        <section>
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold text-green-900">IRS Refund Schedule 2025</h2>
              <p className="text-green-600 text-sm mt-1">
                Based on IRS processing guidelines · Last updated: January 15, 2025
              </p>
            </div>
            <div className="flex gap-2 text-xs flex-wrap">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg flex items-center gap-1">
                <CheckCircle size={12} /> E-file: ~21 days
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg flex items-center gap-1">
                <Clock size={12} /> Paper: 6–8 weeks
              </span>
            </div>
          </div>

          {/* Method Comparison Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { type: 'E-file + Direct Deposit', days: '~21 days', color: 'bg-green-50 border-green-200 text-green-800' },
              { type: 'E-file + Check', days: '~6 weeks', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { type: 'Paper + Direct Deposit', days: '~4 weeks', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
              { type: 'Paper + Check', days: '6–8 weeks', color: 'bg-orange-50 border-orange-200 text-orange-800' },
            ].map((method) => (
              <div key={method.type} className={`rounded-xl border p-3 text-center ${method.color}`}>
                <p className="text-xs font-medium mb-1">{method.type}</p>
                <p className="text-lg font-bold">{method.days}</p>
              </div>
            ))}
          </div>

          <RefundScheduleTable rows={rows} />
        </section>

        {/* Display Ad */}
        <AdsterraDisplay />

        {/* Filing Season Progress & Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeadlineCountdown />

          {/* Refund Steps */}
          <div className="bg-white rounded-xl border border-green-200 p-5 shadow-sm">
            <h3 className="font-bold text-green-900 mb-4">Refund Journey</h3>
            <Timeline />
          </div>
        </div>

        {/* State Quick Links */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-green-900">State Tax Refunds</h2>
            <Link href={`/${locale}/states`} className="text-sm text-green-600 hover:text-green-800 hover:underline">
              View all states →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              { slug: 'california', name: 'California', days: '21 days' },
              { slug: 'texas', name: 'Texas', days: 'No tax' },
              { slug: 'new-york', name: 'New York', days: '21 days' },
              { slug: 'florida', name: 'Florida', days: 'No tax' },
              { slug: 'illinois', name: 'Illinois', days: '21 days' },
              { slug: 'pennsylvania', name: 'Pennsylvania', days: '28 days' },
              { slug: 'colorado', name: 'Colorado', days: '7 days' },
              { slug: 'massachusetts', name: 'Massachusetts', days: '14 days' },
            ].map((state) => (
              <Link
                key={state.slug}
                href={`/${locale}/states/${state.slug}`}
                className="bg-white rounded-xl border border-green-200 p-3 hover:border-green-400 hover:shadow-md transition-all text-center"
              >
                <p className="font-semibold text-green-900 text-sm">{state.name}</p>
                <p className="text-xs text-green-600 mt-0.5">{state.days}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-green-900">Frequently Asked Questions</h2>
            <Link href={`/${locale}/faq`} className="text-sm text-green-600 hover:text-green-800 hover:underline">
              View all FAQs →
            </Link>
          </div>
          <FAQAccordion faqs={faqs} limit={8} />
        </section>

        {/* IRS Info Box */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="font-bold text-blue-900 text-xl mb-3">Key IRS Tax Refund Facts for 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-2">
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>IRS began accepting 2024 returns on <strong>January 27, 2025</strong></span></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>Filing deadline: <strong>April 15, 2025</strong> (extension: Oct 15)</span></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>E-file + direct deposit: <strong>within 21 days</strong></span></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>Paper returns: <strong>6–8 weeks</strong></span></li>
            </ul>
            <ul className="space-y-2">
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>EITC/ACTC holds until <strong>February 15</strong> (PATH Act)</span></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>Amended returns: <strong>8–16 weeks</strong></span></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>WMR updates <strong>once daily</strong> (overnight)</span></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /><span>Call IRS at <strong>800-829-1040</strong> if delayed past 21 days</span></li>
            </ul>
          </div>
          <div className="mt-4">
            <a
              href="https://www.irs.gov/refunds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              Check Your Refund at IRS.gov <ExternalLink size={14} />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
