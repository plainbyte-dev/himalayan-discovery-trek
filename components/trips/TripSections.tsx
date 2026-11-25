import Image from "next/image";
import {
  Bed,
  Bus,
  CalendarDays,
  Check,
  Clock,
  FileCheck2,
  Flag,
  Footprints,
  Gauge,
  HeartPulse,
  Mountain,
  Route,
  Users,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import { formatNumber } from "@/lib/format";
import type { Faq, Trip } from "@/lib/trips";

/** Content section: eyebrow + Caveat H2. `id` is the anchor the section nav links to. */
export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className="scroll-mt-20">
      <p className="eyebrow text-saffron-text">{eyebrow}</p>
      <h2 id={id ? `${id}-heading` : undefined} className="mt-3 font-display text-[40px] leading-none text-navy sm:text-6xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** Small white tiles with saffron-text icons. Null fields are left out. */
export function TripFacts({ trip }: { trip: Trip }) {
  const facts = [
    { icon: Clock, label: "Duration", value: `${trip.durationDays} days` },
    {
      icon: Mountain,
      label: "Max altitude",
      value: `${formatNumber(trip.maxAltitude.meters)} m (${formatNumber(trip.maxAltitude.feet)} ft)`,
    },
    { icon: Gauge, label: "Difficulty", value: trip.difficulty },
    { icon: Users, label: "Group size", value: trip.groupSize },
    { icon: CalendarDays, label: "Best season", value: trip.bestSeason.join(", ") },
    {
      icon: Flag,
      label: "Start / end",
      value: trip.startPoint === trip.endPoint ? trip.startPoint : `${trip.startPoint} / ${trip.endPoint}`,
    },
    { icon: Bed, label: "Accommodation", value: trip.accommodation },
    { icon: Utensils, label: "Meals", value: trip.meals },
    { icon: Bus, label: "Transport", value: trip.transport },
    { icon: Footprints, label: "Daily walking", value: trip.dailyWalking },
    { icon: Route, label: "Distance", value: trip.distance },
    { icon: Wifi, label: "Connectivity", value: trip.connectivity },
  ].filter((f): f is typeof f & { value: string } => Boolean(f.value));

  return (
    <div className="mt-10">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">Trip Facts</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-4">
            <Icon className="h-5 w-5 text-saffron-text" aria-hidden="true" />
            <dt className="mt-2 text-xs font-medium text-muted">{label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-navy">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Highlights({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-glacier p-6 sm:p-8">
      <Image
        src="/images/mountain-line-art-white.png"
        alt=""
        aria-hidden="true"
        width={1600}
        height={798}
        className="pointer-events-none absolute -bottom-10 -right-16 w-[28rem] max-w-none select-none opacity-70"
      />
      <h3 className="relative font-display text-4xl leading-none text-navy">Highlights</h3>
      <ul className="relative mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((h) => (
          <li key={h} className="flex gap-2.5 text-navy">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron-text" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IncludesExcludes({ includes, excludes }: { includes: string[]; excludes: string[] }) {
  const card = (title: string, items: string[], included: boolean) => (
    <div className="rounded-3xl border border-line bg-white p-6">
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <ul className="mt-4 space-y-3 text-slate">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            {included ? (
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-label="Included:" />
            ) : (
              <X className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-label="Not included:" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {card("Includes", includes, true)}
      {card("Excludes", excludes, false)}
    </div>
  );
}

export function PermitsAcclimatization({ permits, acclimatization }: { permits: string[]; acclimatization: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-line bg-white p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-glacier">
          <FileCheck2 className="h-5 w-5 text-saffron-text" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-navy">Permits</h3>
        <ul className="mt-3 space-y-2 text-slate">
          {permits.map((p) => (
            <li key={p} className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-line bg-white p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-glacier">
          <HeartPulse className="h-5 w-5 text-saffron-text" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-navy">Acclimatization</h3>
        <p className="mt-3 leading-relaxed text-slate">{acclimatization}</p>
      </div>
    </div>
  );
}

/** Accordion on native <details>, so it works without JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold text-navy [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              className="text-2xl font-normal leading-none text-saffron-text transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="mt-3 pr-10 leading-relaxed text-slate">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
