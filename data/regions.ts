import { treks } from "@/data/treks";
import { formatNumber } from "@/lib/format";
import { daysRange, tripStats, type Region } from "@/lib/trips";

/**
 * Marketing copy for a region. Everest, Annapurna and Manaslu reuse the homepage's
 * Featured Treks copy (data/treks.ts). Regions without copy fall back to a line built
 * from the trip data. Add entries to REGION_COPY to give them their own words.
 */
const REGION_COPY: Record<string, { headline: string; description: string }> = {};

const firstSentence = (text: string) => text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;

export function regionCopy(region: Region) {
  const custom = REGION_COPY[region.slug];
  if (custom) return custom;

  const homepage = treks.find((t) => t.slug === region.slug);
  if (homepage) return { headline: homepage.title, description: firstSentence(homepage.description) };

  const s = tripStats(region.trips);
  return {
    headline: `The ${region.name} Region`,
    description: `${region.trips.map((t) => t.name).join(" and ")}: ${daysRange(s.minDays, s.maxDays)}, up to ${formatNumber(s.highest)} m.`,
  };
}
