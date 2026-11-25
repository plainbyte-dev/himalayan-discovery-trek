"use client";

import { useState } from "react";
import { ArrowRight, Check, MessageCircle, Star } from "lucide-react";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { formatPrice, paxLabel, whatsappHref } from "@/lib/format";

type Tier = { pax: string; pricePerPerson: number };

type BookingBoxProps = {
  tripId: string;
  tripName: string;
  offerPrice: number;
  regularPrice: number;
  /** Only tiers with a price; null tiers are removed upstream */
  tiers: Tier[];
  policy: string[];
  whatsapp: string | null;
  tripadvisor: { rating: number; reviews: number; href: string };
};

/**
 * Booking panel (sticky sidebar on desktop, in-flow on mobile) plus a fixed mobile
 * bottom bar. Both share the selected group size.
 */
export default function BookingBox({
  tripId,
  tripName,
  offerPrice,
  regularPrice,
  tiers,
  policy,
  whatsapp,
  tripadvisor,
}: BookingBoxProps) {
  const { open } = useEnquiry();
  // Default to the tier matching the advertised offer price, else the first
  const [tierIndex, setTierIndex] = useState(() => Math.max(0, tiers.findIndex((t) => t.pricePerPerson === offerPrice)));
  const tier = tiers[tierIndex];
  const price = tier?.pricePerPerson ?? offerPrice;

  const book = () => open({ mode: "booking", tripId, groupSize: tier?.pax });
  const enquiryHref = whatsapp
    ? whatsappHref(whatsapp, `Hi, I'm interested in the ${tripName}${tier ? ` for ${paxLabel(tier.pax)}` : ""}.`)
    : null;

  return (
    <>
      <section aria-label="Book this trek" className="rounded-3xl bg-white p-6 shadow-xl shadow-navy/10 sm:p-7">
        <p className="eyebrow text-muted">From</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-5xl leading-none text-navy" aria-live="polite">
            {formatPrice(price)}
          </span>
          {regularPrice > price && (
            <s className="text-muted">
              <span className="sr-only">regular price </span>
              {formatPrice(regularPrice)}
            </s>
          )}
        </p>
        <p className="mt-1 text-sm text-slate">per person{tier ? ` · ${paxLabel(tier.pax)}` : ""}</p>

        {tiers.length > 1 && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-navy">Group size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {tiers.map((t, i) => {
                const selected = i === tierIndex;
                return (
                  <button
                    key={t.pax}
                    type="button"
                    aria-pressed={selected}
                    aria-label={`${paxLabel(t.pax)}, ${formatPrice(t.pricePerPerson)} per person`}
                    onClick={() => setTierIndex(i)}
                    className={`min-w-[3.25rem] rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                      selected ? "bg-navy text-white" : "bg-glacier text-navy hover:bg-glacier-300/60"
                    }`}
                  >
                    {t.pax.replace("-", "–")}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="mt-6 grid gap-3">
          <button type="button" onClick={book} className="btn-primary w-full">
            Book Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {enquiryHref && (
            <a href={enquiryHref} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          )}
        </div>

        {policy.length > 0 && (
          <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-slate">
            {policy.map((point) => (
              <li key={point} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        )}

        <a
          href={tripadvisor.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center gap-2 rounded-2xl border border-line px-4 py-3 text-sm transition hover:border-tripadvisor"
        >
          <Star className="h-4 w-4 fill-tripadvisor text-tripadvisor" aria-hidden="true" />
          <span className="font-semibold text-tripadvisor">{tripadvisor.rating}</span>
          <span className="text-slate">
            on Tripadvisor · {tripadvisor.reviews} {tripadvisor.reviews === 1 ? "review" : "reviews"}
          </span>
        </a>
      </section>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 py-3 shadow-[0_-6px_20px_rgba(14,42,71,0.08)] backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="leading-tight">
            <span className="text-xs text-muted">from </span>
            <span className="font-display text-3xl text-navy">{formatPrice(price)}</span>
            <span className="block text-xs text-slate">per person{tier ? ` · ${paxLabel(tier.pax)}` : ""}</span>
          </p>
          <button type="button" onClick={book} className="btn-primary">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
