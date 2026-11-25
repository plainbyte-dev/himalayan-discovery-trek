"use client";

import { useState } from "react";
import { ChevronDown, Clock, Mountain } from "lucide-react";
import type { ItineraryDay } from "@/lib/trips";

const INITIAL_DAYS = 3;

/** Vertical day-by-day timeline. Shows the first few days; "Expand all" reveals the rest. */
export default function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = days.length - INITIAL_DAYS;
  // All days stay in the HTML (good for search engines); later ones are hidden until expanded
  const lastShown = expanded ? days.length - 1 : Math.min(INITIAL_DAYS, days.length) - 1;

  return (
    <div>
      <ol className="relative" id="itinerary-days">
        {days.map((day, i) => (
          // Index key: source data can repeat day numbers
          // (`hidden` class, not attribute: the `flex` utility would override the attribute)
          <li key={i} className={`relative gap-5 ${i > lastShown ? "hidden" : "flex"} ${i === lastShown ? "" : "pb-8"}`}>
            {/* Dotted connector to the next day */}
            {i < lastShown && (
              <span
                className="absolute bottom-0 left-5 top-10 -translate-x-1/2 border-l-2 border-dotted border-glacier-300"
                aria-hidden="true"
              />
            )}
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron text-sm font-bold text-navy shadow-md shadow-saffron/25">
              <span className="sr-only">Day </span>
              {day.day}
            </span>
            <div className="min-w-0 pt-1.5">
              <h3 className="text-lg font-semibold leading-snug text-navy">{day.title}</h3>
              {(day.altitude || day.duration) && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {day.altitude && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-glacier px-3 py-1 text-xs font-medium text-navy">
                      <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">Altitude: </span>
                      {day.altitude}
                    </li>
                  )}
                  {day.duration && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-glacier px-3 py-1 text-xs font-medium text-navy">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">Duration: </span>
                      {day.duration}
                    </li>
                  )}
                </ul>
              )}
              <p className="mt-3 leading-relaxed text-slate">{day.description}</p>
            </div>
          </li>
        ))}
      </ol>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-controls="itinerary-days"
          className="link-arrow mt-6"
        >
          {expanded ? "Show less" : `Expand all (${hidden} more ${hidden === 1 ? "day" : "days"})`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
