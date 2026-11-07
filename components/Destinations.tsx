import DestinationCard from "@/components/DestinationCard";
import Paginated from "@/components/Paginated";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { destinations } from "@/data/destinations";

const PER_PAGE = 3;

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Popular Destination" title="Journey Worth Taking" />
        </Reveal>

        <div className="mt-12">
          <Paginated
            label="Destinations"
            perPage={PER_PAGE}
            listClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            items={destinations.map((destination, i) => (
              // Stagger the cards within each page
              <Reveal key={destination.slug} delay={(i % PER_PAGE) * 0.08} className="h-full">
                <DestinationCard destination={destination} />
              </Reveal>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
