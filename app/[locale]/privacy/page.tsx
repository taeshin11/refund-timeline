import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';

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
    title: 'Privacy Policy — RefundTimeline',
    description:
      'RefundTimeline privacy policy. We do not collect SSNs, tax return data, or sensitive financial information. Learn what data we collect and how it is used.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/privacy`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/privacy`])),
    },
  };
}

export default async function PrivacyPage({
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
            { label: 'Privacy Policy' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-green-200">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-green-800 font-medium">
            <strong>Key point:</strong> RefundTimeline does <strong>not</strong> collect Social Security Numbers, tax return data, income information, or any sensitive financial information. This site is an informational resource only.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">1. Who We Are</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            RefundTimeline (<strong>https://refund-timeline.vercel.app</strong>) is an independent informational website that provides estimates and educational content about IRS federal and state tax refund processing times. We are not affiliated with the Internal Revenue Service (IRS), any state tax agency, or any government body.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">2. Information We Do Not Collect</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">We explicitly do <strong>not</strong> collect or store:</p>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Social Security Numbers (SSNs) or Individual Taxpayer Identification Numbers (ITINs)',
              'Tax return data, income figures, or filing details',
              'Bank account numbers or financial account information',
              'Refund amounts or tax liability figures',
              'Passwords or authentication credentials',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">3. Information We Do Collect</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Log Data</h3>
              <p className="leading-relaxed">When you visit our site, our hosting provider (Vercel) automatically collects standard server log data, including your IP address, browser type, referring URL, pages visited, and timestamps. This data is used for security monitoring and performance optimization.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Visitor Counts</h3>
              <p className="leading-relaxed">We maintain aggregate visitor counts (today&apos;s visitors and total visitors) for internal analytics. These counts are not tied to individual identities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Cookies</h3>
              <p className="leading-relaxed">We use minimal cookies required for site functionality. We do not use tracking cookies for advertising profiling beyond what third-party ad networks (see below) may set independently.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">4. Third-Party Services</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Google AdSense</h3>
              <p className="leading-relaxed">We use Google AdSense to display advertisements. Google may use cookies and similar technologies to serve ads based on your prior visits to our site or other sites. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">google.com/settings/ads</a>.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Vercel (Hosting)</h3>
              <p className="leading-relaxed">Our site is hosted on Vercel. Vercel processes request data as part of delivering our content. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Vercel&apos;s Privacy Policy</a>.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">5. Data Retention</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Server log data is retained for up to 30 days for security purposes, then automatically deleted. Aggregate visitor counts are retained indefinitely but contain no personally identifiable information.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">6. Children&apos;s Privacy</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This site is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">7. Your Rights</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Depending on your jurisdiction, you may have rights to access, correct, or delete personal data we hold about you. Because we collect only minimal server log data (which is automatically purged), most requests will result in confirmation that we hold no personal data about you. To make a request, contact us at the information below.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">8. Changes to This Policy</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;last updated&quot; date at the top of this page. Continued use of the site after any changes constitutes acceptance of the updated policy.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-green-900 mb-3">9. Contact</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            If you have questions about this Privacy Policy, please review our{' '}
            <a href={`/${locale}/about`} className="text-green-600 underline">About page</a>{' '}
            or visit our{' '}
            <a href={`/${locale}/terms`} className="text-green-600 underline">Terms of Use</a>.
          </p>
        </div>

      </div>
    </>
  );
}
