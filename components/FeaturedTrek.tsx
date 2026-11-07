"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Gauge, Mountain } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function FeaturedTrek() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax: the background drifts slower than the page while the section is on screen
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section ref={sectionRef} id="everest" className="relative h-[70vh] min-h-[480px] overflow-hidden">
      {/* Oversized wrapper gives the parallax room to move without exposing edges */}
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[15%]">
        <Image
          src="/images/featured-everest-range.jpg"
          alt="Snow-plastered ridges of Ama Dablam breaking through the clouds above the Everest trail"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />

      <div className="container-page relative flex h-full flex-col justify-center">
        <Reveal>
          <p className="eyebrow text-accent">Featured Trek</p>
          <h2 className="mt-3 font-display text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
            Everest Base Camp
          </h2>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" /> 14 Days
            </li>
            <li className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-accent" aria-hidden="true" /> Moderate to Challenging
            </li>
            <li className="flex items-center gap-2">
              <Mountain className="h-4 w-4 text-accent" aria-hidden="true" /> Max 5,364 m
            </li>
          </ul>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:bg-accent"
          >
            View Trek
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
