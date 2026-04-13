'use client';

import { useState } from 'react';
import { ScheduleRow, formatDate } from '@/lib/schedule';
import { ExternalLink, Calendar } from 'lucide-react';

type Props = {
  rows: ScheduleRow[];
};

function formatRange(start: string, end: string) {
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  const monthS = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const monthE = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${monthS} – ${monthE}`;
}

export function RefundScheduleTable({ rows }: Props) {
  const [selectedDate, setSelectedDate] = useState('');
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSelectedDate(val);
    if (!val) {
      setHighlightedIdx(null);
      return;
    }
    const date = new Date(val);
    const idx = rows.findIndex((row) => {
      const start = new Date(row.filing_date_range_start);
      const end = new Date(row.filing_date_range_end);
      return date >= start && date <= end;
    });
    setHighlightedIdx(idx >= 0 ? idx : null);
  }

  return (
    <div>
      {/* Date Picker */}
      <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <label className="block text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
          <Calendar size={16} />
          Enter your filing date to highlight your row:
        </label>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min="2025-01-27"
            max="2025-10-15"
            className="border border-green-300 rounded-lg px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />
          {highlightedIdx !== null && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 text-sm text-yellow-800">
              <span className="font-semibold">Your estimated refund:</span>
              {' '}Direct deposit by{' '}
              <strong>{formatDate(rows[highlightedIdx].direct_deposit_expected)}</strong>
            </div>
          )}
          {selectedDate && highlightedIdx === null && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm text-red-700">
              Date out of 2025 filing season range. Please enter a date between Jan 27 and Oct 15, 2025.
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-green-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-3 text-left font-semibold">Filing Date Range</th>
              <th className="px-4 py-3 text-left font-semibold">E-file + Direct Deposit</th>
              <th className="px-4 py-3 text-left font-semibold">E-file + Paper Check</th>
              <th className="px-4 py-3 text-left font-semibold">Paper + Direct Deposit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-green-100 transition-colors ${
                  highlightedIdx === i
                    ? 'bg-yellow-100 font-semibold'
                    : i % 2 === 0
                    ? 'bg-white'
                    : 'bg-green-50'
                }`}
              >
                <td className="px-4 py-3 text-green-900 font-medium">
                  {formatRange(row.filing_date_range_start, row.filing_date_range_end)}
                  {highlightedIdx === i && (
                    <span className="ml-2 text-xs bg-yellow-300 text-yellow-900 px-1.5 py-0.5 rounded font-semibold">
                      YOUR DATE
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-green-800">
                  {formatDate(row.direct_deposit_expected)}
                </td>
                <td className="px-4 py-3 text-green-700">
                  {formatDate(row.paper_check_expected)}
                </td>
                <td className="px-4 py-3 text-green-600">
                  {formatDate(row.paper_return_dd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div className="mt-4 text-center">
        <a
          href="https://www.irs.gov/refunds"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
        >
          Check IRS Refund Status
          <ExternalLink size={16} />
        </a>
        <p className="text-xs text-green-600 mt-2">
          Opens IRS Where&apos;s My Refund — official IRS tool (updated daily)
        </p>
      </div>
    </div>
  );
}
