import Affiliations from "@/components/Affiliations";
import CTA from "@/components/CTA";
import Destinations from "@/components/Destinations";
import FeaturedTrek from "@/components/FeaturedTrek";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JourneyStory from "@/components/JourneyStory";
import Navbar from "@/components/Navbar";
// Blog section hidden for now; uncomment here and in the JSX below to restore it
// import Stories from "@/components/Stories";
import TreksShowcase from "@/components/TreksShowcase";
import TripadvisorReviews from "@/components/TripadvisorReviews";
import { featuredTrek, homepageShowcase } from "@/lib/showcase";

export default function HomePage() {
  return (
    <>
      {/* Navbar is absolutely positioned over the hero */}
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <JourneyStory />
        <TreksShowcase id="treks" eyebrow="Featured Treks" items={homepageShowcase} />
        <FeaturedTrek {...featuredTrek("everest-base-camp-trek")} />
        {/* Blog section hidden for now */}
        {/* <Stories /> */}
        <TripadvisorReviews />
        <CTA />
        <Affiliations />
      </main>
      <Footer />
    </>
  );
}
