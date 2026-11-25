"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import TripCard from "@/components/trips/TripCard";
import { formatPrice } from "@/lib/format";
import type { TripSummary } from "@/lib/trips";

type Range = { label: string; min: number; max: number };

// Filter buckets (inclusive bounds). Edit freely; trips are matched against them at runtime.
const DURATION_RANGES: Range[] = [
  { label: "Up to 10 days", min: 0, max: 10 },
  { label: "11–15 days", min: 11, max: 15 },
  { label: "16+ days", min: 16, max: Infinity },
];

const PRICE_RANGES: Range[] = [
  { label: `Under ${formatPrice(1000)}`, min: 0, max: 999 },
  { label: `${formatPrice(1000)}–${formatPrice(1499)}`, min: 1000, max: 1499 },
  { label: `${formatPrice(1500)}+`, min: 1500, max: Infinity },
];

type Sort = { label: string; compare: (a: TripSummary, b: TripSummary) => number };
const SORTS: Record<string, Sort> = {
  recommended: { label: "Recommended", compare: () => 0 },
  "price-asc": { label: "Price: low to high", compare: (a, b) => a.price.offerPerPerson - b.price.offerPerPerson },
  "price-desc": { label: "Price: high to low", compare: (a, b) => b.price.offerPerPerson - a.price.offerPerPerson },
  shortest: { label: "Shortest first", compare: (a, b) => a.durationDays - b.durationDays },
  longest: { label: "Longest first", compare: (a, b) => b.durationDays - a.durationDays },
};

const inRange = (value: number, range?: Range) => !range || (value >= range.min && value <= range.max);

export default function TripExplorer({ trips }: { trips: TripSummary[] }) {
  const [region, setRegion] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("recommended");

  const regionOptions = useMemo(() => Array.from(new Set(trips.map((t) => t.region))), [trips]);

  const results = useMemo(() => {
    const d = DURATION_RANGES.find((r) => r.label === duration);
    const p = PRICE_RANGES.find((r) => r.label === price);
    return trips
      .filter(
        (t) =>
          (!region || t.region === region) && inRange(t.durationDays, d) && inRange(t.price.offerPerPerson, p),
      )
      .sort(SORTS[sort].compare);
  }, [trips, region, duration, price, sort]);

  const hasFilters = Boolean(region || duration || price);
  const clear = () => {
    setRegion("");
    setDuration("");
    setPrice("");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Region chips */}
        <div role="group" aria-label="Filter by region" className="flex flex-wrap gap-2">
          {["", ...regionOptions].map((r) => {
            const active = region === r;
            return (
              <button
                key={r || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setRegion(r)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-navy text-white" : "bg-glacier text-navy hover:bg-glacier-300/60"
                }`}
              >
                {r || "All"}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex">
          <Dropdown label="Duration" value={duration} onChange={setDuration} options={DURATION_RANGES.map((r) => r.label)} anyLabel="Any duration" />
          <Dropdown label="Price" value={price} onChange={setPrice} options={PRICE_RANGES.map((r) => r.label)} anyLabel="Any price" />
          <label className="col-span-2 flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-muted sm:col-span-1">
            Sort by
            <SelectShell>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
                {Object.entries(SORTS).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </SelectShell>
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate">
        <p aria-live="polite">
          Showing <strong className="text-navy">{results.length}</strong> of {trips.length} treks
        </p>
        {hasFilters && (
          <button type="button" onClick={clear} className="link-arrow">
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((trip) => (
            <li key={trip.id}>
              <TripCard trip={trip} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-3xl bg-glacier p-10 text-center">
          <p className="text-slate">No treks match these filters.</p>
          <button type="button" onClick={clear} className="btn-primary mt-4">
            Show all treks
          </button>
        </div>
      )}
    </div>
  );
}

const selectClass =
  "w-full appearance-none rounded-full border border-line bg-white py-2.5 pl-4 pr-10 text-sm font-medium normal-case tracking-normal text-navy focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 lg:w-48";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy" aria-hidden="true" />
    </span>
  );
}

type DropdownProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  anyLabel: string;
};

function Dropdown({ label, value, onChange, options, anyLabel }: DropdownProps) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-muted">
      {label}
      <SelectShell>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
          <option value="">{anyLabel}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </SelectShell>
    </label>
  );
}
