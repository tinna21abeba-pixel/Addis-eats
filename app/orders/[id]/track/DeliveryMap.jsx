"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryMap({
  courierLocation = { lat: 9.01, lng: 38.77 },
  destination = { lat: 8.995, lng: 38.785, address: "Delivery Address" }
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const courierMarkerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([courierLocation.lat, courierLocation.lng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    const destIcon = L.divIcon({
      className: "destination-marker",
      html: '<div style="background:#18181b;color:#ffffff;font-weight:bold;font-size:11px;padding:4px 8px;border-radius:4px;border:2px solid #ffffff;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.5);">Destination</div>',
      iconSize: [80, 26],
      iconAnchor: [40, 13]
    });

    const courierIcon = L.divIcon({
      className: "courier-marker",
      html: '<div style="background:#ffffff;color:#000000;font-weight:bold;font-size:11px;padding:4px 8px;border-radius:9999px;border:2px solid #000000;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.5);">Courier</div>',
      iconSize: [64, 26],
      iconAnchor: [32, 13]
    });

    L.marker([destination.lat, destination.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(destination.address || "Delivery Address");

    const courierMarker = L.marker([courierLocation.lat, courierLocation.lng], {
      icon: courierIcon
    })
      .addTo(map)
      .bindPopup("Courier in transit");

    const line = L.polyline(
      [
        [courierLocation.lat, courierLocation.lng],
        [destination.lat, destination.lng]
      ],
      {
        color: "#ffffff",
        weight: 3,
        dashArray: "6, 6"
      }
    ).addTo(map);

    const bounds = L.latLngBounds([
      [courierLocation.lat, courierLocation.lng],
      [destination.lat, destination.lng]
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });

    mapRef.current = map;
    courierMarkerRef.current = courierMarker;
    lineRef.current = line;

    return () => {
      map.remove();
      mapRef.current = null;
      courierMarkerRef.current = null;
      lineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !courierMarkerRef.current || !lineRef.current) return;

    courierMarkerRef.current.setLatLng([courierLocation.lat, courierLocation.lng]);
    lineRef.current.setLatLngs([
      [courierLocation.lat, courierLocation.lng],
      [destination.lat, destination.lng]
    ]);
  }, [courierLocation.lat, courierLocation.lng, destination.lat, destination.lng]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "420px" }}
      className="w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 z-0 relative"
    />
  );
}
