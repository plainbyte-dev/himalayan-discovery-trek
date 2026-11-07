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

// Anchor links to sections on the single page
export const navLinks: NavLink[] = [
  { label: "Destinations", href: "#destinations" },
  { label: "Treks", href: "#treks" },
  { label: "Stories", href: "#journey" },
  { label: "Blog", href: "#stories" },
];

// TODO: replace with the company's real profiles
export const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "X", href: "https://x.com/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "WhatsApp", href: "https://wa.me/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
];

export const contactEmail = "info@himalayandiscoverytrek.com";

// TODO: replace the placeholder phone numbers with the real ones
export const contactDetails: ContactItem[] = [
  { label: "+977-98XX-XXXXXX", href: "tel:+97798XXXXXXXX" },
  { label: "+977-98XX-XXXXXX", href: "tel:+97798XXXXXXXX" },
  { label: contactEmail, href: `mailto:${contactEmail}` },
  { label: "Thamel, Kathmandu", href: "https://maps.google.com/?q=Thamel,+Kathmandu" },
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

// TODO: confirm the rating and review count, and link the real Tripadvisor listing
export const tripadvisor = {
  rating: 4.9,
  reviewsLabel: "Based on traveller reviews",
  href: "https://www.tripadvisor.com/",
};
