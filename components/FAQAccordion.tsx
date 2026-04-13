'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQ } from '@/lib/faqs';

type Props = {
  faqs: FAQ[];
  limit?: number;
};

export function FAQAccordion({ faqs, limit }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const displayed = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="space-y-3">
      {displayed.map((faq, i) => (
        <div key={faq.slug} className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-green-50 transition-colors"
          >
            <span className="font-semibold text-green-900 text-sm leading-snug">{faq.question}</span>
            {openIdx === i
              ? <ChevronUp className="text-green-500 shrink-0" size={18} />
              : <ChevronDown className="text-green-400 shrink-0" size={18} />
            }
          </button>
          {openIdx === i && (
            <div className="px-5 pb-4 text-green-800 text-sm leading-relaxed border-t border-green-100 pt-3">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
