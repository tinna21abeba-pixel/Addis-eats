"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import SmartImage from "../components/SmartImage";
import QuantityStepper from "../components/QuantityStepper";
import { ArrowIcon, TrashIcon } from "../components/Icons";
import { formatETB } from "../lib/format";

export default function CartView() {
  const { items, subtotal, delivery, total, setQuantity, removeItem, clearCart, ready } = useCart();

  if (!ready) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-14 text-center">
        <h2 className="font-display text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-sm text-gray-500">Pick delicious dishes from the menu and they will show up here.</p>
        <Link
          href="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-3 font-semibold text-white shadow-xs transition hover:bg-amber-700"
        >
          Browse the menu <ArrowIcon width={18} height={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white px-5 shadow-xs">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-4 py-5">
            <Link href={`/menu/${item.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <SmartImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 dish-inner-shadow" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/menu/${item.id}`} className="font-display text-xl font-semibold text-gray-900 transition hover:text-amber-600">
                {item.name}
              </Link>
              <p className="text-sm text-gray-500">{formatETB(item.price)} each</p>
            </div>
            <QuantityStepper value={item.quantity} onChange={(q) => setQuantity(item.id, q)} label={`${item.name} quantity`} />
            <p className="w-24 text-right font-bold text-amber-600">{formatETB(item.price * item.quantity)}</p>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name}`}
              className="text-gray-400 transition hover:text-red-500"
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-xs">
        <h2 className="font-display text-2xl font-bold text-gray-900">Order summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="font-medium text-gray-900">{formatETB(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Delivery</dt>
            <dd className="font-medium text-gray-900">{formatETB(delivery)}</dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
            <dt className="text-gray-900">Total</dt>
            <dd className="text-amber-600">{formatETB(total)}</dd>
          </div>
        </dl>
        <Link
          href="/checkout"
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-amber-600 py-3.5 font-semibold text-white shadow-xs transition hover:bg-amber-700"
        >
          Proceed to checkout <ArrowIcon width={18} height={18} />
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="mt-3 w-full rounded-full border border-gray-300 py-2.5 text-xs font-semibold text-gray-600 transition hover:border-gray-400 hover:text-gray-900"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}
