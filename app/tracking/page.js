import { listOrders } from "../lib/store";
import { getInitialTrackingData } from "../lib/tracking";
import OrderTracker from "../orders/[id]/track/OrderTracker";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Live Delivery Tracking | Addis Eats",
  description: "Track live courier delivery and arrival times for Addis Eats orders."
};

export default async function GeneralTrackingPage({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const orders = listOrders();

  const requestedId = resolvedParams.orderId;
  const order =
    (requestedId ? orders.find((o) => o.id === requestedId) : null) ||
    orders[0] || {
      id: "ORD-1001",
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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
            Real-Time Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Live Delivery Tracking
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Tracking courier dispatch and ETA for {order.id}.
          </p>
        </div>

        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Select order:</span>
            <div className="flex flex-wrap gap-1">
              {orders.slice(0, 5).map((o) => (
                <a
                  key={o.id}
                  href={`/tracking?orderId=${o.id}`}
                  className={`px-2.5 py-1 text-xs font-mono rounded border ${
                    o.id === order.id
                      ? "bg-white text-black font-bold border-white"
                      : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white"
                  }`}
                >
                  {o.id}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <OrderTracker order={order} initialTracking={initialTracking} />
    </div>
  );
}
