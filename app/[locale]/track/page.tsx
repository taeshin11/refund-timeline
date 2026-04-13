import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { Timeline } from '@/components/Timeline';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';
import { ExternalLink, Smartphone, Globe, Phone, CheckCircle } from 'lucide-react';

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
    title: "Where's My Refund — How to Track Your IRS Tax Refund 2025",
    description: "How to track your IRS tax refund status using Where's My Refund, IRS2Go app, and phone. Step-by-step guide with links to official IRS tools.",
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/track`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/track`])),
    },
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: "How to Track Your IRS Tax Refund Status",
    description: "Step-by-step guide to checking your federal tax refund status using the IRS Where's My Refund tool.",
    totalTime: 'PT5M',
    step: [
      { '@type': 'HowToStep', name: 'File your return', text: 'File your federal tax return electronically for fastest processing.' },
      { '@type': 'HowToStep', name: 'Wait the required time', text: 'Wait 24 hours after e-filing or 4 weeks after mailing a paper return.' },
      { '@type': 'HowToStep', name: 'Go to IRS WMR', text: 'Visit irs.gov/refunds — the official IRS Where\'s My Refund tool.' },
      { '@type': 'HowToStep', name: 'Enter your information', text: 'Enter your Social Security Number, filing status, and exact refund amount.' },
      { '@type': 'HowToStep', name: 'View your status', text: 'See one of three statuses: Return Received, Refund Approved, or Refund Sent.' },
    ],
  };

  return (
    <>
      <SchemaLD schema={howToSchema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: "Track Your Refund" },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Track Your IRS Refund</h1>
          <p className="text-green-200 text-lg">
            Step-by-step guide to checking your 2025 federal tax refund status
          </p>
          <div className="mt-4 bg-green-600/30 text-green-100 text-xs px-3 py-1.5 rounded-full inline-block">
            ⚠️ This site is NOT affiliated with the IRS. For official info, visit IRS.gov
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Main CTA */}
        <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 text-center">
          <h2 className="font-bold text-green-900 text-2xl mb-2">IRS Where&apos;s My Refund</h2>
          <p className="text-green-700 mb-4">
            The official IRS tool to check your federal refund status — updated once daily
          </p>
          <a
            href="https://www.irs.gov/refunds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            <Globe size={20} />
            Go to IRS Where&apos;s My Refund
            <ExternalLink size={16} />
          </a>
          <p className="text-green-600 text-xs mt-3">Opens official IRS website in a new tab</p>
        </div>

        {/* 3 Ways to Check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <Globe className="text-blue-600" size={24} />,
              title: 'Online (irs.gov/refunds)',
              desc: 'Available 24/7. Updated daily, usually overnight. Works on any device.',
              link: 'https://www.irs.gov/refunds',
              linkText: 'Visit irs.gov/refunds',
            },
            {
              icon: <Smartphone className="text-green-600" size={24} />,
              title: 'IRS2Go Mobile App',
              desc: 'Free app for iOS and Android. Same info as the website, mobile-friendly.',
              link: 'https://www.irs.gov/newsroom/irs2goapp',
              linkText: 'Download IRS2Go',
            },
            {
              icon: <Phone className="text-purple-600" size={24} />,
              title: 'IRS Phone: 800-829-1954',
              desc: 'Call if online tools don\'t show info after 21 days (e-file) or 6 weeks (paper).',
              link: 'tel:18008291954',
              linkText: 'Call IRS',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
              <div className="mb-2">{item.icon}</div>
              <h3 className="font-bold text-green-900 text-sm mb-1">{item.title}</h3>
              <p className="text-green-700 text-xs mb-3">{item.desc}</p>
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs text-green-600 hover:text-green-800 font-semibold flex items-center gap-1"
              >
                {item.linkText} <ExternalLink size={11} />
              </a>
            </div>
          ))}
        </div>

        {/* Step by Step */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">Step-by-Step: Using IRS Where&apos;s My Refund</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'File your federal tax return', desc: 'E-file for fastest processing. Paper returns take 4–6 weeks before you can even check status.' },
              { step: '2', title: 'Wait the required time', desc: 'E-filers: wait 24 hours. Paper filers: wait at least 4 weeks (28 days) before checking.' },
              { step: '3', title: 'Go to IRS Where\'s My Refund', desc: 'Visit irs.gov/refunds or download the IRS2Go app. Available 24/7.' },
              { step: '4', title: 'Enter your information', desc: 'You\'ll need: (1) Social Security Number, (2) Filing status, (3) Exact refund amount from your return.' },
              { step: '5', title: 'Read your refund status', desc: 'The tool shows 3 stages: Return Received, Refund Approved, and Refund Sent.' },
              { step: '6', title: 'Allow time for delivery', desc: 'After "Refund Sent": direct deposit arrives in 1-3 business days. Paper checks take 5-7 additional days.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="bg-green-100 text-green-700 font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">{item.title}</p>
                  <p className="text-green-700 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdsterraDisplay />

        {/* Refund Journey Visual */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">The Refund Journey</h2>
          <Timeline />
        </div>

        {/* What the Statuses Mean */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-green-900 text-xl mb-4">What Do the IRS Refund Statuses Mean?</h2>
          <div className="space-y-4">
            {[
              {
                status: 'Return Received',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                desc: 'The IRS has received your return and it\'s in the processing queue. No action needed from you.',
              },
              {
                status: 'Refund Approved',
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                desc: 'Your refund has been approved and is scheduled to be sent. Direct deposit date will be shown.',
              },
              {
                status: 'Refund Sent',
                color: 'bg-green-100 text-green-800 border-green-200',
                desc: 'Your refund has been sent. Direct deposit: allow 1-3 business days. Check: allow 5-7 days via mail.',
              },
            ].map((item) => (
              <div key={item.status} className={`border rounded-xl p-4 ${item.color}`}>
                <p className="font-bold mb-1">{item.status}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* When to Call */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="font-bold text-amber-900 text-xl mb-3">When Should You Call the IRS?</h2>
          <p className="text-amber-800 text-sm mb-4">
            Don&apos;t call the IRS before these timeframes — they cannot provide additional info:
          </p>
          <ul className="space-y-2">
            {[
              'E-filers: wait 21 days after acceptance before calling',
              'Paper filers: wait 6 weeks (42 days) after mailing before calling',
              'Amended return (1040-X): wait 16 weeks before calling',
              'IRS refund line: 800-829-1954',
              'IRS main line: 800-829-1040',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-amber-800">
                <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
