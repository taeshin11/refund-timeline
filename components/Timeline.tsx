import { CheckCircle, Circle } from 'lucide-react';

type Step = {
  label: string;
  desc: string;
  done: boolean;
};

type Props = {
  steps?: Step[];
};

const defaultSteps: Step[] = [
  { label: 'Return Filed', desc: 'You submitted your tax return to the IRS', done: true },
  { label: 'Return Accepted', desc: 'IRS acknowledged receipt (within 24–48 hrs)', done: true },
  { label: 'Return Processed', desc: 'IRS reviewed and approved your return', done: false },
  { label: 'Refund Sent', desc: 'IRS issued your refund via direct deposit or check', done: false },
  { label: 'Refund Received', desc: 'Funds deposited or check delivered', done: false },
];

export function Timeline({ steps = defaultSteps }: Props) {
  return (
    <div className="relative">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-green-200" />
          )}
          {/* Icon */}
          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
            step.done ? 'bg-green-500' : 'bg-gray-100 border-2 border-gray-300'
          }`}>
            {step.done
              ? <CheckCircle className="text-white" size={18} />
              : <Circle className="text-gray-400" size={18} />
            }
          </div>
          {/* Content */}
          <div className="pt-0.5">
            <p className={`font-semibold text-sm ${step.done ? 'text-green-800' : 'text-gray-500'}`}>
              {step.label}
            </p>
            <p className={`text-xs mt-0.5 ${step.done ? 'text-green-600' : 'text-gray-400'}`}>
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
