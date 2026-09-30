import Link from "next/link";
import { notFound } from "next/navigation";
import dishes, { getDish } from "../../data/dishes";
import SmartImage from "../../components/SmartImage";
import DishCard, { SpiceLevel } from "../../components/DishCard";
import { ClockIcon } from "../../components/Icons";
import { formatETB } from "../../lib/format";
import DishOrder from "./DishOrder";

export async function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  return dish ? { title: `${dish.name} | Addis Eats`, description: dish.description } : {};
}

export default async function DishDetails({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  if (!dish) notFound();

  const related = dishes.filter((d) => d.category === dish.category && d.id !== dish.id).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm font-medium text-gray-500">
        <Link href="/menu" className="transition hover:text-amber-600">
          Menu
        </Link>{" "}
        / <span className="text-gray-900">{dish.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Dish image with inner gray shadow looking inside */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-md">
          <SmartImage
            src={dish.image}
            alt={`${dish.name}, served on injera`}
            priority
            className="h-full w-full object-cover"
          />
          {/* Gray inner shadow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl dish-inner-shadow"
          />
        </div>

        <div className="self-center">
          <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            {dish.category}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            {dish.name}
          </h1>
          <p className="mt-1 text-xl font-medium text-amber-700" lang="am">
            {dish.amharic}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600">
            {dish.description}
          </p>

          <dl className="mt-6 flex flex-wrap gap-8 border-y border-gray-100 py-4 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Spice Level</dt>
              <dd className="mt-1">
                <SpiceLevel level={dish.spice} />
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Preparation Time</dt>
              <dd className="mt-1 flex items-center gap-1.5 font-medium text-gray-800">
                <ClockIcon width={16} height={16} className="text-amber-600" />
                {dish.prep}
              </dd>
            </div>
          </dl>

          <p className="mt-6 font-display text-3xl font-bold text-amber-600">
            {formatETB(dish.price)}
          </p>
          <DishOrder dish={dish} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-gray-100 pt-12">
          <h2 className="font-display text-3xl font-bold text-gray-900">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
