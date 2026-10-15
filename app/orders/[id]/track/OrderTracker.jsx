"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { etb, when, relative } from "../../../lib/format";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "420px" }}
      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 text-sm font-medium"
    >
      <span className="text-white font-bold mb-1">Loading Delivery Map</span>
      <span className="text-xs text-zinc-500">Connecting to OpenStreetMap coordinates...</span>
    </div>
  )
});

export default function OrderTracker({ order, initialTracking }) {
  const [tracking, setTracking] = useState(initialTracking);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    const es = new EventSource(`/api/orders/${order.id}/stream`);

    es.onopen = () => {
      setConnectionStatus("Connected (Live Updates)");
    };

    es.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setTracking(update);
      } catch {}
    };

    es.onerror = () => {
      setConnectionStatus("Reconnecting...");
    };

    return () => {
      es.close();
    };
  }, [order.id]);

  const itemsList = Array.isArray(order.items)
    ? order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")
    : "Ethiopian cuisine items";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Stream Status:
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold border border-zinc-700 bg-zinc-800 text-zinc-200">
            {connectionStatus}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <a
            href="/api/orders/export"
            download="addis-eats-orders.csv"
            className="px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 font-medium transition"
          >
            Export Orders CSV
          </a>
          <Link
            href="/orders"
            className="px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 font-medium transition"
          >
            Back to Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Live Courier Tracking Map
            </h2>
            <span className="text-xs text-zinc-400 font-mono">
              Height: 420px | OpenStreetMap
            </span>
          </div>

          <DeliveryMap
            courierLocation={tracking.courierLocation}
            destination={tracking.destination}
          />

          <p className="text-xs text-zinc-500 mt-2">
            Map rendered client-side without SSR with explicit height reservation. Courier icon indicates real-time position.
          </p>
        </div>

        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Active Delivery Details
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {tracking.phase}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {tracking.courierLocation.landmark}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-zinc-800 py-4 text-sm">
            <div>
              <span className="text-xs text-zinc-400 block">Distance Remaining</span>
              <span className="font-bold text-white text-base">
                {tracking.distanceRemainingKm} km
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">Estimated Arrival</span>
              <span className="font-bold text-white text-base">
                {relative(tracking.estimatedDeliveryTime)}
              </span>
              <span className="text-[11px] text-zinc-500 block">
                {when(tracking.estimatedDeliveryTime)}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs text-zinc-400 block">Delivery Address</span>
              <p className="font-medium text-white">{tracking.destination.address}</p>
              <span className="text-xs text-zinc-400">
                Neighbourhood: {tracking.destination.neighbourhood}
              </span>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block">Assigned Courier</span>
              <p className="font-medium text-white">{tracking.courier.name}</p>
              <p className="text-xs text-zinc-400">Phone: {tracking.courier.phone}</p>
              <p className="text-xs text-zinc-400">Vehicle: {tracking.courier.vehicle}</p>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block">Order Summary</span>
              <p className="text-xs text-zinc-300">{itemsList}</p>
              <p className="font-bold text-white text-sm mt-1">
                Total: {etb(order.total)}
              </p>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block">Order Placed</span>
              <p className="text-xs text-zinc-300">
                {when(order.createdAt)} ({relative(order.createdAt)})
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
              Delivery Milestones
            </span>
            <ul className="space-y-2 text-xs">
              {tracking.timeline.map((item) => (
                <li
                  key={item.step}
                  className="flex items-center justify-between p-2 rounded bg-zinc-800/60 border border-zinc-700/60"
                >
                  <span className="font-medium text-zinc-200">{item.step}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold ${
                      item.current
                        ? "bg-white text-black"
                        : item.done
                        ? "bg-zinc-700 text-zinc-200"
                        : "bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    {item.current ? "In Progress" : item.done ? "Completed" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
