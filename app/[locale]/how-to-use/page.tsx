import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaLD } from '@/components/SchemaLD';
import { CheckCircle, Clock, Search } from 'lucide-react';
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
    title: 'How to Use RefundTimeline — Track Your IRS Tax Refund',
    description:
      'Learn how to use RefundTimeline to check IRS processing times, estimate your refund date, and understand common delay reasons. Includes answers to top tax refund questions.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}/how-to-use`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}/how-to-use`])),
    },
  };
}

const faqs = [
  {
    q: 'How long does it take to get my tax refund?',
    a: 'Most e-filed federal returns with direct deposit are processed within 21 days of IRS acceptance. Paper returns typically take 6–8 weeks. State refund times vary: some states (like Colorado) process in as few as 7 days, while others may take 4–6 weeks.',
  },
  {
    q: 'What is the IRS processing time for e-filed returns?',
    a: 'The IRS states that 9 out of 10 e-filed refunds are issued within 21 days. However, returns that require additional review — such as those claiming EITC, ACTC, or containing errors — can take longer.',
  },
  {
    q: 'Why is my refund delayed?',
    a: 'Common delay reasons include: PATH Act holds on EITC/ACTC claims (held until at least February 15), identity verification requests, math errors on your return, offset for past-due debts, or manual review flags. You\'ll usually receive an IRS notice (CP or Letter) explaining the reason.',
  },
  {
    q: 'What is the IRS Where\'s My Refund tool?',
    a: 'Where\'s My Refund (WMR) is the official IRS tool at irs.gov/refunds. You enter your SSN, filing status, and exact refund amount to see your status: "Return Received," "Refund Approved," or "Refund Sent." It updates once daily, overnight.',
  },
  {
    q: 'How long does a paper return take?',
    a: 'Paper returns are processed manually and typically take 6–8 weeks from the date the IRS receives your return. During peak season (February–April), backlogs can extend this to 12 weeks or more. E-filing is strongly recommended for faster processing.',
  },
  {
    q: 'What is a PATH Act delay?',
    a: 'The Protecting Americans from Tax Hikes (PATH) Act requires the IRS to hold refunds that include the Earned Income Tax Credit (EITC) or Additional Child Tax Credit (ACTC) until at least February 15 each year. This applies even if you filed in January. Deposits typically begin arriving in late February.',
  },
  {
    q: 'Can the IRS offset my refund?',
    a: 'Yes. The IRS Treasury Offset Program (TOP) can reduce your refund to cover unpaid federal or state taxes, child support, student loans, or other federal debts. You will receive a notice explaining the offset. If you believe an offset was applied in error, contact the agency listed in the notice.',
  },
  {
    q: 'What is a TC 150?',
    a: 'TC 150 (Transaction Code 150) on your IRS tax transcript means your return has been filed and entered into the IRS master file. It is one of the first codes to appear and indicates your return is in processing. It does not mean your refund has been approved yet.',
  },
  {
    q: 'How do I check my state tax refund?',
    a: 'Each state has its own refund portal. Most states let you check status online by entering your SSN and refund amount. Visit our States section to find the direct link and estimated processing time for your state. Processing times range from 7 days (Colorado) to 6+ weeks depending on the state.',
  },
  {
    q: 'What delays can the IRS send a letter about?',
    a: 'The IRS may send letters for: identity verification (LTR 5071C, LTR 4883C), additional information needed (CP05, CP2000), math error corrections (CP11, CP12), and refund offset notifications (CP21). Always respond promptly — delays in responding extend your wait.',
  },
];

const steps = [
  {
    num: 1,
    icon: Clock,
    title: 'Find Your Filing Method & Date',
    desc: 'Select how you filed (e-file or paper) and when the IRS accepted your return. Use our refund schedule table to find the typical date range for your filing week.',
    link: { label: 'View IRS Refund Schedule', href: '/' },
  },
  {
    num: 2,
    icon: Search,
    title: 'Check Your State\'s Processing Time',
    desc: 'Browse state-specific refund timelines to see how long your state typically takes. Each state page includes a link to the official state refund status portal.',
    link: { label: 'Browse All States', href: '/states' },
  },
  {
    num: 3,
    icon: CheckCircle,
    title: 'Verify at IRS.gov',
    desc: 'Once 24 hours have passed since e-filing (or 4 weeks for paper), check your official status at the IRS Where\'s My Refund tool. Our timelines are estimates — IRS.gov is authoritative.',
    link: { label: 'IRS Where\'s My Refund', href: 'https://www.irs.gov/refunds', external: true },
  },
];

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use RefundTimeline to Track Your Tax Refund',
    description: 'A 3-step guide to estimating your IRS and state tax refund date using RefundTimeline.',
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <>
      <SchemaLD schema={faqSchema} />
      <SchemaLD schema={howToSchema} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'How to Use' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Use RefundTimeline</h1>
          <p className="text-green-200 text-lg">
            Estimate your refund date in 3 steps — plus answers to 10 common tax refund questions
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* 3-Step Guide */}
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-6">3-Step Refund Tracking Guide</h2>
          <div className="space-y-6">
            {steps.map(({ num, icon: Icon, title, desc, link }) => (
              <div key={num} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={18} className="text-green-600" />
                    <h3 className="font-bold text-green-900">{title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">{desc}</p>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:text-green-800 hover:underline font-medium"
                    >
                      {link.label} →
                    </a>
                  ) : (
                    <Link href={`/${locale}${link.href}`} className="text-sm text-green-600 hover:text-green-800 hover:underline font-medium">
                      {link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Time Summary */}
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Quick Reference: IRS Processing Times</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'E-file + Direct Deposit', time: '~21 days', color: 'bg-green-50 border-green-200 text-green-800' },
              { label: 'E-file + Paper Check', time: '~6 weeks', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { label: 'Paper + Direct Deposit', time: '~4 weeks', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
              { label: 'Paper + Paper Check', time: '6–8 weeks', color: 'bg-orange-50 border-orange-200 text-orange-800' },
            ].map(({ label, time, color }) => (
              <div key={label} className={`rounded-xl border p-3 text-center ${color}`}>
                <p className="text-xs font-medium mb-1">{label}</p>
                <p className="text-lg font-bold">{time}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">* EITC/ACTC filers: add PATH Act hold through at least February 15.</p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-bold text-green-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation CTA */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-green-900 mb-2">Explore More Tools</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link href={`/${locale}/estimator`} className="inline-flex items-center justify-center bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-800 transition-colors text-sm">
              Refund Estimator
            </Link>
            <Link href={`/${locale}/federal`} className="inline-flex items-center justify-center bg-white text-green-700 border border-green-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm">
              Federal Guide
            </Link>
            <Link href={`/${locale}/faq`} className="inline-flex items-center justify-center bg-white text-green-700 border border-green-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm">
              Full FAQ
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
