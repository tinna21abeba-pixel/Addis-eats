import CheckoutForm from "./CheckoutForm";

export const metadata = { title: "Checkout | Addis Eats" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl bg-white px-5 py-10">
      <h1 className="font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">Checkout</h1>
      <p className="mt-2 text-sm text-gray-600">Tell us where to bring your freshly prepared food in Addis Ababa.</p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
