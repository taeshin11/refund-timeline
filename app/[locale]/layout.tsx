import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

type Locale = 'en' | 'ko' | 'ja' | 'zh' | 'es' | 'fr' | 'de' | 'pt';

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
    metadataBase: new URL('https://refund-timeline.vercel.app'),
    title: {
      default: 'Tax Refund Timeline & IRS Processing Times | RefundTimeline',
      template: '%s | RefundTimeline',
    },
    description:
      'Check how long your tax refund will take. IRS processing times for e-filed and paper returns, state refund timelines, and common delay reasons.',
    keywords: [
      'tax refund timeline',
      'IRS refund schedule',
      'where is my refund',
      'tax refund processing time',
      'IRS processing time',
      'when will I get my refund',
      'state tax refund',
    ],
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://refund-timeline.vercel.app/${locale}`,
      siteName: 'RefundTimeline',
      title: 'Tax Refund Timeline & IRS Processing Times | RefundTimeline',
      description:
        'Check how long your tax refund will take. IRS processing times for e-filed and paper returns, state refund timelines, and common delay reasons.',
      images: [
        {
          url: 'https://refund-timeline.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: 'RefundTimeline — IRS Tax Refund Processing Times',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tax Refund Timeline & IRS Processing Times | RefundTimeline',
      description:
        'Check how long your tax refund will take. IRS processing times for e-filed and paper returns, state refund timelines, and common delay reasons.',
      images: ['https://refund-timeline.vercel.app/og-image.png'],
    },
    other: {
      'google-adsense-account': 'ca-pub-7098271335538021',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="RefundTimeline" />
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
