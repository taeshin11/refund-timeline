import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

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
      default: 'IRS Tax Refund Schedule 2025 — When Will I Get My Refund? | RefundTimeline',
      template: '%s | RefundTimeline',
    },
    description:
      'Check the 2025 IRS tax refund schedule. Find out when your federal and state refund will arrive.',
    alternates: {
      canonical: `https://refund-timeline.vercel.app/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://refund-timeline.vercel.app/${l}`])
      ),
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
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
