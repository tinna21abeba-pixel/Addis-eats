import { findOrder, listOrders } from "../../../lib/store";
import { getInitialTrackingData } from "../../../lib/tracking";
import OrderTracker from "./OrderTracker";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = params ? await params : {};
  const orderId = resolvedParams.id || "ORD-1001";
  return {
    title: `Track Order ${orderId} | Addis Eats`,
    description: `Live courier delivery tracking for Addis Eats order ${orderId}.`
  };
}

export default async function TrackOrderPage({ params }) {
  const resolvedParams = params ? await params : {};
  const orderId = resolvedParams.id || "ORD-1001";

  const allOrders = listOrders();
  const order =
    findOrder(orderId) ||
    allOrders.find((o) => o.id === orderId) || {
      id: orderId,
      name: "Valued Customer",
      phone: "0911223344",
      address: "Bole, Ring Road Area",
      neighbourhood: "Bole",
      status: "out_for_delivery",
      createdAt: new Date().toISOString(),
      total: 1100,
      items: [
        { dishId: 1, name: "Kitfo", price: 350, quantity: 2 },
        { dishId: 2, name: "Doro Wat", price: 400, quantity: 1 }
      ]
    };

  const initialTracking = getInitialTrackingData(order, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
          Live Order Tracking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Delivery Tracking: {order.id}
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Real-time location of your courier and delivery countdown.
        </p>
      </div>

      <OrderTracker order={order} initialTracking={initialTracking} />
    </div>
  );
}
