"use client";

import Link from "next/link";

export default function DashboardError({ error, reset }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-white text-center">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 sm:p-12">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
          System Notification
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Dashboard Retrieval Error
        </h1>
        <p className="text-zinc-300 text-sm max-w-md mx-auto mb-6">
          {error?.message || "An error occurred while calculating order aggregations on the server."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2.5 bg-white text-black font-bold rounded-lg text-xs hover:bg-zinc-200 transition"
          >
            Retry Aggregation
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 text-white font-medium rounded-lg text-xs hover:bg-zinc-700 transition"
          >
            Reset to Default View
          </Link>
        </div>
      </div>
    </div>
  );
}
