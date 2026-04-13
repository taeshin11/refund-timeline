import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getAllStates, getStatesSortedBySpeed } from '@/lib/states';
import { StateTable } from '@/components/StateTable';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import Link from 'next/link';
import { MapPin, TrendingUp, Award } from 'lucide-react';

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
    title: 'State Tax Refund Processing Times 2025 — All 50 States',
    description:
      'Compare state tax refund processing times for all 50 states. Find your state\'s average refund timeline, filing deadline, and how to check your refund status.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/states`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/states`])),
    },
  };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allStates = getAllStates();
  const sortedStates = getStatesSortedBySpeed();
  const noTaxStates = allStates.filter((s) => !s.hasStateTax);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'State Tax Refund Processing Times 2025',
    description: 'Compare state tax refund processing times for all 50 states.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://refund-timeline.vercel.app/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'States' },
      ],
    },
  };

  return (
    <>
      <SchemaLD schema={schema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'State Tax Refunds' },
          ]} />
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600/50 p-2 rounded-lg">
              <MapPin size={20} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">State Tax Refund Schedule 2025</h1>
          </div>
          <p className="text-green-200 text-lg">
            Processing times and refund check links for all 50 states + DC
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Fastest / Slowest Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="text-green-600" size={18} />
              <h3 className="font-bold text-green-800">Fastest States</h3>
            </div>
            <ul className="space-y-2">
              {sortedStates.slice(0, 5).map((s) => (
                <li key={s.slug} className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/states/${s.slug}`} className="text-green-700 hover:underline font-medium">
                    {s.name}
                  </Link>
                  <span className="text-green-600 font-semibold">{s.avgDays} days</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-orange-600" size={18} />
              <h3 className="font-bold text-orange-800">Slowest States</h3>
            </div>
            <ul className="space-y-2">
              {[...sortedStates].reverse().slice(0, 5).map((s) => (
                <li key={s.slug} className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/states/${s.slug}`} className="text-orange-700 hover:underline font-medium">
                    {s.name}
                  </Link>
                  <span className="text-orange-600 font-semibold">{s.avgDays} days</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-700 mb-3">No State Income Tax</h3>
            <div className="flex flex-wrap gap-1.5">
              {noTaxStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${locale}/states/${s.slug}`}
                  className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                >
                  {s.abbr}
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              These states have no state income tax — no state refund applicable.
            </p>
          </div>
        </div>

        {/* Full Table */}
        <section>
          <h2 className="text-2xl font-bold text-green-900 mb-4">All States — Ranked by Refund Speed</h2>
          <StateTable states={sortedStates} locale={locale} showAll />
        </section>

        <AdsterraDisplay />

        {/* No Tax States Info */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h2 className="font-bold text-gray-800 text-xl mb-3">States with No Income Tax</h2>
          <p className="text-gray-600 text-sm mb-4">
            The following states do not have a state income tax, so there is no state tax refund applicable:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {noTaxStates.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/states/${s.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-500">{s.abbr} · No state tax</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
