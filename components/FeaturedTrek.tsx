"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Gauge, Mountain } from "lucide-react";
import Reveal from "@/components/Reveal";

export type FeaturedTrekProps = {
  eyebrow?: string;
  title: string;
  days: number;
  difficulty: string;
  /** Pre-formatted, e.g. "5,545 m" */
  maxAltitude: string;
  href: string;
  image: string;
  alt: string;
};

/** Full-bleed photo banner for one trip: navy gradient from the left, meta row, white pill button. */
export default function FeaturedTrek({
  eyebrow = "Featured Trek",
  title,
  days,
  difficulty,
  maxAltitude,
  href,
  image,
  alt,
}: FeaturedTrekProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax: the background drifts slower than the page while the section is on screen
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[480px] overflow-hidden">
      {/* Oversized wrapper gives the parallax room to move without exposing edges */}
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[15%]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/50 to-transparent" />

      <div className="container-page relative flex h-full flex-col justify-center">
        <Reveal>
          <p className="eyebrow text-saffron">{eyebrow}</p>
          <h2 className="mt-3 font-display text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
            {title}
          </h2>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-saffron" aria-hidden="true" /> {days} Days
            </li>
            <li className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-saffron" aria-hidden="true" /> {difficulty}
            </li>
            <li className="flex items-center gap-2">
              <Mountain className="h-4 w-4 text-saffron" aria-hidden="true" /> Max {maxAltitude}
            </li>
          </ul>

          <a href={href} className="btn-secondary mt-8">
            View Trek
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
