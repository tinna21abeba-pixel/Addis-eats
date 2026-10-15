import { listOrders } from "../../../lib/store";
import { ordersToCsv } from "../../../lib/csv";

export const dynamic = "force-dynamic";

export async function GET() {
  const orders = listOrders();
  const csvContent = ordersToCsv(orders);

  return new Response(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="addis-eats-orders.csv"',
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}
