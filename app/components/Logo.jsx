import Link from "next/link";

export function LogoMark({ className = "h-9 w-9 text-amber-600" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 24h36c0 9-7 16-16 16h-4C13 40 6 33 6 24Z" />
      <path d="M14 44h20" />
      <path d="M17 17c0-3 3-3 3-7M24 17c0-3 3-3 3-7M31 17c0-3 3-3 3-7" />
    </svg>
  );
}

export default function Logo({ compact = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-amber-600" aria-label="Addis Eats home">
      <LogoMark />
      <span className="leading-tight">
        <span className="block font-display text-2xl font-bold tracking-tight text-gray-900">
          Addis <span className="text-amber-600">Eats</span>
        </span>
        {!compact && (
          <span className="block text-[11px] font-medium tracking-wide text-gray-500">
            Authentic Ethiopian Food
          </span>
        )}
      </span>
    </Link>
  );
}
