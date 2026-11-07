import { Clock, Footprints, Mountain } from "lucide-react";
import ImageCard from "@/components/ImageCard";
import type { Destination } from "@/data/destinations";

export default function DestinationCard({ destination }: { destination: Destination }) {
  const { title, description, duration, difficulty, maxAltitude, image, alt, href } = destination;

  return (
    <ImageCard
      title={title}
      description={description}
      image={image}
      alt={alt}
      href={href}
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      meta={[
        { icon: Clock, label: duration },
        { icon: Footprints, label: difficulty },
        { icon: Mountain, label: maxAltitude },
      ]}
    />
  );
}
