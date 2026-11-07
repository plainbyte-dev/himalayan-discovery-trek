export type Story = {
  slug: string;
  title: string;
  /** Teaser shown on the card (clamped to two lines) */
  excerpt: string;
  readTime: string;
  image: string;
  alt: string;
  href: string;
};

// TODO: replace the excerpts and read times with the real articles
export const stories: Story[] = [
  {
    slug: "mountains-taught-me-patience",
    title: "When the Mountains Taught Me Patience",
    excerpt: "Slow days on the trail, thin air and a lesson in letting the mountains set the pace.",
    readTime: "6 min read",
    image: "/images/story-patience.jpg",
    alt: "Trekker standing on a rocky outcrop above swirling mountain cloud",
    href: "#contact",
  },
  {
    slug: "life-in-himalayan-villages",
    title: "Life in the Himalayan Villages",
    excerpt: "Tea houses, terraced fields and the families who welcome trekkers into their homes.",
    readTime: "5 min read",
    image: "/images/story-villages.jpg",
    alt: "Terraced hillside village beneath a distant snowy range",
    href: "#contact",
  },
  {
    slug: "quiet-morning-in-the-himalayas",
    title: "A Quiet Morning in the Himalayas",
    excerpt: "Waking before sunrise to watch the peaks surface from a sea of cloud.",
    readTime: "4 min read",
    image: "/images/story-quiet-morning.jpg",
    alt: "Rocky peaks rising out of a sea of morning cloud",
    href: "#contact",
  },
];
