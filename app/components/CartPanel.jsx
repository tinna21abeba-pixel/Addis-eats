"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import SmartImage from "./SmartImage";
import QuantityStepper from "./QuantityStepper";
import { ArrowIcon, CartIcon, TrashIcon } from "./Icons";
import { formatETB } from "../lib/format";

export default function CartPanel() {
  const { items, count, subtotal, setQuantity, removeItem } = useCart();

  return (
    <aside aria-label="Your cart" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
          <CartIcon className="text-amber-600" /> Your cart
        </h2>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-amber-600 px-1.5 text-xs font-bold text-white">
          {count}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          Your cart is empty. Add a dish to start your order.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 py-1">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <SmartImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 dish-inner-shadow" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{formatETB(item.price)}</p>
              </div>
              <QuantityStepper
                value={item.quantity}
                onChange={(q) => setQuantity(item.id, q)}
                label={`${item.name} quantity`}
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
                className="text-gray-400 transition hover:text-red-500"
              >
                <TrashIcon width={17} height={17} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-lg font-bold text-amber-600">{formatETB(subtotal)}</span>
      </div>

      <Link
        href={items.length ? "/checkout" : "/menu"}
        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-amber-600 py-3 font-semibold text-white shadow-xs transition hover:bg-amber-700"
      >
        {items.length ? "Proceed to checkout" : "Browse the menu"} <ArrowIcon width={17} height={17} />
      </Link>
    </aside>
  );
}
