import Link from 'next/link';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import type { StateData } from '@/lib/states';

type Props = {
  states: StateData[];
  locale: string;
  showAll?: boolean;
};

export function StateTable({ states, locale, showAll = false }: Props) {
  const displayed = showAll ? states : states.slice(0, 20);

  function getSpeedBadge(avgDays: number) {
    if (avgDays === 0) return { label: 'No State Tax', color: 'bg-gray-100 text-gray-600' };
    if (avgDays <= 7) return { label: 'Very Fast', color: 'bg-green-100 text-green-700' };
    if (avgDays <= 14) return { label: 'Fast', color: 'bg-blue-100 text-blue-700' };
    if (avgDays <= 21) return { label: 'Average', color: 'bg-yellow-100 text-yellow-700' };
    if (avgDays <= 35) return { label: 'Slow', color: 'bg-orange-100 text-orange-700' };
    return { label: 'Very Slow', color: 'bg-red-100 text-red-700' };
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="px-4 py-3 text-left font-semibold">#</th>
            <th className="px-4 py-3 text-left font-semibold">State</th>
            <th className="px-4 py-3 text-left font-semibold">Avg. Days (E-file)</th>
            <th className="px-4 py-3 text-left font-semibold">Speed</th>
            <th className="px-4 py-3 text-left font-semibold">Filing Deadline</th>
            <th className="px-4 py-3 text-left font-semibold">Check Status</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((state, i) => {
            const badge = getSpeedBadge(state.avgDays);
            return (
              <tr
                key={state.slug}
                className={`border-t border-green-100 ${i % 2 === 0 ? 'bg-white' : 'bg-green-50'} hover:bg-green-100 transition-colors`}
              >
                <td className="px-4 py-3 text-green-500 font-mono text-xs">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/${locale}/states/${state.slug}`}
                    className="font-semibold text-green-800 hover:text-green-600 hover:underline flex items-center gap-1"
                  >
                    <span className="text-xs font-mono text-green-500 w-6">{state.abbr}</span>
                    {state.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-green-700">
                  {state.hasStateTax ? (
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-green-500" />
                      {state.avgDays} days
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                    {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-green-700 text-xs">
                  {state.hasStateTax ? state.filingDeadline : '—'}
                </td>
                <td className="px-4 py-3">
                  {state.hasStateTax && state.checkRefundUrl ? (
                    <a
                      href={state.checkRefundUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 flex items-center gap-1 text-xs"
                    >
                      Check <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
