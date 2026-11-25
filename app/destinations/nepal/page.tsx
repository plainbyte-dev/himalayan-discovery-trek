import type { Metadata } from "next";
import { ArrowDown, CalendarDays, Map as MapIcon, Mountain, Route } from "lucide-react";
import FeaturedTrek from "@/components/FeaturedTrek";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TreksShowcase from "@/components/TreksShowcase";
import PageHero from "@/components/trips/PageHero";
import TripExplorer from "@/components/trips/TripExplorer";
import { nepalImage } from "@/lib/images";
import { featuredTrek, regionShowcase } from "@/lib/showcase";
import { company, formatNumber, formatPrice, NEPAL_PATH, nepalTrips, regions, toSummary, tripStats } from "@/lib/trips";

const stats = tripStats(nepalTrips);
const regionList = `${regions
  .slice(0, -1)
  .map((r) => r.name)
  .join(", ")} and ${regions.at(-1)?.name}`;

export const metadata: Metadata = {
  title: `Trek Nepal: ${stats.count} Treks in ${regionList} | ${company.name}`,
  description: `Compare ${stats.count} Nepal treks across the ${regionList} regions: ${stats.minDays}–${stats.maxDays} days, up to ${formatNumber(stats.highest)} m, from ${formatPrice(stats.fromPrice)} per person.`,
  alternates: { canonical: NEPAL_PATH },
};

export default function NepalPage() {
  const strip = [
    { icon: Route, value: String(stats.count), label: "Treks" },
    { icon: MapIcon, value: String(regions.length), label: "Regions" },
    { icon: Mountain, value: `Up to ${formatNumber(stats.highest)} m`, label: "Max altitude" },
    { icon: CalendarDays, value: stats.seasons.join(" & "), label: "Best seasons" },
  ];

  return (
    <>
      <PageHero
        variant="center"
        heightClass="h-[70vh] min-h-[560px] supports-[height:100svh]:h-[70svh]"
        image={nepalImage.hero}
        alt={nepalImage.alt}
        eyebrow="Destination"
        title={
          <>
            Trek <span className="text-saffron">Nepal</span>
          </>
        }
        intro={`${stats.count} treks across the ${regionList} regions, from ${stats.minDays} to ${stats.maxDays} days.`}
        scrollTo="#all-treks"
      >
        <a href="#all-treks" className="btn-primary mt-8">
          Find Your Trek
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </PageHero>

      {/* Quick stats strip */}
      <section aria-label="Nepal at a glance" className="container-page relative z-10 -mt-10">
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center divide-line rounded-3xl bg-white px-4 py-6 shadow-xl shadow-navy/10 sm:divide-x">
          {strip.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex w-1/2 flex-col items-center gap-1 px-4 py-2 text-center sm:w-auto sm:px-8">
              <Icon className="h-5 w-5 text-saffron-text" aria-hidden="true" />
              <span className="text-xl font-bold text-navy">{value}</span>
              <span className="text-sm text-slate">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-20 lg:pt-28">
        <TreksShowcase
          id="regions"
          eyebrow="Explore by Region"
          title="Choose Your Mountains"
          items={regionShowcase}
        />
      </div>

      <section id="all-treks" className="scroll-mt-4 bg-white py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="All Treks" title="Journeys Worth Taking" />
          </Reveal>
          <div className="mt-10">
            <TripExplorer trips={nepalTrips.map(toSummary)} />
          </div>
        </div>
      </section>

      <FeaturedTrek {...featuredTrek("everest-base-camp-trek")} />
    </>
  );
}
