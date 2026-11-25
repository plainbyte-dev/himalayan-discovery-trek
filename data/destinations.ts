import { tripImages } from "@/lib/images";
import { formatNumber, nepalTrips, tripPath } from "@/lib/trips";

export type Destination = {
  slug: string;
  title: string;
  /** One or two sentences shown on the card (clamped to two lines) */
  description: string;
  duration: string;
  /** Keep to one word so the card's meta row stays on one line */
  difficulty: string;
  maxAltitude: string;
  image: string;
  alt: string;
  href: string;
};

// "Journey Worth Taking" cards on the homepage: every Nepal trip in data/himalayan-trips.json,
// in data order, so the section always matches the trip pages.
export const destinations: Destination[] = nepalTrips
  .map((trip) => {
    const images = tripImages(trip.id);
    return {
      slug: trip.id,
      title: trip.name,
      description: trip.overview,
      duration: `${trip.durationDays} days`,
      difficulty: trip.difficulty,
      maxAltitude: `${formatNumber(trip.maxAltitude.meters)} m`,
      image: images.card,
      alt: images.alt,
      href: tripPath(trip),
    };
  });
