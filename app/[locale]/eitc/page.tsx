import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import Link from 'next/link';
import { ExternalLink, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

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
    title: 'EITC/ACTC Refund Dates 2025 — When Will My Credit Refund Arrive?',
    description: 'EITC and ACTC refund dates for 2025. The PATH Act requires the IRS to hold these refunds until mid-February. Expected release dates and what to do.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/eitc`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/eitc`])),
    },
  };
}

export default async function EITCPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When will EITC refunds be released in 2025?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The IRS cannot issue EITC refunds before February 15, 2025 by law. Most EITC refunds are expected to arrive by late February to early March 2025, with the earliest deposits around February 27, 2025.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is my EITC refund delayed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The PATH Act requires the IRS to hold all EITC and ACTC refunds until February 15 each year to verify eligibility and combat fraud. This applies even if you filed in January.',
        },
      },
    ],
  };

  return (
    <>
      <SchemaLD schema={faqSchema} />

      <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'EITC/ACTC Refund Dates' },
          ]} />
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={28} className="text-amber-200" />
            <h1 className="text-3xl md:text-4xl font-bold">EITC/ACTC Refund Dates 2025</h1>
          </div>
          <p className="text-amber-100 text-lg">
            Earned Income Tax Credit and Additional Child Tax Credit refund schedule
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Main Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6">
          <h2 className="font-bold text-amber-900 text-xl mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-600" />
            PATH Act Hold — EITC Refunds Delayed Until February 15
          </h2>
          <p className="text-amber-800 mb-3">
            The Protecting Americans from Tax Hikes (PATH) Act, passed in 2015, requires the IRS to <strong>hold all refunds
            that include the Earned Income Tax Credit (EITC) or Additional Child Tax Credit (ACTC) until at least February 15</strong>.
          </p>
          <p className="text-amber-700 text-sm">
            This applies even if you filed your return on January 27 (the first day the IRS accepts returns).
            The IRS uses this time to verify EITC/ACTC eligibility and combat fraudulent claims.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">2025 EITC Refund Timeline</h2>
          <div className="space-y-4">
            {[
              { date: 'January 27, 2025', event: 'IRS begins accepting returns', status: 'done', note: 'File early even though refund is held' },
              { date: 'January 27 – February 14', event: 'EITC/ACTC returns processed — refunds held', status: 'hold', note: 'IRS verifies eligibility during this period' },
              { date: 'February 15, 2025', event: 'PATH Act hold lifts — IRS begins releasing EITC refunds', status: 'release', note: 'First day IRS can issue EITC refunds' },
              { date: 'February 27, 2025', event: 'Most early EITC filers receive direct deposit', status: 'deposit', note: 'Assuming no errors and direct deposit chosen' },
              { date: 'March 1–14, 2025', event: 'Additional EITC refunds continue to arrive', status: 'deposit', note: 'Later filers and paper return recipients' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                  item.status === 'done' ? 'bg-green-500' :
                  item.status === 'hold' ? 'bg-amber-400' :
                  item.status === 'release' ? 'bg-blue-500' :
                  'bg-green-600'
                }`} />
                <div>
                  <p className="font-semibold text-green-900 text-sm">{item.date}</p>
                  <p className="text-green-800 text-sm">{item.event}</p>
                  <p className="text-green-600 text-xs mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdsterraDisplay />

        {/* Who Qualifies */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">Who Qualifies for EITC?</h2>
          <p className="text-green-700 text-sm mb-4">
            The Earned Income Tax Credit is for low-to-moderate income workers. For 2024:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { children: 'No children', maxIncome: '$18,591', maxCredit: '$632' },
              { children: '1 child', maxIncome: '$49,084', maxCredit: '$4,213' },
              { children: '2 children', maxIncome: '$55,768', maxCredit: '$6,960' },
              { children: '3+ children', maxIncome: '$59,899', maxCredit: '$7,830' },
            ].map((item) => (
              <div key={item.children} className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                <p className="text-xs font-medium text-amber-700">{item.children}</p>
                <p className="text-sm font-bold text-amber-900 mt-1">Up to {item.maxCredit}</p>
                <p className="text-xs text-amber-600 mt-0.5">Income limit: {item.maxIncome}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">*Approximate limits for 2024. Single/MFS filers have lower thresholds.</p>
        </div>

        {/* Tips */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h2 className="font-bold text-green-900 text-xl mb-4">Tips for EITC Filers</h2>
          <ul className="space-y-3">
            {[
              { tip: 'File electronically', desc: 'E-filing is processed faster and you\'ll receive your refund sooner after the Feb 15 hold lifts.' },
              { tip: 'Choose direct deposit', desc: 'Direct deposit is 1-2 weeks faster than a paper check.' },
              { tip: 'File accurately', desc: 'Errors on your return can cause additional delays beyond the PATH Act hold.' },
              { tip: 'Don\'t buy refund anticipation loans', desc: 'RALs carry high fees — the wait is only a few extra weeks.' },
              { tip: 'Check IRS WMR after Feb 15', desc: 'Use Where\'s My Refund to track your refund status from Feb 15 onward.' },
            ].map((item) => (
              <li key={item.tip} className="flex gap-3">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-green-900 text-sm">{item.tip}: </span>
                  <span className="text-green-700 text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Check Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <h2 className="font-bold text-blue-900 text-xl mb-2">Check Your EITC Refund Status</h2>
          <p className="text-blue-700 text-sm mb-4">
            After February 15, use the IRS Where&apos;s My Refund tool to check your status.
            You&apos;ll need your SSN, filing status, and exact refund amount.
          </p>
          <a
            href="https://www.irs.gov/refunds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            IRS Where&apos;s My Refund <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
