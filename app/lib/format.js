const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

const relativeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto"
});

export const etb = (amount) => {
  return "ETB " + numberFormatter.format(Number(amount) || 0);
};

export const formatETB = etb;

export const when = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";
  return dateTimeFormatter.format(d);
};

export const relative = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const diffMs = d.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffSec) < 45) {
    return diffSec >= 0 ? "in a few seconds" : "just now";
  }
  if (Math.abs(diffMin) < 60) {
    return relativeFormatter.format(diffMin, "minute");
  }
  if (Math.abs(diffHours) < 24) {
    return relativeFormatter.format(diffHours, "hour");
  }
  return relativeFormatter.format(diffDays, "day");
};

export const DELIVERY_FEE = 50;
