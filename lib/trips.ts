import raw from "@/data/himalayan-trips.json";
import { slugify } from "@/lib/format";

export * from "@/lib/format";

// ---------------------------------------------------------------------------
// Types for data/himalayan-trips.json (the single source of trip content)
// ---------------------------------------------------------------------------

export type GroupTier = { pax: string; pricePerPerson: number | null };

export type TripPrice = {
  currency: string;
  offerPerPerson: number;
  regularPerPerson: number;
  saving: number;
  groupTiers: GroupTier[];
};

export type ItineraryDay = {
  day: number;
  title: string;
  /** Display string, may carry a place name, e.g. "5,140 m (Gorak Shep)" */
  altitude: string | null;
  altitudeMeters: number | null;
  duration: string | null;
  description: string;
};

export type Faq = { question: string; answer: string };

export type Trip = {
  id: string;
  name: string;
  url: string;
  country: string;
  region: string;
  durationDays: number;
  price: TripPrice;
  maxAltitude: { meters: number; feet: number; location: string };
  difficulty: string;
  groupSize: string;
  bestSeason: string[];
  startPoint: string;
  endPoint: string;
  accommodation: string;
  meals: string;
  transport: string;
  dailyWalking: string | null;
  distance: string | null;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  permits: string[];
  acclimatization: string;
  connectivity: string | null;
  faqs: Faq[];
  /** Internal notes about source inconsistencies. Never rendered. */
  dataNotes?: string;
};

export type Company = {
  name: string;
  tagline: string;
  location: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  affiliations: string[];
  tripadvisor: { rating: number; reviews: number };
  payments: string[];
};

type TripsFile = {
  company: Company;
  bookingPolicy: string[];
  trips: Trip[];
};

// Assigning (not casting) makes TypeScript check the JSON against the types above.
const data: TripsFile = raw;

export type Region = { name: string; slug: string; trips: Trip[] };

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------

export const company = data.company;
export const bookingPolicy = data.bookingPolicy;

/** Nepal only. Bhutan/Tibet entries in the JSON are deliberately ignored. */
export const nepalTrips: Trip[] = data.trips.filter((t) => t.country === "Nepal");

/** Regions grouped by each trip's `region` field, in order of first appearance. */
export const regions: Region[] = nepalTrips.reduce<Region[]>((acc, trip) => {
  const existing = acc.find((r) => r.name === trip.region);
  if (existing) existing.trips.push(trip);
  else acc.push({ name: trip.region, slug: slugify(trip.region), trips: [trip] });
  return acc;
}, []);

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);

export const getTrip = (id: string) => nepalTrips.find((t) => t.id === id);

/** Other trips in the same region first, topped up from other regions to reach `min`. */
export function similarTrips(trip: Trip, min = 3): Trip[] {
  const others = nepalTrips.filter((t) => t.id !== trip.id);
  const sameRegion = others.filter((t) => t.region === trip.region);
  const fill = others.filter((t) => t.region !== trip.region).slice(0, Math.max(0, min - sameRegion.length));
  return [...sameRegion, ...fill];
}

/** Headline numbers for a set of trips (used for region rows, heroes and the stats strip). */
export function tripStats(trips: Trip[]) {
  const days = trips.map((t) => t.durationDays);
  return {
    count: trips.length,
    minDays: Math.min(...days),
    maxDays: Math.max(...days),
    highest: Math.max(...trips.map((t) => t.maxAltitude.meters)),
    fromPrice: Math.min(...trips.map((t) => t.price.offerPerPerson)),
    seasons: Array.from(new Set(trips.flatMap((t) => t.bestSeason))),
  };
}

export const daysRange = (min: number, max: number) => (min === max ? `${min} days` : `${min}–${max} days`);

/** Group tiers that actually have a price (null tiers are hidden). */
export const pricedTiers = (trip: Trip) =>
  trip.price.groupTiers.filter((t): t is { pax: string; pricePerPerson: number } => t.pricePerPerson !== null);

/** Itinerary points for the altitude chart (null altitudes skipped). */
export const altitudePoints = (trip: Trip) =>
  trip.itinerary
    .filter((d): d is ItineraryDay & { altitudeMeters: number } => d.altitudeMeters !== null)
    .map((d) => ({ day: d.day, meters: d.altitudeMeters, title: d.title }));

/** SEO description from the trip overview, kept within ~160 characters. */
export function tripMetaDescription(trip: Trip) {
  const text = trip.overview.trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
}

/** The fields a trip card needs; keeps client payloads small. */
export type TripSummary = Pick<Trip, "id" | "name" | "region" | "durationDays" | "difficulty" | "price"> & {
  maxAltitude: Pick<Trip["maxAltitude"], "meters">;
};

export const toSummary = ({ id, name, region, durationDays, difficulty, price, maxAltitude }: Trip): TripSummary => ({
  id,
  name,
  region,
  durationDays,
  difficulty,
  price,
  maxAltitude: { meters: maxAltitude.meters },
});
