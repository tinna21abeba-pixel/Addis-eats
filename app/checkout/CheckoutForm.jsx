"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import SmartImage from "../components/SmartImage";
import { ArrowIcon, CheckIcon } from "../components/Icons";
import { formatETB } from "../lib/format";

const subCities = [
  "Addis Ketema",
  "Akaki Kaliti",
  "Arada",
  "Bole",
  "Gullele",
  "Kirkos",
  "Kolfe Keranio",
  "Lideta",
  "Nifas Silk-Lafto",
  "Yeka",
  "Lemi Kura",
];

const payments = [
  { id: "cash", label: "Cash on delivery" },
  { id: "telebirr", label: "Telebirr" },
  { id: "cbe", label: "CBE Birr" },
];

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500";

export default function CheckoutForm() {
  const { items, subtotal, delivery, total, clearCart, ready } = useCart();
  const [placed, setPlaced] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPlaced({
      orderNo: `AE-${Date.now().toString().slice(-6)}`,
      name: data.get("name"),
      total,
      lines: items.length,
    });
    clearCart();
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-md">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-600 text-white shadow-xs">
          <CheckIcon width={28} height={28} />
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-gray-900">Thank you, {placed.name}!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Order <span className="font-semibold text-gray-900">{placed.orderNo}</span> is confirmed. We will call you when our courier is on the way.
        </p>
        <p className="mt-4 font-display text-2xl font-bold text-amber-600">{formatETB(placed.total)}</p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 font-semibold text-white shadow-xs transition hover:bg-amber-700"
        >
          Order something else <ArrowIcon width={18} height={18} />
        </Link>
      </div>
    );
  }

  if (!ready) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-14 text-center">
        <h2 className="font-display text-2xl font-bold text-gray-900">Nothing to check out yet</h2>
        <p className="mt-2 text-sm text-gray-500">Add a dish to your cart first.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-amber-600 px-7 py-3 font-semibold text-white shadow-xs transition hover:bg-amber-700"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8">
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-2xl font-bold text-gray-900">Delivery details</legend>
          <label className="text-sm font-semibold text-gray-700">
            Full name
            <input name="name" required autoComplete="name" placeholder="Abebe Kebede" className={fieldClass} />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Phone number
            <input
              name="phone"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              pattern="^(\+251|0)?9\d{8}$"
              title="Ethiopian mobile number, e.g. 0911 234 567"
              placeholder="0911 234 567"
              className={fieldClass}
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Sub-city
            <select name="subcity" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Choose sub-city</option>
              {subCities.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Street / landmark
            <input name="address" required autoComplete="street-address" placeholder="Near Edna Mall, Bole" className={fieldClass} />
          </label>
          <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
            Delivery notes (optional)
            <textarea name="notes" rows={3} placeholder="Gate code, floor, spice preference..." className={fieldClass} />
          </label>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-display text-2xl font-bold text-gray-900">Payment method</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {payments.map((p, i) => (
              <label
                key={p.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50/70"
              >
                <input type="radio" name="payment" value={p.id} defaultChecked={i === 0} className="accent-amber-600" />
                {p.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-xs">
        <h2 className="font-display text-2xl font-bold text-gray-900">Your order</h2>
        <ul className="mt-4 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
                <SmartImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 dish-inner-shadow" />
              </div>
              <p className="flex-1 text-sm font-medium text-gray-900">
                {item.name} <span className="text-xs text-gray-500">× {item.quantity}</span>
              </p>
              <p className="text-sm font-semibold text-gray-900">{formatETB(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="font-medium text-gray-900">{formatETB(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Delivery</dt>
            <dd className="font-medium text-gray-900">{formatETB(delivery)}</dd>
          </div>
          <div className="flex justify-between pt-2 text-lg font-bold">
            <dt className="text-gray-900">Total</dt>
            <dd className="text-amber-600">{formatETB(total)}</dd>
          </div>
        </dl>
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-amber-600 py-3.5 font-semibold text-white shadow-xs transition hover:bg-amber-700"
        >
          Place order
        </button>
      </aside>
    </form>
  );
}
