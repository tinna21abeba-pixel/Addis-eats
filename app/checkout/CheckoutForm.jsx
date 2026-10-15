"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../actions/orders";
import { etb } from "../lib/format";

const inputClass =
  "w-full bg-[#201d1b] border border-[#332e29] rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-sm transition-all min-h-[44px]";

function FieldError({ errors }) {
  if (!errors?.length) return null;
  return <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">{errors[0]}</p>;
}

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, null);
  const isSubmittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      clearCart();
    }
    isSubmittingRef.current = false;
    setIsSubmitting(false);
  }, [state, clearCart]);

  const handleSubmit = (e) => {
    if (isSubmittingRef.current || isPending || isSubmitting) {
      e.preventDefault();
      return;
    }
    isSubmittingRef.current = true;
    setIsSubmitting(true);
  };

  if (state?.ok) {
    return (
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-white mb-2 font-serif-display">Order Confirmed</h2>
        <p className="text-zinc-300 text-sm mb-6">
          Your order number is <span className="font-bold text-amber-400">{state.orderId}</span>. Our kitchen is now preparing your meal.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/orders/${state.orderId}/track`}
            className="inline-flex items-center justify-center bg-white text-black font-bold text-sm px-7 py-3 rounded-full min-h-[44px] transition hover:bg-zinc-200"
          >
            Track Delivery Live
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center bg-[#e59e2a] hover:bg-[#d48e1d] transition px-7 py-3 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20 min-h-[44px]"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-zinc-400 text-sm mb-6">Your cart is empty.</p>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center bg-[#e59e2a] hover:bg-[#d48e1d] transition px-7 py-3 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20 min-h-[44px]"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const errors = state?.fieldErrors ?? {};
  const v = state?.values ?? {};

  const payload = JSON.stringify(
    items.map((i) => ({ dishId: i.id, quantity: i.quantity || 1 }))
  );

  const disabled = isPending || isSubmitting;

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <input type="hidden" name="items" value={payload} />

      {state && !state.ok && (
        <div className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
          <p>{state.message}</p>
          <FieldError errors={errors.items} />
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={v.name}
          required
          className={inputClass}
          placeholder="Abebe Kebede"
        />
        <FieldError errors={errors.name} />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          defaultValue={v.phone}
          required
          className={inputClass}
          placeholder="0911234567"
          inputMode="tel"
        />
        <FieldError errors={errors.phone} />
      </div>

      <div>
        <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Delivery Address
        </label>
        <input
          id="address"
          name="address"
          defaultValue={v.address}
          required
          className={inputClass}
          placeholder="Bole, Addis Ababa"
        />
        <FieldError errors={errors.address} />
      </div>

      <div>
        <label htmlFor="note" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Special Note (Optional)
        </label>
        <textarea
          id="note"
          name="note"
          defaultValue={v.note}
          rows={2}
          className={inputClass}
          placeholder="Extra spicy, call upon arrival"
        />
        <FieldError errors={errors.note} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#2a2622]">
        <span className="text-zinc-400 font-medium">Total Amount</span>
        <span className="text-2xl font-bold text-amber-500">{etb(total)}</span>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="bg-[#e59e2a] hover:bg-[#d48e1d] disabled:opacity-60 disabled:cursor-not-allowed transition py-3 px-6 rounded-full font-bold text-zinc-950 shadow-md shadow-amber-500/20 text-sm mt-2 flex items-center justify-center min-h-[48px]"
      >
        {disabled ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}