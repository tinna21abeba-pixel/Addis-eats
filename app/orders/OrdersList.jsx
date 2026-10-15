"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CancelOrderButton from "./CancelOrderButton";
import { cancelOrder } from "../actions";
import { etb, when, relative } from "../lib/format";

export default function OrdersList({ initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.cancelOrder = cancelOrder;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.orders)) {
            setOrders(data.orders);
          }
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="bg-[#181615] border border-[#2b2724] rounded-2xl p-12 text-center">
        <h3 className="text-lg font-bold text-white mb-2 font-serif-display">No orders yet</h3>
        <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">
          You haven&apos;t placed any orders yet. Discover our signature dishes and place your first order.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-[#e59e2a] hover:bg-[#d48e1d] transition px-7 py-3 rounded-full font-bold text-sm text-zinc-950 shadow-md shadow-amber-500/20"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {orders.map((o) => (
        <li key={o.id} className="bg-[#181615] border border-[#2b2724] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="font-bold text-white text-base font-serif-display">{o.id}</span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    o.status === "cancelled"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : o.status === "delivered"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : o.status === "ready"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : o.status === "preparing"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <p className="text-zinc-300 text-sm">
                {o.items.map((i) => `${i.quantity} x ${i.name}`).join(", ")}
              </p>
              <p className="text-zinc-500 text-xs mt-1.5">
                Address: {o.address}
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-amber-500 font-bold text-lg">{etb(o.total)}</p>
              {o.createdAt && (
                <p className="text-zinc-400 text-xs mt-0.5">
                  {when(o.createdAt)} ({relative(o.createdAt)})
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
            <Link
              href={`/orders/${o.id}/track`}
              className="text-xs px-3.5 py-1.5 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 font-medium transition"
            >
              Track Delivery
            </Link>
            {o.status === "pending" && <CancelOrderButton orderId={o.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
