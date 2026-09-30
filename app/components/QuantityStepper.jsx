"use client";

import { MinusIcon, PlusIcon } from "./Icons";

export default function QuantityStepper({ value, onChange, min = 1, label = "Quantity" }) {
  return (
    <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 shadow-2xs" role="group" aria-label={label}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-8 w-8 place-items-center text-gray-700 transition hover:text-amber-600"
      >
        <MinusIcon width={14} height={14} />
      </button>
      <span className="min-w-6 text-center text-xs font-semibold tabular-nums text-gray-900" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="grid h-8 w-8 place-items-center text-gray-700 transition hover:text-amber-600"
      >
        <PlusIcon width={14} height={14} />
      </button>
    </div>
  );
}
