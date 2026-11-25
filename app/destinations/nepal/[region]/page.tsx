import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Mountain, Route } from "lucide-react";
import ImageCard from "@/components/ImageCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PageHero, { HeroMeta } from "@/components/trips/PageHero";
import TripCard from "@/components/trips/TripCard";
import { regionCopy } from "@/data/regions";
import { regionImages } from "@/lib/images";
import {
  company,
  daysRange,
  formatNumber,
  formatPrice,
  getRegion,
  NEPAL_PATH,
  regionPath,
  regions,
  toSummary,
  tripStats,
} from "@/lib/trips";

type Props = { params: Promise<{ region: string }> };

// Only regions present in the data exist; anything else 404s
export const dynamicParams = false;
export const generateStaticParams = () => regions.map((r) => ({ region: r.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getRegion((await params).region);
  if (!region) return {};
  const s = tripStats(region.trips);
  return {
    title: `${region.name} Region Treks in Nepal | ${company.name}`,
    description: `${s.count} ${region.name} region treks in Nepal: ${daysRange(s.minDays, s.maxDays)}, up to ${formatNumber(s.highest)} m, from ${formatPrice(s.fromPrice)} per person. ${region.trips.map((t) => t.name).join(", ")}.`,
    alternates: { canonical: regionPath(region.name) },
  };
}

export default async function RegionPage({ params }: Props) {
  const region = getRegion((await params).region);
  if (!region) notFound();

  const s = tripStats(region.trips);
  const copy = regionCopy(region);
  const images = regionImages(region.slug);
  const others = regions.filter((r) => r.slug !== region.slug);

  return (
    <>
      <PageHero
        heightClass="h-[60vh] min-h-[480px]"
        image={images.hero}
        alt={images.alt}
        eyebrow="Nepal · Region"
        title={`${region.name} Region`}
        intro={copy.description}
      >
        <HeroMeta
          items={[
            { icon: Route, label: `${s.count} ${s.count === 1 ? "trek" : "treks"}` },
            { icon: CalendarDays, label: daysRange(s.minDays, s.maxDays) },
            { icon: Mountain, label: `Highest point ${formatNumber(s.highest)} m` },
          ]}
        />
      </PageHero>

      {/* Breadcrumb under the hero */}
      <nav aria-label="Breadcrumb" className="container-page relative -mt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <li>
            <Link href="/" className="rounded hover:text-navy">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href={NEPAL_PATH} className="rounded hover:text-navy">
              Nepal
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span aria-current="page" className="font-medium text-navy">
              {region.name}
            </span>
          </li>
        </ol>
      </nav>

      <section className="py-16 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow={`${region.name} Treks`} title={copy.headline} />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {region.trips.map((trip, i) => (
              <li key={trip.id}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <TripCard trip={toSummary(trip)} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-glacier py-20" aria-labelledby="other-regions">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-saffron-text">Keep exploring</p>
            <h2 id="other-regions" className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              Other Regions
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {others.map((r) => {
              const img = regionImages(r.slug);
              const rs = tripStats(r.trips);
              return (
                <li key={r.slug}>
                  <ImageCard
                    title={r.name}
                    description={`${rs.count} ${rs.count === 1 ? "trek" : "treks"} · ${daysRange(rs.minDays, rs.maxDays)}`}
                    image={img.card}
                    alt={img.alt}
                    href={regionPath(r.name)}
                    aspect="aspect-[4/5]"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
