import { AlertTriangle } from 'lucide-react';

export function EITCNotice() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 flex gap-3">
      <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-amber-800 text-sm mb-1">
          EITC/ACTC Refund Hold Notice (PATH Act)
        </h3>
        <p className="text-amber-700 text-sm">
          The IRS cannot issue Earned Income Tax Credit (EITC) or Additional Child Tax Credit (ACTC)
          refunds before <strong>February 15</strong> by law. If you claimed these credits, your
          refund will be held until at least February 15, 2025.
        </p>
        <p className="text-amber-600 text-xs mt-1">
          Expected release for most EITC/ACTC filers: <strong>February 27, 2025 or later</strong>
        </p>
      </div>
    </div>
  );
}
