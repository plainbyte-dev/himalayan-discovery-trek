export type Destination = {
  slug: string;
  title: string;
  /** One or two sentences shown on the card (clamped to two lines) */
  description: string;
  duration: string;
  /** Keep to one word so the card's meta row stays on one line */
  difficulty: string;
  maxAltitude: string;
  image: string;
  alt: string;
  href: string;
};

// TODO: review the descriptions and difficulty grades
export const destinations: Destination[] = [
  {
    slug: "everest-base-camp",
    title: "Everest Base Camp",
    description:
      "Follow the classic Khumbu trail through Sherpa villages and monasteries to the foot of the world's highest mountain.",
    duration: "14 days",
    difficulty: "Challenging",
    maxAltitude: "5,364 m",
    image: "/images/dest-everest-base-camp.jpg",
    alt: "Snow-covered Himalayan peak glowing under evening cloud",
    href: "#contact",
  },
  {
    slug: "everest-base-camp-via-gokyo",
    title: "Everest Base Camp via Gokyo",
    description:
      "Add the turquoise Gokyo lakes and the Cho La pass to the Everest journey for a quieter, wilder loop.",
    duration: "18 days",
    difficulty: "Strenuous",
    maxAltitude: "5,420 m",
    image: "/images/dest-gokyo.jpg",
    alt: "Sea of clouds below jagged Himalayan ridges at sunrise",
    href: "#contact",
  },
  {
    slug: "everest-stupa-camp",
    title: "Everest Stupa Camp",
    description:
      "A gentler taste of the Khumbu, with prayer-flag stupas and big Everest views without the high passes.",
    duration: "10 days",
    difficulty: "Moderate",
    maxAltitude: "3,880 m",
    image: "/images/dest-stupa.jpg",
    alt: "White Buddhist stupa on a trail with the Everest range behind",
    href: "#contact",
  },
  {
    slug: "everest-base-camp-trek",
    title: "Everest Base Camp Trek",
    description:
      "A tighter itinerary to Base Camp and Kala Patthar for trekkers who are short on time but fit and well prepared.",
    duration: "12 days",
    difficulty: "Challenging",
    maxAltitude: "5,364 m",
    image: "/images/dest-ebc-trek.jpg",
    alt: "Pink alpenglow on twin Himalayan summits at dusk",
    href: "#contact",
  },
];
