import Link from "next/link";
import dishes, { categories, popularDishes } from "./data/dishes";
import SmartImage from "./components/SmartImage";
import DishCard from "./components/DishCard";
import CartPanel from "./components/CartPanel";
import { ArrowIcon, BikeIcon, BowlIcon, HeartHandIcon, LeafIcon } from "./components/Icons";

const features = [
  { icon: BowlIcon, title: "Authentic recipes", text: "Passed down for generations" },
  { icon: LeafIcon, title: "Fresh ingredients", text: "Locally sourced every day" },
  { icon: BikeIcon, title: "Fast delivery", text: "Direct to your door in Addis" },
];

export default function HomePage() {
  const moreDishes = dishes.filter((d) => !d.popular).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-gray-100 bg-white">
        
        <SmartImage
          src="https://tse3.mm.bing.net/th/id/OIP.jVMTts7fOWeg750kJ7q8OwHaFW?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="View over the city of Addis Ababa"
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/92 to-white/70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white via-transparent to-white/50" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div>
            <p className="hero-rise text-xs font-bold tracking-[0.25em] text-amber-700">
              TRADITIONAL · FRESH · AUTHENTIC
            </p>
            <h1 className="hero-rise hero-rise-2 mt-4 font-display text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
              Addis <span className="text-amber-600">Eats</span>
            </h1>
            <p className="hero-rise hero-rise-2 mt-3 font-display text-2xl font-medium text-gray-800 sm:text-3xl">
              Taste the real Ethiopia
            </p>
            <p className="hero-rise hero-rise-3 mt-4 max-w-md text-base leading-relaxed text-gray-600">
              From spongy injera to rich, spiced doro wat and sizzling tibs, experience genuine Habesha culinary culture made with love and time-honored tradition.
            </p>
            <div className="hero-rise hero-rise-3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-amber-700"
              >
                Order now <ArrowIcon width={17} height={17} />
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-700 shadow-2xs transition hover:border-amber-500 hover:text-amber-600"
              >
                Explore menu
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Hero plate with circular inner shadow */}
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-amber-500 shadow-xl">
              <SmartImage
                src="/images/hero-plate.jpg"
                alt="Doro wat and traditional Ethiopian dishes served on injera"
                priority
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full dish-inner-shadow"
              />
            </div>
            <div className="absolute -bottom-2 right-2 rounded-2xl border border-gray-200 bg-white/95 px-5 py-3 shadow-lg backdrop-blur sm:right-6">
              <p className="font-display text-lg font-bold text-amber-700">Doro Wat</p>
              <p className="text-xs font-medium text-gray-500">Ethiopia&apos;s national dish</p>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-10 gap-y-4 px-5 pb-10">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-amber-200 bg-amber-50 text-amber-700 shadow-2xs">
                <Icon width={20} height={20} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">{title}</span>
                <span className="block text-xs text-gray-500">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular Dishes + Cart Sidebar Section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900">Popular dishes</h2>
                <p className="mt-1 text-sm text-gray-500">Our most requested authentic favorites</p>
              </div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800 hover:underline"
              >
                View all <ArrowIcon width={16} height={16} />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {popularDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>

            {/* Story Banner */}
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-gray-200 shadow-xs">
              <SmartImage
                src="/images/story-food.jpg"
                alt="A shared Ethiopian beyaynetu platter"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-3/4" />
              <div className="relative max-w-md p-8 sm:p-10">
                <p className="text-xs font-bold tracking-[0.25em] text-amber-700">TASTE THE TRADITION</p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-gray-950">
                  More than just food
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  A culture of hospitality, sharing, and centuries-old recipes brought to life in every single bite.
                </p>
                <Link
                  href="/about"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-amber-700"
                >
                  Our story <ArrowIcon width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky Cart Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CartPanel />
          </div>
        </div>
      </section>

      {/* Menu Categories & Highlights */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav aria-label="Menu categories" className="h-fit rounded-2xl border border-gray-200 bg-gray-50/70 p-4 shadow-2xs">
            <h2 className="px-2 pb-3 font-display text-lg font-bold text-gray-900">
              Menu categories
            </h2>
            <ul className="space-y-1">
              {categories.map((c, i) => (
                <li key={c}>
                  <Link
                    href={i === 0 ? "/menu" : `/menu?category=${encodeURIComponent(c)}`}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      i === 0
                        ? "bg-amber-600 font-semibold text-white shadow-xs"
                        : "text-gray-700 hover:bg-gray-100 hover:text-amber-700"
                    }`}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">All dishes</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {moreDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
              <Link
                href="/menu"
                className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center transition hover:border-amber-500 hover:bg-amber-50/40"
              >
                <span className="font-display text-xl font-bold text-gray-900">See the full menu</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-600 text-white shadow-xs">
                  <ArrowIcon width={18} height={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xs md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-gray-900">About Addis Eats</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-gray-600">
              Addis Eats brings you the authentic taste of Ethiopia. We use fresh, local ingredients and traditional recipes to give you a true Habesha dining experience, wherever you are.
            </p>
            <ul className="mt-6 flex flex-wrap gap-6 text-sm">
              {[
                [BowlIcon, "Authentic flavors"],
                [LeafIcon, "Quality ingredients"],
                [HeartHandIcon, "Warm hospitality"],
              ].map(([Icon, label]) => (
                <li key={label} className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-amber-200 bg-amber-50 text-amber-700">
                    <Icon width={17} height={17} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-2xs transition hover:border-amber-500 hover:text-amber-700"
            >
              Learn more <ArrowIcon width={16} height={16} />
            </Link>
          </div>
          <div className="relative min-h-64 overflow-hidden border-t border-gray-200 md:border-l md:border-t-0">
            <SmartImage
              src="/images/city-skyline.jpg"
              alt="Addis Ababa skyline"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0">
              <div className="tibeb" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
