import type { Metadata, Viewport } from "next";
import { Caveat_Brush, Gochi_Hand, Poppins } from "next/font/google";
import EnquiryProvider from "@/components/enquiry/EnquiryProvider";
import { siteUrl } from "@/data/site";
import { company, nepalTrips, pricedTiers } from "@/lib/trips";
import "./globals.css";

// Body + UI text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Hand-drawn display font for section headings
const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Handwritten font for the footer tagline
const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Himalayan Discovery Trek | Nepal Trekking Adventures",
  description:
    "Life-changing treks through the Himalayas. Explore Everest Base Camp, Gokyo and more with Himalayan Discovery Trek, your local Nepal trekking team.",
  keywords: ["Nepal trekking", "Everest Base Camp", "Himalayas", "Gokyo trek", "trekking company Nepal"],
  icons: { icon: "/images/logo.png" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Himalayan Discovery Trek",
    title: "Himalayan Discovery Trek | Nepal Trekking Adventures",
    description: "Discover the Himalayas: life-changing journeys through mountains, culture and adventure.",
    images: [
      {
        url: "/images/hero-ama-dablam.jpg",
        width: 2560,
        height: 1441,
        alt: "Ama Dablam rising above the Khumbu valley in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himalayan Discovery Trek",
    description: "Life-changing journeys through the Himalayas.",
    images: ["/images/hero-ama-dablam.jpg"],
  },
};

// Only names/ids and tier labels go to the client, not the full trip data
const enquiryTrips = nepalTrips.map(({ id, name }) => ({ id, name }));
const groupSizes = Array.from(new Set(nepalTrips.flatMap((t) => pricedTiers(t).map((tier) => tier.pax))));

export const viewport: Viewport = {
  themeColor: "#0E2A47",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveatBrush.variable} ${gochiHand.variable}`}>
      <body>
        <EnquiryProvider trips={enquiryTrips} groupSizes={groupSizes} whatsapp={company.whatsapp}>
          {children}
        </EnquiryProvider>
      </body>
    </html>
  );
}
