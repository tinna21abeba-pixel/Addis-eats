import Link from "next/link";
import SmartImage from "../components/SmartImage";
import { ArrowIcon } from "../components/Icons";

export const metadata = { title: "About | Addis Eats" };

const values = [
  {
    title: "Traditional recipes",
    text: "Berbere, mitmita, and niter kibbeh are prepared the traditional way, following treasured family recipes passed down through generations in Addis Ababa.",
  },
  {
    title: "Fresh, local ingredients",
    text: "Fresh vegetables, herbs, and meats are sourced daily from local markets and prepared to order with utmost hygiene and care.",
  },
  {
    title: "Fasting & vegan friendly",
    text: "With a rich heritage of fasting platters (tsom beyeaynetu), more than half our menu is naturally plant-based, vegan, and packed with wholesome nutrition.",
  },
];

const photoCredits = [
  { dish: "City Skyline", note: "Addis Ababa city panorama" },
  { dish: "Doro Wat", note: "Traditional chicken stew and boiled egg on injera" },
  { dish: "Kitfo", note: "Minced beef seasoned with mitmita and ayibe" },
  { dish: "Tibs", note: "Sautéed lamb with fresh rosemary and peppers" },
  { dish: "Shiro", note: "Spiced chickpea stew in clay pot" },
  { dish: "Beyaynetu", note: "Assorted vegetarian fasting combination platter" },
  { dish: "Kik Alicha", note: "Mild split-pea stew with turmeric and garlic" },
  { dish: "Gomen", note: "Braised collard greens with mild cheese" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="relative isolate overflow-hidden border-b border-gray-100 bg-white">
        <SmartImage
          src="/images/city-skyline.jpg"
          alt="Addis Ababa city view"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white via-white/90 to-white/60" />
        <div className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.25em] text-amber-700">OUR STORY</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            More than just food. A culture, a story, a feeling.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Addis Eats brings the authentic taste of Ethiopia to your table. We cook with fresh, local ingredients and traditional recipes to give you a true Habesha dining experience, wherever you are in the city.
          </p>
        </div>
      </section>

      {/* Values section */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-xs">
              <h2 className="font-display text-2xl font-bold text-amber-700">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            See what we cook <ArrowIcon width={18} height={18} />
          </Link>
        </div>
      </section>

      {/* Photography credits */}
      <section id="credits" className="mx-auto max-w-7xl scroll-mt-24 border-t border-gray-100 px-5 py-12">
        <h2 className="font-display text-2xl font-bold text-gray-900">Photography</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          All food and landscape imagery is stored locally in the project under public/images and represents authentic Ethiopian culinary dishes and views of Addis Ababa.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {photoCredits.map((c) => (
            <li key={c.dish} className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
              <p className="font-semibold text-gray-900">{c.dish}</p>
              <p className="text-xs text-gray-500 mt-1">{c.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
