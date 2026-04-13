'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, DollarSign } from 'lucide-react';

type NavbarProps = {
  locale: string;
};

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/states`, label: 'States' },
    { href: `/${locale}/estimator`, label: 'Estimator' },
    { href: `/${locale}/federal`, label: 'Federal Guide' },
    { href: `/${locale}/eitc`, label: 'EITC Dates' },
    { href: `/${locale}/track`, label: 'Track Refund' },
    { href: `/${locale}/faq`, label: 'FAQ' },
  ];

  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  }

  return (
    <nav className="bg-white border-b border-green-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1.5 rounded-lg">
              <DollarSign size={18} />
            </div>
            <span className="font-bold text-green-900 text-lg">RefundTimeline</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-800'
                    : 'text-green-700 hover:bg-green-50 hover:text-green-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Locale Switcher */}
          <div className="hidden lg:flex items-center gap-2">
            <select
              value={locale}
              onChange={(e) => {
                window.location.href = switchLocale(e.target.value);
              }}
              className="text-xs border border-green-200 rounded-lg px-2 py-1.5 bg-white text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-green-700 hover:bg-green-50"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-green-100 mt-2 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-3">
              <select
                value={locale}
                onChange={(e) => {
                  window.location.href = switchLocale(e.target.value);
                }}
                className="w-full text-xs border border-green-200 rounded-lg px-2 py-1.5 bg-white text-green-700"
              >
                {locales.map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
