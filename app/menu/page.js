import Link from "next/link";
import dishes, { categories } from "../data/dishes";
import DishCard from "../components/DishCard";
import { SearchIcon } from "../components/Icons";

export const metadata = { title: "Menu | Addis Eats" };

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const category = categories.includes(params?.category) ? params.category : "All Dishes";
  const q = (params?.q || "").trim();

  const results = dishes.filter((d) => {
    const inCategory = category === "All Dishes" || d.category === category;
    const inSearch =
      !q || `${d.name} ${d.amharic} ${d.description} ${d.category}`.toLowerCase().includes(q.toLowerCase());
    return inCategory && inSearch;
  });

  const hrefFor = (c) => {
    const sp = new URLSearchParams();
    if (c !== "All Dishes") sp.set("category", c);
    if (q) sp.set("q", q);
    const s = sp.toString();
    return s ? `/menu?${s}` : "/menu";
  };

  return (
    <div className="bg-white">
      <header className="max-w-2xl">
        <p className="text-xs font-bold tracking-[0.25em] text-amber-700">OUR MENU</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
          Traditional Ethiopian dishes
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Every dish is prepared freshly with aromatic berbere, seasoned niter kibbeh, and warm injera.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6">
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              href={hrefFor(c)}
              scroll={false}
              aria-current={c === category ? "true" : undefined}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                c === category
                  ? "bg-amber-600 text-white shadow-xs font-semibold"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-amber-400 hover:text-amber-700 shadow-2xs"
              }`}
            >
              {c}
            </Link>
          ))}
        </nav>

        <form action="/menu" role="search" className="relative w-full md:w-72">
          {category !== "All Dishes" && <input type="hidden" name="category" value={category} />}
          <label>
            <span className="sr-only">Search dishes</span>
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width={17} height={17} />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </label>
        </form>
      </div>

      {results.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-dashed border-gray-300 p-12 text-center bg-gray-50/50">
          <h2 className="font-display text-2xl font-bold text-gray-900">No dishes match &ldquo;{q}&rdquo;</h2>
          <p className="mt-2 text-sm text-gray-500">Try another search keyword, or browse all dishes.</p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-700"
          >
            Show all dishes
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
