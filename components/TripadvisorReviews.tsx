import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getTripadvisorReviews, getTripadvisorSummary } from "@/lib/tripadvisor";

// Tripadvisor's official logo (horizontal lockup from static.tacdn.com; transparent background).
// Their rules: at least 20 px high, never inverted. A text wordmark is shown if the file is missing.
const LOGO_SRC = "/images/tripadvisor/logo.svg";
const hasLogo = existsSync(path.join(process.cwd(), "public", LOGO_SRC));

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

export function TripadvisorLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return hasLogo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={LOGO_SRC} alt="Tripadvisor" className={className} />
  ) : (
    <span className="text-lg font-bold tracking-tight text-black">Tripadvisor</span>
  );
}

/**
 * Compact rating badge linking to the listing: live bubble image when the API is configured,
 * otherwise the rating from the trip data as plain text.
 */
export async function TripadvisorBadge({ fallback }: { fallback: { rating: number; reviews: number; href: string } }) {
  const ta = await getTripadvisorSummary();
  const reviews = ta?.numReviews ?? fallback.reviews;
  return (
    <a
      href={ta?.webUrl ?? fallback.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-line bg-white px-4 py-3 text-sm transition hover:border-tripadvisor"
    >
      <TripadvisorLogo />
      {ta ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={ta.ratingImageUrl} alt={`Rated ${ta.rating} out of 5 on Tripadvisor`} className="h-auto w-[80px]" />
      ) : (
        <span className="font-semibold text-tripadvisor">{fallback.rating} / 5</span>
      )}
      <span className="text-slate">
        {reviews} {reviews === 1 ? "review" : "reviews"}
      </span>
    </a>
  );
}

/**
 * "What our trekkers say": live reviews from the Tripadvisor Content API.
 * Renders nothing when TRIPADVISOR_API_KEY isn't set or the API returns no reviews.
 */
export default async function TripadvisorReviews({ className = "" }: { className?: string }) {
  const [summary, reviews] = await Promise.all([getTripadvisorSummary(), getTripadvisorReviews()]);
  if (!summary || !reviews) return null;

  return (
    <section id="reviews" aria-label="Tripadvisor traveller reviews" className={`py-20 lg:py-28 ${className}`}>
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Traveller Reviews" title="What Our Trekkers Say" />

          {/* Overall rating: Tripadvisor logo + their bubble image, on white, left-aligned */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-3xl bg-white px-6 py-4 shadow-lg shadow-navy/10">
            <TripadvisorLogo />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={summary.ratingImageUrl}
              alt={`Rated ${summary.rating} out of 5 on Tripadvisor`}
              className="h-auto w-[110px]"
            />
            <span className="text-sm text-slate">
              {summary.numReviews} {summary.numReviews === 1 ? "review" : "reviews"}
            </span>
            <span className="flex gap-4 text-sm">
              <a href={summary.webUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Read all reviews
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              {summary.writeReviewUrl && (
                <a href={summary.writeReviewUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                  Write a review
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </span>
          </div>
        </Reveal>

        {/* Shown in the order Tripadvisor returns them (most recent first); never filtered or reordered */}
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, i) => (
            <li key={review.id}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-6 text-left shadow-lg shadow-navy/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.ratingImageUrl}
                    alt={`Rated ${review.rating} out of 5`}
                    className="h-auto w-[90px]"
                  />
                  {review.title && <h3 className="mt-4 text-lg font-semibold leading-snug text-navy">{review.title}</h3>}
                  <blockquote cite={review.url} className="mt-3 line-clamp-6 leading-relaxed text-slate">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow mt-3 self-start"
                  >
                    Read full review on Tripadvisor
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <footer className="mt-auto border-t border-line pt-4 text-sm text-muted">
                    <p className="font-medium text-navy">
                      Tripadvisor traveler{review.username ? ` ${review.username}` : ""}
                      {review.userLocation && <span className="font-normal text-muted"> · {review.userLocation}</span>}
                    </p>
                    <p className="mt-0.5">
                      Reviewed <time dateTime={review.publishedDate}>{formatDate(review.publishedDate)}</time>
                      {review.tripType && ` · ${review.tripType}`}
                    </p>
                  </footer>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
