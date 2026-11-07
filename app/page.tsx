import Affiliations from "@/components/Affiliations";
import CTA from "@/components/CTA";
import Destinations from "@/components/Destinations";
import FeaturedTrek from "@/components/FeaturedTrek";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JourneyStory from "@/components/JourneyStory";
import Navbar from "@/components/Navbar";
import Stories from "@/components/Stories";
import TreksShowcase from "@/components/TreksShowcase";

export default function HomePage() {
  return (
    <>
      {/* Navbar is absolutely positioned over the hero */}
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <JourneyStory />
        <TreksShowcase />
        <FeaturedTrek />
        <Stories />
        <CTA />
        <Affiliations />
      </main>
      <Footer />
    </>
  );
}
