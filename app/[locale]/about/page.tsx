import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CheckCircle, DollarSign, Clock, Users } from 'lucide-react';
import Link from 'next/link';

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
    title: 'About RefundTimeline — IRS Tax Refund Processing Times Tracker',
    description:
      'Learn how RefundTimeline tracks IRS tax refund processing times, state refund timelines, and Where\'s My Refund status updates based on aggregated user data and official IRS schedules.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/about`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/about`])),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'About' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">About RefundTimeline</h1>
          <p className="text-green-200 text-lg">
            Helping taxpayers estimate when to expect their IRS and state tax refund
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Mission */}
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            RefundTimeline was built to answer one of the most common tax-season questions: <strong>"When will I get my refund?"</strong> The IRS provides official processing timelines, but individual experiences vary based on filing method, complexity, and time of year. We aggregate that data to give you a realistic picture.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We track IRS federal refund processing times, all 50 state tax refund timelines, and real-time status categories from the IRS <em>Where's My Refund</em> tool — so you can set expectations and stop refreshing your bank account every hour.
          </p>
        </div>

        {/* What We Track */}
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-6">What We Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                color: 'text-green-600',
                bg: 'bg-green-50',
                title: 'IRS Processing Times',
                desc: 'Average days from acceptance to deposit for e-filed and paper returns, broken down by filing week, method, and delivery type.',
              },
              {
                icon: DollarSign,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                title: 'State Refund Timelines',
                desc: 'Each of the 50 states has its own processing window. We maintain up-to-date estimates for all state income tax refunds.',
              },
              {
                icon: CheckCircle,
                color: 'text-purple-600',
                bg: 'bg-purple-50',
                title: "Where's My Refund Status",
                desc: 'We explain what each IRS WMR status (Return Received, Refund Approved, Refund Sent) means and what to expect next.',
              },
              {
                icon: Users,
                color: 'text-orange-600',
                bg: 'bg-orange-50',
                title: 'Delay Reasons & Codes',
                desc: 'Common causes of refund delays — PATH Act holds, identity verification, TC 150/570/971 codes — explained in plain language.',
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className={`rounded-xl p-5 ${bg}`}>
                <Icon size={24} className={`${color} mb-3`} />
                <h3 className={`font-bold mb-2 ${color}`}>{title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Our Data Sources</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            RefundTimeline is based on two primary sources:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span><strong>Official IRS publications</strong> — including the annual IRS refund schedule, processing time announcements, and guidance documents published at IRS.gov.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span><strong>Aggregated community reports</strong> — anonymized, self-reported refund dates that allow us to build real-world processing time distributions alongside the official IRS data.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span><strong>State tax agency publications</strong> — each state's department of revenue or taxation publishes processing time estimates; we compile and update these throughout the tax season.</span>
            </li>
          </ul>
          <div className="mt-5 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <strong>Important:</strong> All timelines on this site are estimates. The IRS and individual states are the only official sources for your specific refund date. Always use the IRS{' '}
            <a href="https://www.irs.gov/refunds" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              Where&apos;s My Refund
            </a>{' '}
            tool for your official status.
          </div>
        </div>

        {/* What We Are Not */}
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-4">What RefundTimeline Is Not</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span>We are <strong>not affiliated</strong> with the IRS, any state tax agency, or any government body.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span>We do <strong>not provide tax advice</strong>. Nothing on this site constitutes legal, financial, or tax guidance.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span>We do <strong>not collect</strong> Social Security Numbers, tax return data, income figures, or any sensitive financial information.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span>We cannot <strong>speed up</strong> your refund or contact the IRS on your behalf.</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-green-900 mb-2">Ready to check your timeline?</h2>
          <p className="text-green-700 text-sm mb-4">Use our refund estimator or browse state-specific processing times.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/estimator`} className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-800 transition-colors text-sm">
              Refund Estimator
            </Link>
            <Link href={`/${locale}/states`} className="inline-flex items-center justify-center gap-2 bg-white text-green-700 border border-green-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm">
              State Refund Times
            </Link>
            <Link href={`/${locale}/how-to-use`} className="inline-flex items-center justify-center gap-2 bg-white text-green-700 border border-green-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm">
              How to Use This Site
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
