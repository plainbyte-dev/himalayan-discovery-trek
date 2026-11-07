import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function JourneyStory() {
  return (
    <section id="journey" className="overflow-hidden py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/15 lg:aspect-[5/4]">
            <Image
              src="/images/journey-prayer-flags.jpg"
              alt="Colourful prayer flags strung across a ridge below a pointed Himalayan peak"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="relative">
          {/* Faint line-art mountains behind the copy (the artwork itself is very light grey) */}
          <Image
            src="/images/mountain-line-art.png"
            alt=""
            aria-hidden="true"
            width={1600}
            height={798}
            className="pointer-events-none absolute -right-24 top-1/2 w-[140%] max-w-none -translate-y-1/2 select-none opacity-80"
          />

          <Reveal delay={0.1} className="relative">
            <SectionHeading
              eyebrow="The Journey"
              title={
                <>
                  Every Trail
                  <br />
                  has a story.
                </>
              }
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">
              From ancient villages to towering peaks, each journey in Nepal is more than a trip. It&apos;s a deeper
              connection to nature, people and a way of life.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
