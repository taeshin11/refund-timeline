import statesData from '@/data/states-fallback.json';

export type StateData = {
  slug: string;
  name: string;
  abbr: string;
  avgDays: number;
  method: string;
  filingDeadline: string;
  hasStateTax: boolean;
  agency: string;
  agencyUrl: string;
  checkRefundUrl: string;
  notes: string;
};

export function getAllStates(): StateData[] {
  return statesData as StateData[];
}

export function getStateBySlug(slug: string): StateData | null {
  const states = getAllStates();
  return states.find((s) => s.slug === slug) || null;
}

export function getStatesWithTax(): StateData[] {
  return getAllStates().filter((s) => s.hasStateTax);
}

export function getStatesSortedBySpeed(): StateData[] {
  return [...getAllStates()]
    .filter((s) => s.hasStateTax)
    .sort((a, b) => a.avgDays - b.avgDays);
}

export function getStatesSlugs(): string[] {
  return getAllStates().map((s) => s.slug);
}
