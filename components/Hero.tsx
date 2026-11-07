import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    // Exactly one screen tall (svh avoids mobile browser-bar jumps; h-screen is the fallback)
    <section id="top" className="relative flex h-screen min-h-[560px] items-end overflow-hidden supports-[height:100svh]:h-[100svh]">
      {/* Slow zoom-out on load ("Ken Burns"); disabled for reduced motion in globals.css */}
      <div className="hero-zoom absolute inset-0">
        <Image
          src="/images/hero-ama-dablam.jpg"
          alt="Ama Dablam towering over the Khumbu valley on the Everest Base Camp trail"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </div>

      {/* Light top shade for the navbar, deep shade rising from the bottom behind the headline */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 via-45% to-transparent to-80%" />
      {/* Bottom fade into the white page */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-white" />

      {/* Bottom padding lifts the text clear of the white fade */}
      <div className="container-page relative pb-48 text-center sm:pb-52">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
          <p className="eyebrow text-accent drop-shadow-[0_1px_6px_rgba(11,42,91,0.9)]">Himalayan Discovery Trek</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] text-white drop-shadow-lg sm:text-7xl lg:text-8xl">
            Discover the <span className="text-accent">Himalayas</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Life-changing journeys through towering mountains, living culture and true adventure, guided by people
            who call these trails home.
          </p>
          <a href="#destinations" className="btn-primary mt-8">
            Explore Destinations
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#destinations"
        aria-label="Scroll to destinations"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-navy/60 transition hover:text-navy"
      >
        <ChevronDown className="h-7 w-7 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  );
}
