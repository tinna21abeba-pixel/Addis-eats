"use client";

export default function Error({ error, reset }) {
  return (
    <div className="bg-white py-20 text-center">
      <h2 className="font-display text-3xl font-bold text-gray-900">The menu didn&apos;t load</h2>
      <p className="mt-2 text-sm text-gray-500">{error?.message || "Something went wrong while loading the menu."}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-xs transition hover:bg-amber-700"
      >
        Try again
      </button>
    </div>
  );
}
