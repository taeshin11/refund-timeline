import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';
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
    title: 'Terms of Use — RefundTimeline',
    description:
      'Terms of use for RefundTimeline. Refund timelines are estimates based on historical IRS data, not official IRS projections. Use IRS.gov for official refund status.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/terms`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/terms`])),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lastUpdated = 'April 13, 2026';

  return (
    <>
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'Terms of Use' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Terms of Use</h1>
          <p className="text-green-200">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5">
          <p className="text-yellow-800 font-medium text-sm leading-relaxed">
            <strong>Important:</strong> Refund timelines shown on RefundTimeline are <strong>estimates based on historical IRS data</strong>, not official IRS projections for your specific return. For your official refund status, always use the IRS{' '}
            <a href="https://www.irs.gov/refunds" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
              Where&apos;s My Refund
            </a>{' '}
            tool at IRS.gov. Nothing on this site constitutes tax advice.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            By accessing or using RefundTimeline (<strong>https://refund-timeline.vercel.app</strong>), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this site. We reserve the right to update these terms at any time; continued use of the site constitutes acceptance of any changes.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">2. Nature of Information — Estimates Only</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            All refund timelines, processing dates, and schedule information provided on RefundTimeline are <strong>estimates based on historical IRS processing data and community-reported experiences</strong>. They are:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Not official IRS projections or guarantees for any individual return',
              'Not binding representations of when you will receive your specific refund',
              'Not a substitute for the IRS official Where\'s My Refund tool (irs.gov/refunds)',
              'Subject to change based on IRS processing volumes, system outages, and policy changes',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-yellow-500 font-bold shrink-0">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            Individual refund timing depends on many factors specific to your return, including filing errors, identity verification requirements, debt offsets, PATH Act holds, and IRS workload. Always verify your status at{' '}
            <a href="https://www.irs.gov/refunds" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">IRS.gov</a>.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">3. Not Tax Advice</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Nothing on RefundTimeline constitutes tax, legal, or financial advice. The content is provided for informational and educational purposes only. For tax advice specific to your situation, consult a qualified tax professional such as a Certified Public Accountant (CPA), Enrolled Agent (EA), or tax attorney. For free tax assistance, the IRS offers{' '}
            <a href="https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">VITA and TCE programs</a>.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">4. No Government Affiliation</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            RefundTimeline is an independent, privately operated website. We are <strong>not affiliated with, endorsed by, or connected to</strong> the Internal Revenue Service (IRS), the U.S. Department of the Treasury, any state tax agency, or any other government body. References to IRS tools, forms, or publications are provided as informational links to official government sources.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">5. No Warranty</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This site is provided &quot;as is&quot; and &quot;as available&quot; without any warranty of any kind, express or implied, including but not limited to warranties of accuracy, completeness, merchantability, or fitness for a particular purpose. We make no warranty that the information on this site is error-free, up to date, or applicable to your specific circumstances. IRS rules, processing times, and schedules change; we make reasonable efforts to keep information current but cannot guarantee real-time accuracy.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">6. Limitation of Liability</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            To the fullest extent permitted by applicable law, RefundTimeline and its operators shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from your use of, or inability to use, this site or any information contained herein — including, without limitation, financial decisions made based on refund timeline estimates. Your use of this site is entirely at your own risk.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">7. Third-Party Links</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This site contains links to third-party websites, including IRS.gov and state tax agency portals. These links are provided for convenience only. We do not endorse, control, or assume responsibility for the content or privacy practices of any linked site. External links open in a new tab and are governed by their own terms and policies.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">8. Intellectual Property</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            The content, design, and code of RefundTimeline are owned by the site operators. You may not reproduce, distribute, or create derivative works from this content without written permission, except for personal, non-commercial use such as sharing a link or quoting brief passages with attribution.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">9. Governing Law</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            These Terms of Use are governed by and construed in accordance with the laws of the United States. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the federal and state courts located in the United States.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">10. Contact & Related Policies</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            For questions about these terms, please also review our{' '}
            <Link href={`/${locale}/privacy`} className="text-green-600 underline">Privacy Policy</Link>{' '}
            and{' '}
            <Link href={`/${locale}/about`} className="text-green-600 underline">About page</Link>.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <p className="text-green-800 text-sm mb-3">
            For your official IRS refund status, always go directly to the IRS:
          </p>
          <a
            href="https://www.irs.gov/refunds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-800 transition-colors text-sm"
          >
            IRS Where&apos;s My Refund — irs.gov/refunds
          </a>
        </div>

      </div>
    </>
  );
}
