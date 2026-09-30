import Link from "next/link";
import SmartImage from "./SmartImage";
import AddToCartButton from "./AddToCartButton";
import { FlameIcon } from "./Icons";
import { formatETB } from "../lib/format";

export function SpiceLevel({ level }) {
  if (!level) return <span className="text-xs text-gray-400">Mild</span>;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-600" aria-label={`Spice level ${level} of 3`}>
      {Array.from({ length: level }).map((_, i) => (
        <FlameIcon key={i} width={13} height={13} />
      ))}
    </span>
  );
}

export default function DishCard({ dish, priority = false }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-md dish-card-shadow">
      {/* Dish photo with gray inner shadow looking inside */}
      <Link
        href={`/menu/${dish.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-gray-50"
        aria-label={`View ${dish.name}`}
      >
        <SmartImage
          src={dish.image}
          alt={`${dish.name}, served on injera`}
          priority={priority}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Gray inner shadow that looks inside */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 dish-inner-shadow"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-gray-900">
            <Link href={`/menu/${dish.id}`} className="transition hover:text-amber-600">
              {dish.name}
            </Link>
          </h3>
          <span className="text-xs font-medium text-amber-700" lang="am">
            {dish.amharic}
          </span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-600">
          {dish.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="text-base font-bold text-amber-600">{formatETB(dish.price)}</p>
            <SpiceLevel level={dish.spice} />
          </div>
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}
