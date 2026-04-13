'use client';

import { useState } from 'react';
import { estimateRefund, getStandardDeduction } from '@/lib/taxBrackets';
import type { FilingStatus } from '@/lib/taxBrackets';
import { Calculator, DollarSign, TrendingDown } from 'lucide-react';

export function RefundEstimator() {
  const [form, setForm] = useState({
    grossIncome: '',
    withholding: '',
    filingStatus: 'single' as FilingStatus,
    useStandard: true,
    itemizedAmount: '',
  });
  const [result, setResult] = useState<ReturnType<typeof estimateRefund> | null>(null);

  const stdDed = getStandardDeduction(form.filingStatus);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const gross = parseFloat(form.grossIncome) || 0;
    const withholding = parseFloat(form.withholding) || 0;
    const itemized = parseFloat(form.itemizedAmount) || 0;

    const res = estimateRefund(gross, withholding, form.filingStatus, form.useStandard, itemized);
    setResult(res);
  }

  return (
    <div className="bg-white rounded-2xl border border-green-200 shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-green-100 p-2 rounded-lg">
          <Calculator className="text-green-600" size={20} />
        </div>
        <div>
          <h2 className="font-bold text-green-900 text-lg">Tax Refund Estimator 2025</h2>
          <p className="text-green-600 text-xs">Estimate your federal refund amount</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Filing Status */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-1">Filing Status</label>
          <select
            value={form.filingStatus}
            onChange={(e) => setForm({ ...form, filingStatus: e.target.value as FilingStatus })}
            className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="single">Single</option>
            <option value="married_filing_jointly">Married Filing Jointly</option>
            <option value="married_filing_separately">Married Filing Separately</option>
            <option value="head_of_household">Head of Household</option>
          </select>
        </div>

        {/* Gross Income */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-1">Gross Income ($)</label>
          <input
            type="number"
            placeholder="e.g. 55000"
            value={form.grossIncome}
            onChange={(e) => setForm({ ...form, grossIncome: e.target.value })}
            className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Withholding */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-1">Federal Taxes Withheld ($)</label>
          <input
            type="number"
            placeholder="e.g. 8500"
            value={form.withholding}
            onChange={(e) => setForm({ ...form, withholding: e.target.value })}
            className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-green-500 mt-1">Found in Box 2 of your W-2 form</p>
        </div>

        {/* Deduction Type */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-2">Deduction Type</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={form.useStandard}
                onChange={() => setForm({ ...form, useStandard: true })}
                className="accent-green-600"
              />
              <span className="text-sm text-green-800">
                Standard (${stdDed.toLocaleString()})
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!form.useStandard}
                onChange={() => setForm({ ...form, useStandard: false })}
                className="accent-green-600"
              />
              <span className="text-sm text-green-800">Itemized</span>
            </label>
          </div>
          {!form.useStandard && (
            <input
              type="number"
              placeholder="Total itemized deductions ($)"
              value={form.itemizedAmount}
              onChange={(e) => setForm({ ...form, itemizedAmount: e.target.value })}
              className="mt-2 w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Estimate My Refund
        </button>
      </form>

      {/* Results */}
      {result !== null && (
        <div className="mt-6 border-t border-green-100 pt-6">
          <h3 className="font-bold text-green-900 mb-4">Your Estimate</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Main Result */}
            <div className={`col-span-1 sm:col-span-1 rounded-xl p-4 text-center ${result.refund >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className={`flex items-center justify-center gap-1 mb-1 ${result.refund >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {result.refund >= 0 ? <DollarSign size={18} /> : <TrendingDown size={18} />}
              </div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                {result.refund >= 0 ? 'Estimated Refund' : 'Amount Owed'}
              </p>
              <p className={`text-2xl font-bold ${result.refund >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                {result.refund >= 0
                  ? `$${result.refund.toLocaleString()}`
                  : `-$${Math.abs(result.refund).toLocaleString()}`}
              </p>
            </div>

            {/* Details */}
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gross Income</span>
                <span className="text-green-800 font-medium">${parseFloat(form.grossIncome || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Deduction ({form.useStandard ? 'Standard' : 'Itemized'})</span>
                <span className="text-green-800 font-medium">- ${result.deductionUsed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-600">Taxable Income</span>
                <span className="text-green-800 font-medium">${result.taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax Owed</span>
                <span className="text-red-600 font-medium">- ${result.taxOwed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxes Withheld</span>
                <span className="text-green-600 font-medium">+ ${parseFloat(form.withholding || '0').toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            This is an estimate only. Actual refund may vary based on credits, additional income, and IRS processing.
          </p>
        </div>
      )}
    </div>
  );
}
