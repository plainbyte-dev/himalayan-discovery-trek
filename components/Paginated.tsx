"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginatedProps = {
  /** Already-rendered items (e.g. cards), each with a stable key */
  items: React.ReactNode[];
  perPage: number;
  /** Classes for the <ul> holding the current page */
  listClassName?: string;
  /** Names what is being paged, for screen readers, e.g. "destinations" */
  label: string;
};

/** Shows `perPage` items at a time, with prev/next arrows on either side and one dot per page underneath. */
export default function Paginated({ items, perPage, listClassName, label }: PaginatedProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / perPage);
  const visible = items.slice(page * perPage, page * perPage + perPage);

  // White circles straddling the grid's left/right edges, vertically centred on the cards
  const arrowClass =
    "absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg shadow-navy/20 ring-1 ring-gray-200 transition hover:bg-primary hover:text-white hover:ring-primary disabled:pointer-events-none disabled:opacity-0";

  return (
    <>
      <div className="relative">
        <ul className={listClassName} aria-live="polite">
          {visible.map((item, i) => (
            <li key={page * perPage + i}>{item}</li>
          ))}
        </ul>

        {pageCount > 1 && (
          <>
            <button
              type="button"
              className={`${arrowClass} left-0 -translate-x-1/2`}
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              aria-label={`Previous ${label.toLowerCase()}`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${arrowClass} right-0 translate-x-1/2`}
              onClick={() => setPage((p) => p + 1)}
              disabled={page === pageCount - 1}
              aria-label={`Next ${label.toLowerCase()}`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {pageCount > 1 && (
        <nav aria-label={`${label} pages`} className="mt-8 flex items-center justify-center gap-1">
          {Array.from({ length: pageCount }, (_, i) => (
            // Padded button keeps a comfortable tap target around the small dot
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-current={i === page ? "page" : undefined}
              aria-label={`Page ${i + 1} of ${pageCount}`}
              className="group/dot p-2"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  i === page ? "w-8 bg-primary" : "w-2.5 bg-gray-300 group-hover/dot:bg-gray-400"
                }`}
              />
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
