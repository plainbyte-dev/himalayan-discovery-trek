// Server-only: imports the trip JSON, so keep this out of client components
// (data/site.ts is imported by the client Navbar and must stay data-free).
import { tripadvisorHref, type ContactItem } from "@/data/site";
import { company, telHref, whatsappHref } from "@/lib/trips";

// Built from the `company` object in data/himalayan-trips.json; null fields (e.g. email) are skipped
export const contactDetails: ContactItem[] = [];
if (company.phone) contactDetails.push({ label: company.phone, href: telHref(company.phone) });
if (company.whatsapp) contactDetails.push({ label: `WhatsApp ${company.whatsapp}`, href: whatsappHref(company.whatsapp) });
if (company.email) contactDetails.push({ label: company.email, href: `mailto:${company.email}` });
contactDetails.push({ label: company.location, href: `https://maps.google.com/?q=${encodeURIComponent(company.location)}` });

export const tripadvisor = {
  rating: company.tripadvisor.rating,
  reviewsLabel: `${company.tripadvisor.reviews} ${company.tripadvisor.reviews === 1 ? "review" : "reviews"}`,
  href: tripadvisorHref,
};
