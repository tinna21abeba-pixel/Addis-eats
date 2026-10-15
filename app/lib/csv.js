import { etb, when, relative } from "./format";

export function escapeCsvCell(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const text = String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function ordersToCsv(orders = []) {
  const headers = [
    "Order ID",
    "Date",
    "Relative Time",
    "Customer Name",
    "Phone",
    "Delivery Address",
    "Neighbourhood",
    "Ordered Items",
    "Total (ETB)",
    "Status",
    "Special Note"
  ];

  const rows = orders.map((o) => {
    const itemsText = Array.isArray(o.items)
      ? o.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")
      : "";

    return [
      escapeCsvCell(o.id),
      escapeCsvCell(when(o.createdAt)),
      escapeCsvCell(relative(o.createdAt)),
      escapeCsvCell(o.name),
      escapeCsvCell(o.phone),
      escapeCsvCell(o.address),
      escapeCsvCell(o.neighbourhood || "Bole"),
      escapeCsvCell(itemsText),
      escapeCsvCell(etb(o.total)),
      escapeCsvCell(o.status),
      escapeCsvCell(o.note || "")
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}
