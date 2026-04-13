import scheduleData from '@/data/irs-schedule.json';

export type ScheduleRow = {
  filing_date_range_start: string;
  filing_date_range_end: string;
  direct_deposit_expected: string;
  paper_check_expected: string;
  paper_return_dd: string;
  notes: string;
};

export function getSchedule(): ScheduleRow[] {
  return scheduleData.schedules as ScheduleRow[];
}

export function findRowByFilingDate(filingDate: string): ScheduleRow | null {
  const date = new Date(filingDate);
  const rows = getSchedule();

  for (const row of rows) {
    const start = new Date(row.filing_date_range_start);
    const end = new Date(row.filing_date_range_end);
    if (date >= start && date <= end) {
      return row;
    }
  }
  return null;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getDaysUntilDeadline(): number {
  const deadline = new Date('2025-04-15');
  const today = new Date();
  const diff = deadline.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getFilingSeasonProgress(): number {
  const start = new Date('2025-01-27');
  const end = new Date('2025-04-15');
  const now = new Date();

  if (now < start) return 0;
  if (now > end) return 100;

  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.round((elapsed / total) * 100);
}

export { scheduleData };
