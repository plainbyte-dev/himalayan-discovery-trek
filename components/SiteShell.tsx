import Affiliations from "@/components/Affiliations";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/** Header + footer around an inner page, ending with the shared CTA band and affiliations. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <CTA />
        <Affiliations />
      </main>
      <Footer />
    </>
  );
}
