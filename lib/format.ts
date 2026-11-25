// Pure helpers with no data import, safe to use in client components
// without bundling data/himalayan-trips.json into the browser.

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const NEPAL_PATH = "/destinations/nepal";
/** In-page anchor of the "All treks" grid on the Nepal page */
export const ALL_TREKS_PATH = `${NEPAL_PATH}#all-treks`;
export const regionPath = (region: string) => `${NEPAL_PATH}/${slugify(region)}`;
export const tripPath = (trip: { id: string }) => `/trips/${trip.id}`;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const num = new Intl.NumberFormat("en-US");

/** 1305 -> "$1,305" */
export const formatPrice = (amount: number) => usd.format(amount);
/** 5545 -> "5,545" */
export const formatNumber = (n: number) => num.format(n);

/** "+977-9863382935" -> "https://wa.me/9779863382935" (optionally with a prefilled message) */
export function whatsappHref(number: string, message?: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const telHref = (number: string) => `tel:${number.replace(/[^\d+]/g, "")}`;

export const paxLabel = (pax: string) => `${pax} ${pax === "1" ? "person" : "people"}`;

