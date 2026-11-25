// Server-side builders that turn trip data into props for the shared homepage components.
import type { FeaturedTrekProps } from "@/components/FeaturedTrek";
import type { ShowcaseItem } from "@/components/TreksShowcase";
import { regionCopy } from "@/data/regions";
import { treks } from "@/data/treks";
import { regionImages, tripImages } from "@/lib/images";
import { daysRange, formatNumber, getTrip, regionPath, regions, tripPath, tripStats } from "@/lib/trips";

/** Props for the FeaturedTrek photo banner, from a trip id. */
export function featuredTrek(id: string, overrides: Partial<FeaturedTrekProps> = {}): FeaturedTrekProps {
  const trip = getTrip(id);
  if (!trip) throw new Error(`Unknown trip id "${id}" for FeaturedTrek`);
  const images = tripImages(trip.id);
  return {
    title: trip.name,
    days: trip.durationDays,
    difficulty: trip.difficulty,
    maxAltitude: `${formatNumber(trip.maxAltitude.meters)} m`,
    href: tripPath(trip),
    image: images.hero,
    alt: images.alt,
    ...overrides,
  };
}

/** Homepage "Featured Treks" rows (copy from data/treks.ts). */
export const homepageShowcase: ShowcaseItem[] = treks.map((t) => ({
  key: t.slug,
  eyebrow: t.region,
  title: t.title,
  description: t.description,
  href: t.href,
  linkLabel: t.linkLabel,
  image: t.image,
  alt: t.alt,
}));

/** One row per Nepal region, for the destination page. */
export const regionShowcase: ShowcaseItem[] = regions.map((region) => {
  const copy = regionCopy(region);
  const s = tripStats(region.trips);
  const images = regionImages(region.slug);
  return {
    key: region.slug,
    eyebrow: `${region.name} Region`,
    title: copy.headline,
    description: copy.description,
    detail: `${s.count} ${s.count === 1 ? "trek" : "treks"} · ${daysRange(s.minDays, s.maxDays)}`,
    href: regionPath(region.name),
    linkLabel: `Explore ${region.name}`,
    image: images.card,
    alt: images.alt,
  };
});
