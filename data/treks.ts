export type Trek = {
  slug: string;
  region: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  linkLabel: string;
  href: string;
};

export const treks: Trek[] = [
  {
    slug: "annapurna",
    region: "Annapurna Region",
    title: "Where the Mountains Touch the Sky",
    description:
      "Discover the breathtaking beauty of the Annapurna Himalayas, where towering snow-capped peaks, peaceful mountain villages, and winding trails create an unforgettable experience. Experience the magic of Nepal, one step at a time.",
    image: "/images/trek-annapurna.jpg",
    alt: "Trekker with poles standing before the vast snow-covered south face of Annapurna",
    linkLabel: "Explore Annapurna",
    href: "#contact",
  },
  {
    slug: "manaslu",
    region: "Manaslu Region",
    title: "Into the Untouched Himalayas",
    description:
      "Journey into the remote beauty of Manaslu, where dramatic mountain peaks, hidden villages, and ancient Himalayan traditions await. Discover a quieter side of Nepal, filled with raw wilderness and unforgettable adventures.",
    image: "/images/trek-manaslu.jpg",
    alt: "Hooded hiker crossing misty grassland below a dark, snow-dusted peak",
    linkLabel: "Explore Manaslu",
    href: "#contact",
  },
  {
    slug: "everest",
    region: "Everest Region",
    title: "Stand in the Shadow of Giants",
    description:
      "Experience the legendary beauty of Everest, home to the world's highest peak. Trek through breathtaking mountain landscapes, Sherpa villages, and rugged trails for an adventure that stays with you forever.",
    image: "/images/trek-everest.jpg",
    alt: "Trekker with a heavy pack looking up at Everest emerging from the clouds",
    linkLabel: "Explore Everest",
    href: "#contact",
  },
];
