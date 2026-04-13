import bracketsData from '@/data/tax-brackets-2024.json';

export type FilingStatus = 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';

export type Bracket = {
  rate: number;
  min: number;
  max: number;
};

export function getStandardDeduction(status: FilingStatus): number {
  return bracketsData.standard_deductions[status];
}

export function calculateTaxFromBrackets(taxableIncome: number, status: FilingStatus): number {
  const brackets = (bracketsData.brackets as Record<string, Bracket[]>)[status];
  let tax = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= 0) break;
    const taxableAtRate = Math.min(taxableIncome, bracket.max - bracket.min);
    tax += taxableAtRate * bracket.rate;
    taxableIncome -= taxableAtRate;
  }

  return Math.round(tax * 100) / 100;
}

export function estimateRefund(
  grossIncome: number,
  withholding: number,
  filingStatus: FilingStatus,
  useStandardDeduction: boolean,
  itemizedAmount?: number
) {
  const stdDed = getStandardDeduction(filingStatus);
  const deduction = useStandardDeduction ? stdDed : (itemizedAmount ?? stdDed);
  const taxableIncome = Math.max(0, grossIncome - deduction);
  const taxOwed = calculateTaxFromBrackets(taxableIncome, filingStatus);
  const refund = withholding - taxOwed;

  return {
    refund: Math.round(refund * 100) / 100,
    taxOwed: Math.round(taxOwed * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    deductionUsed: deduction,
    standardDeduction: stdDed,
  };
}
