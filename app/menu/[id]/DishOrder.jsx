"use client";

import { useState } from "react";
import QuantityStepper from "../../components/QuantityStepper";
import AddToCartButton from "../../components/AddToCartButton";
import { formatETB } from "../../lib/format";

export default function DishOrder({ dish }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <AddToCartButton dish={dish} variant="full" quantity={quantity} />
      <p className="w-full text-sm font-medium text-gray-500">
        Total {formatETB(dish.price * quantity)}
      </p>
    </div>
  );
}
