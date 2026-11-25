// Server-only: Tripadvisor Content API (https://tripadvisor-content-api.readme.io).
// Needs TRIPADVISOR_API_KEY in the environment. Without it every function returns null and the
// reviews UI stays hidden, so the site still builds and runs.
//
// The API returns at most the 5 most recent reviews. Display rules we follow (see the docs'
// "Display Requirements"): show Tripadvisor's own bubble-rating images (never our own icons),
// the Tripadvisor logo next to the overall rating, review text in quotation marks with its date,
// credited to a "Tripadvisor traveler", and no hand-picking or reordering of the reviews.

// Import from server components only. The key is safe either way: Next.js only exposes env vars
// prefixed with NEXT_PUBLIC_ to the browser, and TRIPADVISOR_API_KEY is not.

/** From the listing URL: .../Attraction_Review-g293890-d13998083-Reviews-Himalayan_Discovery_Trek-... */
export const TRIPADVISOR_LOCATION_ID = "13998083";
export const TRIPADVISOR_LISTING_URL =
  "https://www.tripadvisor.com/Attraction_Review-g293890-d13998083-Reviews-Himalayan_Discovery_Trek-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html";

import { siteUrl } from "@/data/site";

const API_BASE = process.env.TRIPADVISOR_API_BASE ?? "https://api.content.tripadvisor.com/api/v1";
/** Refresh Tripadvisor content once a day */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export type TripadvisorSummary = {
  name: string;
  rating: number;
  ratingImageUrl: string;
  numReviews: number;
  webUrl: string;
  writeReviewUrl?: string;
};

export type TripadvisorReview = {
  id: number;
  title: string;
  text: string;
  rating: number;
  ratingImageUrl: string;
  publishedDate: string;
  travelDate?: string;
  tripType?: string;
  url: string;
  username?: string;
  userLocation?: string;
  ownerResponse?: { text: string; author?: string; publishedDate?: string };
};

async function call<T>(path: string): Promise<T | null> {
  const key = process.env.TRIPADVISOR_API_KEY;
  if (!key) return null;

  const url = `${API_BASE}/location/${TRIPADVISOR_LOCATION_ID}/${path}${path.includes("?") ? "&" : "?"}language=en&key=${encodeURIComponent(key)}`;
  try {
    const res = await fetch(url, {
      // Referer lets a key restricted to the site's domain work from the server
      headers: { accept: "application/json", Referer: `${siteUrl}/` },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      // 403 usually means the key's IP/domain restrictions don't match, or the key isn't active yet
      console.warn(`[tripadvisor] ${path} failed: HTTP ${res.status}`);
      return null;
    }
    const body = (await res.json()) as T & { error?: { message?: string } };
    if (body.error) {
      console.warn(`[tripadvisor] ${path} error: ${body.error.message ?? "unknown"}`);
      return null;
    }
    return body;
  } catch (err) {
    console.warn(`[tripadvisor] ${path} request failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}

type DetailsResponse = {
  name?: string;
  rating?: number | string;
  rating_image_url?: string;
  num_reviews?: string | number;
  web_url?: string;
  write_review?: string;
};

/** Overall rating for the listing, or null when the API isn't configured or fails. */
export async function getTripadvisorSummary(): Promise<TripadvisorSummary | null> {
  const d = await call<DetailsResponse>("details");
  if (!d?.rating || !d.rating_image_url) return null;
  return {
    name: d.name ?? "",
    rating: Number(d.rating),
    ratingImageUrl: d.rating_image_url,
    numReviews: Number(d.num_reviews ?? 0),
    webUrl: d.web_url ?? TRIPADVISOR_LISTING_URL,
    writeReviewUrl: d.write_review,
  };
}

type ReviewsResponse = {
  data?: {
    id: number;
    title?: string;
    text?: string;
    rating: number;
    rating_image_url: string;
    published_date: string;
    travel_date?: string;
    trip_type?: string;
    url: string;
    user?: { username?: string; user_location?: { name?: string } };
    owner_response?: { text?: string; author?: string; published_date?: string };
  }[];
};

/** Most recent reviews (up to 5), in the order Tripadvisor returns them. */
export async function getTripadvisorReviews(): Promise<TripadvisorReview[] | null> {
  const r = await call<ReviewsResponse>("reviews");
  if (!r?.data?.length) return null;
  return r.data.map((x) => ({
    id: x.id,
    title: x.title ?? "",
    text: x.text ?? "",
    rating: x.rating,
    ratingImageUrl: x.rating_image_url,
    publishedDate: x.published_date,
    travelDate: x.travel_date,
    tripType: x.trip_type,
    url: x.url,
    username: x.user?.username,
    userLocation: x.user?.user_location?.name,
    ownerResponse: x.owner_response?.text
      ? { text: x.owner_response.text, author: x.owner_response.author, publishedDate: x.owner_response.published_date }
      : undefined,
  }));
}
