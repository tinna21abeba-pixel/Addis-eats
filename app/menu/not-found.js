import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white py-20 text-center">
      <h1 className="font-display text-4xl font-bold text-gray-900">We couldn&apos;t find that dish</h1>
      <p className="mt-2 text-sm text-gray-500">It may have been removed or does not exist.</p>
      <Link
        href="/menu"
        className="mt-6 inline-block rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-xs transition hover:bg-amber-700"
      >
        Back to the menu
      </Link>
    </div>
  );
}
