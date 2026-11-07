import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { contactEmail } from "@/data/site";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-40">
      {/* Photo sits on the right; gradients dissolve it into white on the left, top and bottom */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-2/3">
        <Image
          src="/images/cta-misty-range.jpg"
          alt="Snowy Himalayan range under drifting cloud"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-white/75 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:from-35% lg:via-white/70 lg:to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="container-page relative">
        <Reveal className="max-w-xl">
          <SectionHeading eyebrow="Plan your Journey" title="Your Himalayan Journey Starts Here." />
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Get in touch with our team and let&apos;s plan your perfect adventure in Nepal.
          </p>
          <a href={`mailto:${contactEmail}?subject=Trip%20enquiry`} className="btn-primary mt-8">
            Plan Your Trip
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
