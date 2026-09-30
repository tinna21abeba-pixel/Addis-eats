import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="tibeb" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3 md:items-center">
        <Logo />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600 md:justify-center">
          <Link href="/" className="transition hover:text-amber-600">Home</Link>
          <Link href="/menu" className="transition hover:text-amber-600">Menu</Link>
          <Link href="/about" className="transition hover:text-amber-600">About</Link>
          <Link href="/contact" className="transition hover:text-amber-600">Contact</Link>
        </nav>
        <div className="md:text-right">
          <p className="font-display text-xl font-bold text-amber-700" lang="am">እንኳን ደህና መጡ</p>
          <p className="text-xs text-gray-500">Welcome to Addis Eats · Authentic Food</p>
        </div>
      </div>
      <p className="border-t border-gray-200/80 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Addis Eats. All rights reserved. Addis Ababa, Ethiopia.
      </p>
    </footer>
  );
}
