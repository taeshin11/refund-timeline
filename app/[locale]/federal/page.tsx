import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { EITCNotice } from '@/components/EITCNotice';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import Link from 'next/link';
import { ExternalLink, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

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
    title: 'Federal Tax Refund Guide 2025 — IRS Processing Times',
    description: 'Complete guide to federal IRS tax refunds for 2025. Processing times, filing methods, EITC rules, and how to check your refund status.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/federal`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/federal`])),
    },
  };
}

export default async function FederalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Federal Tax Refund Guide 2025',
    description: 'Complete guide to IRS federal tax refund processing times for 2025.',
  };

  return (
    <>
      <SchemaLD schema={schema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'Federal Tax Refund Guide' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Federal Tax Refund Guide 2025</h1>
          <p className="text-green-200 text-lg">
            Everything you need to know about your IRS federal tax refund
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <EITCNotice />

        {/* Key Dates */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">Key 2025 Tax Filing Dates</h2>
          <div className="space-y-3">
            {[
              { date: 'January 27, 2025', event: 'IRS begins accepting 2024 tax year returns', color: 'bg-green-100 text-green-800' },
              { date: 'February 15, 2025', event: 'Earliest EITC/ACTC refunds released (PATH Act)', color: 'bg-amber-100 text-amber-800' },
              { date: 'February 27, 2025', event: 'Most EITC/ACTC refunds expected to arrive', color: 'bg-amber-100 text-amber-800' },
              { date: 'April 15, 2025', event: 'Standard filing deadline for most taxpayers', color: 'bg-red-100 text-red-800' },
              { date: 'October 15, 2025', event: 'Extended filing deadline (if extension filed)', color: 'bg-blue-100 text-blue-800' },
            ].map((item) => (
              <div key={item.date} className="flex gap-3 items-start">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 ${item.color}`}>
                  {item.date}
                </span>
                <span className="text-sm text-green-800 pt-1">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Times */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">IRS Processing Times by Filing Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { method: 'E-file + Direct Deposit', time: '~21 days', desc: 'Fastest — most refunds within 21 calendar days', icon: '⚡' },
              { method: 'E-file + Paper Check', time: '~6 weeks', desc: 'Electronic filing but slower delivery method', icon: '📬' },
              { method: 'Paper Return + Direct Deposit', time: '~4 weeks', desc: 'Paper delays initial processing but faster delivery', icon: '📄' },
              { method: 'Paper Return + Paper Check', time: '6–8 weeks', desc: 'Slowest option — IRS strongly discourages', icon: '🐢' },
            ].map((item) => (
              <div key={item.method} className="bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-green-900 text-sm">{item.method}</p>
                    <p className="text-green-700 font-bold text-lg">{item.time}</p>
                    <p className="text-green-600 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdsterraDisplay />

        {/* Why Delays Happen */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">Common Reasons for Refund Delays</h2>
          <ul className="space-y-3">
            {[
              { reason: 'EITC or ACTC claim', desc: 'PATH Act requires hold until February 15' },
              { reason: 'Math errors on your return', desc: 'IRS will correct and may reduce your refund' },
              { reason: 'Identity verification needed', desc: 'IRS may mail an identity verification letter' },
              { reason: 'Paper return filed', desc: 'Takes 6-8 weeks vs. 21 days for e-file' },
              { reason: 'Incomplete return', desc: 'Missing W-2s, 1099s, or required forms' },
              { reason: 'Return selected for review', desc: 'Random or algorithm-triggered compliance check' },
              { reason: 'Offset for debts owed', desc: 'Child support, student loans, or back taxes' },
              { reason: 'Bank account issues', desc: 'Wrong routing/account number for direct deposit' },
            ].map((item) => (
              <li key={item.reason} className="flex gap-3">
                <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-green-900 text-sm">{item.reason}: </span>
                  <span className="text-green-700 text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Check Status */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h2 className="font-bold text-green-900 text-xl mb-3">How to Check Your Federal Refund Status</h2>
          <ol className="space-y-3 mb-5">
            {[
              'File your return electronically or by mail',
              'Wait 24 hours after e-filing (4 weeks after mailing)',
              'Visit irs.gov/refunds — the official IRS Where\'s My Refund tool',
              'Enter your SSN, filing status, and exact refund amount',
              'Check status: Return Received → Refund Approved → Refund Sent',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-green-800">
                <span className="bg-green-200 text-green-800 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.irs.gov/refunds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm"
            >
              IRS Where&apos;s My Refund <ExternalLink size={14} />
            </a>
            <Link
              href={`/${locale}/track`}
              className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm"
            >
              Full Tracking Guide
            </Link>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="font-bold text-blue-900 text-xl mb-4">Pro Tips to Get Your Refund Faster</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'File electronically — it\'s 3x faster than paper',
              'Choose direct deposit — arrives 1-2 weeks faster than a check',
              'File early in January/February — beat the rush',
              'Use IRS Free File if income is under $73,000',
              'Double-check your SSN and bank account numbers',
              'Make sure your W-2 and 1099 info is correct',
              'Don\'t file until you have all your documents',
              'Use e-signatures — faster than mailing',
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm text-blue-800">
                <CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
