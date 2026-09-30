"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { CartIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { useCart } from "../context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/menu?q=${encodeURIComponent(q)}` : "/menu");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 lg:gap-8">
        <Logo />

        <nav aria-label="Main" className="ml-4 hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`border-b-2 py-2 transition-colors ${
                isActive(l.href)
                  ? "border-amber-600 font-semibold text-amber-600"
                  : "border-transparent text-gray-700 hover:text-amber-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} role="search" className="ml-auto hidden max-w-xs flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Search dishes</span>
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width={17} height={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-amber-600 px-1 text-[11px] font-bold text-white shadow-xs">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-2 shadow-lg lg:hidden">
          <form onSubmit={onSearch} role="search" className="mt-2">
            <label className="relative block">
              <span className="sr-only">Search dishes</span>
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width={17} height={17} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </label>
          </form>
          <nav aria-label="Mobile" className="mt-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`border-b border-gray-100 py-3 text-sm font-medium ${
                  isActive(l.href) ? "font-semibold text-amber-600" : "text-gray-800"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
