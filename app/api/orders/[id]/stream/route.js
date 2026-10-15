import { findOrder } from "../../../../lib/store";
import { getInitialTrackingData, getNextTrackingStep } from "../../../../lib/tracking";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const resolvedParams = params ? await params : {};
  const orderId = resolvedParams.id;
  const order = findOrder(orderId) || {
    id: orderId,
    name: "Customer",
    phone: "0911223344",
    address: "Bole, Ring Road Area",
    neighbourhood: "Bole",
    status: "out_for_delivery",
    createdAt: new Date().toISOString(),
    total: 1100
  };

  let step = 0;
  const encoder = new TextEncoder();
  let intervalId = null;

  const stream = new ReadableStream({
    start(controller) {
      const initialData = getInitialTrackingData(order, step);
      const initialPayload = `data: ${JSON.stringify(initialData)}\n\n`;
      controller.enqueue(encoder.encode(initialPayload));

      intervalId = setInterval(() => {
        step += 1;
        const nextData = getNextTrackingStep(order, step);
        const payload = `data: ${JSON.stringify(nextData)}\n\n`;
        try {
          controller.enqueue(encoder.encode(payload));
        } catch {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }, 3000);
    },
    cancel() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  });

  request.signal.addEventListener("abort", () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive"
    }
  });
}
