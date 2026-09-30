import CartView from "./CartView";

export const metadata = { title: "Your Cart | Addis Eats" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl bg-white px-5 py-10">
      <h1 className="font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">Your cart</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
