'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DollarSign, ExternalLink } from 'lucide-react';

type FooterProps = {
  locale: string;
};

export function Footer({ locale }: FooterProps) {
  const [counts, setCounts] = useState({ today: 0, total: 0 });

  useEffect(() => {
    fetch('/api/visitor', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => setCounts(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-green-900 text-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-600 text-white p-1.5 rounded-lg">
                <DollarSign size={18} />
              </div>
              <span className="font-bold text-white text-lg">RefundTimeline</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed mb-4">
              Federal and state tax refund dates and schedule 2025. When will your IRS refund arrive?
            </p>
            <p className="text-green-400 text-xs leading-relaxed">
              This site provides estimates based on publicly available IRS data. Actual processing times may vary. RefundTimeline is not affiliated with the IRS or any government agency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li><Link href={`/${locale}`} className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href={`/${locale}/states`} className="hover:text-white transition-colors">States</Link></li>
              <li><Link href={`/${locale}/estimator`} className="hover:text-white transition-colors">Refund Estimator</Link></li>
              <li><Link href={`/${locale}/federal`} className="hover:text-white transition-colors">Federal Guide</Link></li>
              <li><Link href={`/${locale}/eitc`} className="hover:text-white transition-colors">EITC Dates</Link></li>
              <li><Link href={`/${locale}/track`} className="hover:text-white transition-colors">Track Refund</Link></li>
              <li><Link href={`/${locale}/faq`} className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* IRS Resources */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">IRS Resources</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li>
                <a
                  href="https://www.irs.gov/refunds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Where&apos;s My Refund <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/filing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  IRS Filing Info <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  EITC Info <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/forms-pubs/about-form-4868"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  File Extension <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-green-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-400 text-xs">
              &copy; {new Date().getFullYear()} RefundTimeline. For official info, visit{' '}
              <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-white underline">
                IRS.gov
              </a>
            </p>
            <div className="text-xs text-green-400 text-center">
              <span>Visitors today: <strong className="text-green-300">{counts.today.toLocaleString()}</strong></span>
              {' · '}
              <span>Total visitors: <strong className="text-green-300">{counts.total.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
