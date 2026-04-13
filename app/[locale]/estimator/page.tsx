import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { RefundEstimator } from '@/components/RefundEstimator';
import { EITCNotice } from '@/components/EITCNotice';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import { CheckCircle } from 'lucide-react';

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
    title: 'Tax Refund Estimator 2025 — How Much Will I Get Back?',
    description: 'Estimate your 2025 federal tax refund amount. Enter your income, withholding, and filing status to calculate your expected refund.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/estimator`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/estimator`])),
    },
  };
}

export default async function EstimatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tax Refund Estimator 2025',
    description: 'Estimate your federal tax refund amount for 2025.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <SchemaLD schema={schema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'Tax Refund Estimator' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Tax Refund Estimator 2025</h1>
          <p className="text-green-200 text-lg">
            Estimate how much federal refund you&apos;ll receive for tax year 2024
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <EITCNotice />

        <RefundEstimator />

        <AdsterraDisplay />

        {/* How to Use */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">How to Use This Estimator</h2>
          <ol className="space-y-3">
            {[
              { step: '1', text: 'Select your filing status (Single, Married Filing Jointly, etc.)' },
              { step: '2', text: 'Enter your total gross income for 2024' },
              { step: '3', text: 'Enter federal taxes withheld — find this in Box 2 of your W-2' },
              { step: '4', text: 'Choose standard deduction (recommended for most filers) or itemized' },
              { step: '5', text: 'Click "Estimate My Refund" to see your estimated refund amount' },
            ].map((item) => (
              <li key={item.step} className="flex gap-3 text-sm text-green-800">
                <span className="bg-green-100 text-green-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">
                  {item.step}
                </span>
                {item.text}
              </li>
            ))}
          </ol>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Disclaimer:</strong> This estimator provides a rough estimate based on the 2024 federal tax brackets and standard deductions.
          It does not account for all credits (EITC, CTC, education credits, etc.), additional income types, AMT, or state taxes.
          For an accurate calculation, use IRS Free File or a professional tax preparer.
        </div>

        {/* Tips for getting more */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h2 className="font-bold text-green-900 text-xl mb-4">Tips to Maximize Your Refund</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Check if you qualify for the Earned Income Tax Credit (EITC)',
              'Claim the Child Tax Credit if you have qualifying children',
              'Deduct student loan interest if applicable',
              'Claim home office deduction if self-employed',
              'Review retirement contributions (IRA, 401k)',
              'Check education credits (American Opportunity, Lifetime Learning)',
              'Consider itemizing if deductions exceed the standard amount',
              'Make sure all W-2s and 1099s are included',
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm text-green-800">
                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Standard Deductions Info */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">2024 Standard Deductions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: 'Single', amount: '$14,600' },
              { status: 'Married Filing Jointly', amount: '$29,200' },
              { status: 'Married Filing Separately', amount: '$14,600' },
              { status: 'Head of Household', amount: '$21,900' },
            ].map((item) => (
              <div key={item.status} className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                <p className="text-xs text-green-600 mb-1">{item.status}</p>
                <p className="text-xl font-bold text-green-800">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
