import { ALL_TREKS_PATH, NEPAL_PATH } from "@/lib/format";

export const siteUrl = "https://himalayandiscoverytrek.com";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: "Facebook" | "X" | "Instagram" | "WhatsApp" | "YouTube";
  href: string;
};

export type ContactItem = {
  label: string;
  /** tel:, mailto: or map link; omit for plain text */
  href?: string;
};

export type Affiliation = {
  name: string;
  /** Short label shown in the placeholder badge until a logo is added */
  short: string;
  /** e.g. "/images/taan.svg" (transparent SVG/PNG works best) */
  logo?: string;
};

// Root-relative so they also work from the trip pages
export const navLinks: NavLink[] = [
  { label: "Destinations", href: NEPAL_PATH },
  { label: "Treks", href: ALL_TREKS_PATH },
  { label: "Stories", href: "/#journey" },
  // Blog link hidden while the blog section on the homepage is commented out
  // { label: "Blog", href: "/#stories" },
];

// TODO: replace with the company's real profiles
export const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "X", href: "https://x.com/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "WhatsApp", href: "https://wa.me/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
];

export const affiliations: Affiliation[] = [
  {
    name: "Government of Nepal, Ministry of Culture, Tourism & Civil Aviation",
    short: "GoN",
    logo: "/images/govnep-emblem.png",
  },
  { name: "Nepal Tourism Board", short: "NTB", logo: "/images/ntb.svg" },
  { name: "Trekking Agencies' Association of Nepal", short: "TAAN", logo: "/images/taan.svg" },
  { name: "Nepal Mountaineering Association", short: "NMA", logo: "/images/nma.svg" },
];

// Company listing on Tripadvisor (location ID 13998083, used by lib/tripadvisor.ts)
export const tripadvisorHref =
  "https://www.tripadvisor.com/Attraction_Review-g293890-d13998083-Reviews-Himalayan_Discovery_Trek-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html";
