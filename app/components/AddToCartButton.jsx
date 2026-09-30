"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CheckIcon, PlusIcon } from "./Icons";

export default function AddToCartButton({ dish, variant = "icon", quantity = 1 }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(dish, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-amber-700 active:scale-[0.98]"
      >
        {added ? <CheckIcon /> : <PlusIcon />}
        <span aria-live="polite">{added ? "Added to cart" : "Add to cart"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? `${dish.name} added` : `Add ${dish.name} to cart`}
      className="grid h-9 w-9 place-items-center rounded-full bg-amber-600 text-white shadow-xs transition hover:bg-amber-700 active:scale-95"
    >
      {added ? <CheckIcon width={17} height={17} /> : <PlusIcon width={17} height={17} />}
    </button>
  );
}
