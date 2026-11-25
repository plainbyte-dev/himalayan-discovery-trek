import { Clock, Footprints, Mountain } from "lucide-react";
import ImageCard from "@/components/ImageCard";
import { formatNumber, formatPrice, tripPath } from "@/lib/format";
import { tripImages } from "@/lib/images";
import type { TripSummary } from "@/lib/trips";

/** "Save $X" offer pill. flag-red is reserved for offers and savings. */
export function SaveBadge({ amount, className = "" }: { amount: number; className?: string }) {
  if (amount <= 0) return null;
  return (
    <span className={`inline-block rounded-full bg-flag-red px-3 py-1 text-xs font-semibold text-white shadow-md ${className}`}>
      Save {formatPrice(amount)}
    </span>
  );
}

type TripCardProps = {
  trip: TripSummary;
  sizes?: string;
  aspect?: string;
};

/** Homepage-style photo card for a trip: the whole card links to the trip page. */
export default function TripCard({
  trip,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw",
  aspect,
}: TripCardProps) {
  const images = tripImages(trip.id);
  const { offerPerPerson, regularPerPerson, saving } = trip.price;

  return (
    <ImageCard
      title={trip.name}
      image={images.card}
      alt={images.alt}
      href={tripPath(trip)}
      sizes={sizes}
      aspect={aspect}
      badge={<SaveBadge amount={saving} />}
      meta={[
        { icon: Clock, label: `${trip.durationDays} days` },
        { icon: Footprints, label: trip.difficulty },
        { icon: Mountain, label: `${formatNumber(trip.maxAltitude.meters)} m` },
      ]}
      footer={
        // White chip keeps the navy price readable on the photo
        <p className="mt-4 inline-flex items-baseline gap-2 self-start rounded-full bg-white px-4 py-1.5 text-xs text-slate">
          from <span className="text-lg font-bold text-navy">{formatPrice(offerPerPerson)}</span>
          {regularPerPerson > offerPerPerson && (
            <s className="text-muted">
              <span className="sr-only">regular price </span>
              {formatPrice(regularPerPerson)}
            </s>
          )}
        </p>
      }
    />
  );
}
