import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Gauge, Mountain, Users } from "lucide-react";
import { EnquiryButton } from "@/components/enquiry/EnquiryProvider";
import Paginated from "@/components/Paginated";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import AltitudeProfile from "@/components/trips/AltitudeProfile";
import BookingBox from "@/components/trips/BookingBox";
import Itinerary from "@/components/trips/Itinerary";
import PageHero, { HeroMeta } from "@/components/trips/PageHero";
import SectionNav from "@/components/trips/SectionNav";
import TripCard, { SaveBadge } from "@/components/trips/TripCard";
import {
  FaqList,
  Highlights,
  IncludesExcludes,
  PermitsAcclimatization,
  Section,
  TripFacts,
} from "@/components/trips/TripSections";
import TripadvisorReviews, { TripadvisorBadge } from "@/components/TripadvisorReviews";
import { tripadvisor } from "@/data/contact";
import { siteUrl } from "@/data/site";
import { tripImages } from "@/lib/images";
import {
  altitudePoints,
  bookingPolicy,
  company,
  formatNumber,
  getTrip,
  NEPAL_PATH,
  nepalTrips,
  pricedTiers,
  regionPath,
  similarTrips,
  toSummary,
  tripMetaDescription,
  tripPath,
  type Trip,
} from "@/lib/trips";

type Props = { params: Promise<{ tripId: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => nepalTrips.map((t) => ({ tripId: t.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trip = getTrip((await params).tripId);
  if (!trip) return {};
  const title = `${trip.name} – ${trip.durationDays} Days | ${company.name}`;
  const description = tripMetaDescription(trip);
  const image = tripImages(trip.id);
  return {
    title,
    description,
    alternates: { canonical: tripPath(trip) },
    openGraph: {
      type: "website",
      url: tripPath(trip),
      title,
      description,
      images: [{ url: image.hero, width: 2560, height: 1440, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.hero] },
  };
}

/** schema.org TouristTrip, built only from the trip data. */
function tripJsonLd(trip: Trip) {
  const url = `${siteUrl}${tripPath(trip)}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.overview,
    url,
    image: `${siteUrl}${tripImages(trip.id).hero}`,
    touristType: "Trekking",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: trip.itinerary.length,
      itemListElement: trip.itinerary.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Day ${d.day}: ${d.title}`,
        description: d.description,
      })),
    },
    offers: {
      "@type": "Offer",
      price: trip.price.offerPerPerson,
      priceCurrency: trip.price.currency,
      url,
    },
    provider: {
      "@type": "TravelAgency",
      name: company.name,
      url: siteUrl,
      ...(company.phone && { telephone: company.phone }),
      ...(company.email && { email: company.email }),
      address: { "@type": "PostalAddress", streetAddress: company.location, addressCountry: "NP" },
    },
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "includes", label: "Includes" },
  { id: "permits", label: "Permits" },
  { id: "faqs", label: "FAQs" },
];

export default async function TripPage({ params }: Props) {
  const trip = getTrip((await params).tripId);
  if (!trip) notFound();

  const images = tripImages(trip.id);
  const points = altitudePoints(trip);
  const similar = similarTrips(trip);
  const navLinks = SECTIONS.filter((s) => s.id !== "faqs" || trip.faqs.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd(trip)).replace(/</g, "\\u003c") }}
      />

      <PageHero
        heightClass="h-[80vh] min-h-[600px] supports-[height:100svh]:h-[80svh]"
        image={images.hero}
        alt={images.alt}
        eyebrow={`${trip.region} Region`}
        title={trip.name}
        crumbs={[
          { label: "Nepal", href: NEPAL_PATH },
          { label: trip.region, href: regionPath(trip.region) },
          { label: trip.name },
        ]}
      >
        <HeroMeta
          items={[
            { icon: Clock, label: `${trip.durationDays} days` },
            { icon: Gauge, label: trip.difficulty },
            {
              icon: Mountain,
              label: `Max ${formatNumber(trip.maxAltitude.meters)} m (${formatNumber(trip.maxAltitude.feet)} ft)`,
            },
            { icon: Users, label: `Group ${trip.groupSize}` },
          ]}
        />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <EnquiryButton mode="booking" tripId={trip.id} className="btn-primary">
            Book This Trek
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </EnquiryButton>
          <EnquiryButton tripId={trip.id} className="btn-ghost py-3">
            Enquire
          </EnquiryButton>
          <SaveBadge amount={trip.price.saving} className="ml-1 px-4 py-1.5 text-sm" />
        </div>
      </PageHero>

      <SectionNav links={navLinks} />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,35%)] lg:gap-14 lg:py-20">
        <div className="min-w-0 space-y-20">
          <Section id="overview" eyebrow="The Journey" title={`About the ${trip.name}`}>
            <p className="max-w-3xl text-lg leading-relaxed text-slate">{trip.overview}</p>
            <TripFacts trip={trip} />
          </Section>

          {trip.highlights.length > 0 && <Highlights items={trip.highlights} />}

          {/* A line needs at least two points; trips with fewer listed altitudes skip the chart */}
          {points.length >= 2 && (
            <Section eyebrow="Altitude Profile" title="How High You'll Go">
              <AltitudeProfile points={points} totalDays={trip.durationDays} />
            </Section>
          )}

          <Section id="itinerary" eyebrow="Day by Day" title="Itinerary">
            <Itinerary days={trip.itinerary} />
          </Section>

          <Section id="includes" eyebrow="What's Covered" title="Includes & Excludes">
            <IncludesExcludes includes={trip.includes} excludes={trip.excludes} />
          </Section>

          <Section id="permits" eyebrow="Before You Go" title="Permits & Acclimatization">
            <PermitsAcclimatization permits={trip.permits} acclimatization={trip.acclimatization} />
          </Section>

          {trip.faqs.length > 0 && (
            <Section id="faqs" eyebrow="Good to Know" title="FAQs">
              <FaqList faqs={trip.faqs} />
            </Section>
          )}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <BookingBox
            tripId={trip.id}
            tripName={trip.name}
            offerPrice={trip.price.offerPerPerson}
            regularPrice={trip.price.regularPerPerson}
            tiers={pricedTiers(trip)}
            policy={bookingPolicy}
            whatsapp={company.whatsapp}
            tripadvisorBadge={
              <TripadvisorBadge fallback={{ ...company.tripadvisor, href: tripadvisor.href }} />
            }
          />
        </aside>
      </div>

      <TripadvisorReviews />

      {similar.length > 0 && (
        <section className="bg-glacier py-20 lg:py-28">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="You may also like" title="Similar Treks" />
            </Reveal>
            <div className="mt-12">
              <Paginated
                label="Similar treks"
                perPage={3}
                listClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                items={similar.map((t) => (
                  <TripCard key={t.id} trip={toSummary(t)} />
                ))}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
