import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getAllStates, getStateBySlug } from '@/lib/states';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import Link from 'next/link';
import { ExternalLink, Clock, Calendar, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export function generateStaticParams() {
  const locales = routing.locales;
  const states = getAllStates();
  return locales.flatMap((locale) =>
    states.map((state) => ({ locale, state: state.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; state: string }>;
}): Promise<Metadata> {
  const { locale, state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};

  const title = stateData.hasStateTax
    ? `${stateData.name} Tax Refund Schedule 2025 — ${stateData.avgDays} Days Processing`
    : `${stateData.name} Tax Refund 2025 — No State Income Tax`;

  const desc = stateData.hasStateTax
    ? `${stateData.name} state tax refund typically takes ${stateData.avgDays} days for e-file. Check status at ${stateData.agency}. Filing deadline: ${stateData.filingDeadline}.`
    : `${stateData.name} has no state income tax, so no state refund applies. Learn about filing requirements.`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/states/${stateSlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/states/${stateSlug}`])
      ),
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ locale: string; state: string }>;
}) {
  const { locale, state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);

  if (!stateData) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${stateData.name} Tax Refund Schedule 2025`,
    description: stateData.notes,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://refund-timeline.vercel.app/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'States', item: `https://refund-timeline.vercel.app/${locale}/states` },
        { '@type': 'ListItem', position: 3, name: stateData.name },
      ],
    },
  };

  return (
    <>
      <SchemaLD schema={schema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'States', href: `/${locale}/states` },
            { label: stateData.name },
          ]} />
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600/50 p-2 rounded-lg">
              <MapPin size={20} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{stateData.name} Tax Refund 2025</h1>
          </div>
          <p className="text-green-200 text-lg">
            {stateData.hasStateTax
              ? `Average processing time: ${stateData.avgDays} days for e-file`
              : 'No state income tax — no state refund applicable'
            }
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {stateData.hasStateTax ? (
          <>
            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-green-200 p-4 text-center shadow-sm">
                <Clock className="text-green-500 mx-auto mb-2" size={24} />
                <p className="text-xs text-green-600 mb-1">E-file Processing Time</p>
                <p className="text-2xl font-bold text-green-900">{stateData.avgDays} days</p>
              </div>
              <div className="bg-white rounded-xl border border-green-200 p-4 text-center shadow-sm">
                <Calendar className="text-green-500 mx-auto mb-2" size={24} />
                <p className="text-xs text-green-600 mb-1">2025 Filing Deadline</p>
                <p className="text-xl font-bold text-green-900">{stateData.filingDeadline}</p>
              </div>
              <div className="bg-white rounded-xl border border-green-200 p-4 text-center shadow-sm">
                <MapPin className="text-green-500 mx-auto mb-2" size={24} />
                <p className="text-xs text-green-600 mb-1">Tax Agency</p>
                <p className="text-sm font-semibold text-green-900">{stateData.agency}</p>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h2 className="font-bold text-green-900 mb-2">Processing Details</h2>
              <p className="text-green-800 text-sm">{stateData.notes}</p>
            </div>

            {/* Check Status CTA */}
            {stateData.checkRefundUrl && (
              <div className="bg-white border border-green-200 rounded-xl p-5 shadow-sm">
                <h2 className="font-bold text-green-900 mb-3">Check Your {stateData.name} Refund Status</h2>
                <p className="text-green-700 text-sm mb-4">
                  Use the official {stateData.agency} portal to check your refund status.
                  You&apos;ll need your Social Security Number and refund amount.
                </p>
                <a
                  href={stateData.checkRefundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Check {stateData.abbr} Refund Status <ExternalLink size={16} />
                </a>
                {stateData.agencyUrl && (
                  <a
                    href={stateData.agencyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 inline-flex items-center gap-1 text-sm text-green-600 hover:underline"
                  >
                    Visit {stateData.agency} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}

            {/* Processing Timeline */}
            <div className="bg-white border border-green-200 rounded-xl p-5 shadow-sm">
              <h2 className="font-bold text-green-900 mb-4">{stateData.name} Refund Timeline</h2>
              <div className="space-y-3">
                {[
                  { label: 'E-file + Direct Deposit', days: stateData.avgDays, best: true },
                  { label: 'E-file + Paper Check', days: stateData.avgDays + 7, best: false },
                  { label: 'Paper Return', days: stateData.avgDays * 2, best: false },
                ].map((method) => (
                  <div key={method.label} className="flex items-center justify-between">
                    <span className="text-sm text-green-800 flex items-center gap-2">
                      {method.best ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : (
                        <Clock size={14} className="text-gray-400" />
                      )}
                      {method.label}
                    </span>
                    <span className={`text-sm font-semibold ${method.best ? 'text-green-700' : 'text-gray-600'}`}>
                      ~{method.days} days
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <AdsterraDisplay />

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h2 className="font-bold text-blue-900 mb-3">Tips to Get Your {stateData.name} Refund Faster</h2>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />File electronically instead of mailing a paper return</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />Choose direct deposit for the fastest refund delivery</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />File early in the season to avoid peak processing delays</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />Double-check your bank account number for direct deposit</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />Ensure your return has no math errors or missing information</li>
              </ul>
            </div>
          </>
        ) : (
          /* No State Tax */
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
            <AlertCircle className="text-gray-400 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-700 mb-3">No State Income Tax</h2>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              {stateData.name} does not have a state income tax on wages/salary.
              Residents do not file a state income tax return and will not receive a state tax refund.
            </p>
            <p className="text-gray-500 text-sm mb-6">{stateData.notes}</p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800 max-w-md mx-auto">
              <strong>Still need your federal refund?</strong> The IRS processes federal returns for all states.
              Check your federal refund status at IRS.gov.
            </div>
            <div className="mt-4 flex gap-3 justify-center">
              <a
                href="https://www.irs.gov/refunds"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                Check Federal Refund <ExternalLink size={14} />
              </a>
              <Link
                href={`/${locale}/states`}
                className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm"
              >
                View All States
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
