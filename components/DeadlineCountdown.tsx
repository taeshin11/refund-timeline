'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export function DeadlineCountdown() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const deadline = new Date('2025-04-15T23:59:59');
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setDaysLeft(days);
  }, []);

  const progress = (() => {
    const start = new Date('2025-01-27');
    const end = new Date('2025-04-15');
    const now = new Date();
    if (now < start) return 0;
    if (now > end) return 100;
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.round((elapsed / total) * 100);
  })();

  if (daysLeft === null) return null;

  const isPast = daysLeft < 0;
  const isUrgent = daysLeft <= 7 && daysLeft >= 0;

  return (
    <div className={`rounded-xl p-4 border ${isPast ? 'bg-gray-50 border-gray-200' : isUrgent ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isPast ? 'bg-gray-100' : isUrgent ? 'bg-red-100' : 'bg-green-100'}`}>
          {isPast ? <Clock className="text-gray-500" size={18} /> : <Calendar className={isUrgent ? 'text-red-600' : 'text-green-600'} size={18} />}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-sm ${isPast ? 'text-gray-700' : isUrgent ? 'text-red-800' : 'text-green-800'}`}>
            2025 Tax Filing Deadline
          </h3>
          {isPast ? (
            <p className="text-gray-600 text-sm mt-0.5">
              The April 15 deadline has passed. You can still file — but you may owe penalties.
              Extension deadline: <strong>October 15, 2025</strong>
            </p>
          ) : (
            <>
              <p className={`text-sm mt-0.5 ${isUrgent ? 'text-red-700' : 'text-green-700'}`}>
                <strong>{daysLeft} days</strong> until the April 15, 2025 deadline
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-green-600 mb-1">
                  <span>Jan 27 (filing opens)</span>
                  <span>Apr 15 (deadline)</span>
                </div>
                <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-green-600 mt-1">{progress}% of filing season completed</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
