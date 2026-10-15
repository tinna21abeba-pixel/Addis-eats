const neighbourhoodCoordinates = {
  Bole: { lat: 8.995, lng: 38.785 },
  Kazanchis: { lat: 9.018, lng: 38.769 },
  Piazza: { lat: 9.035, lng: 38.752 },
  Sarbet: { lat: 9.001, lng: 38.736 },
  CMC: { lat: 9.022, lng: 38.835 },
  Kirkos: { lat: 9.012, lng: 38.756 },
  Gerji: { lat: 8.998, lng: 38.805 },
  Arada: { lat: 9.039, lng: 38.76 }
};

const restaurantLocation = {
  name: "Addis Eats Central Kitchen",
  address: "Meskel Square, Addis Ababa",
  lat: 9.02,
  lng: 38.76
};

export function getDestinationCoords(neighbourhood = "Bole") {
  return neighbourhoodCoordinates[neighbourhood] || neighbourhoodCoordinates.Bole;
}

export function getInitialTrackingData(order, step = 0) {
  const neighbourhood = order.neighbourhood || "Bole";
  const destination = getDestinationCoords(neighbourhood);

  const startLat = restaurantLocation.lat;
  const startLng = restaurantLocation.lng;
  const endLat = destination.lat;
  const endLng = destination.lng;

  const totalSteps = 10;
  const progressRatio = Math.min(1, Math.max(0.1, (step % (totalSteps + 1)) / totalSteps));

  const currentLat = Number((startLat + (endLat - startLat) * progressRatio).toFixed(5));
  const currentLng = Number((startLng + (endLng - startLng) * progressRatio).toFixed(5));

  const distanceRemainingKm = Number(
    Math.max(0.1, (1 - progressRatio) * 3.5).toFixed(1)
  );
  const minutesRemaining = Math.max(2, Math.round(distanceRemainingKm * 4));

  return {
    orderId: order.id,
    customerName: order.name,
    customerPhone: order.phone,
    orderStatus: order.status || "out_for_delivery",
    courier: {
      name: "Dawit Mengistu",
      phone: "+251911447788",
      vehicle: "TVS Apache Motorcycle (Plate 2-34567 AA)"
    },
    restaurant: restaurantLocation,
    destination: {
      address: order.address,
      neighbourhood,
      lat: endLat,
      lng: endLng
    },
    courierLocation: {
      lat: currentLat,
      lng: currentLng,
      landmark: `${neighbourhood} Delivery Corridor`
    },
    phase:
      progressRatio >= 1
        ? "Arrived at Delivery Address"
        : "Courier Navigating Towards Destination",
    distanceRemainingKm,
    estimatedDeliveryTime: new Date(Date.now() + minutesRemaining * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    timeline: [
      { step: "Order Received", done: true },
      { step: "Kitchen Preparation", done: true },
      { step: "Courier Picked Up", done: true },
      { step: "Out for Delivery", done: true, current: progressRatio < 1 },
      { step: "Delivered", done: progressRatio >= 1, current: progressRatio >= 1 }
    ]
  };
}

export function getNextTrackingStep(order, step) {
  return getInitialTrackingData(order, step);
}
