"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type TrekPhotoProps = {
  src: string;
  alt: string;
  /** Which side of the row the photo sits on; it slides in from that side */
  side: "left" | "right";
};

/**
 * Featured-trek photo with scroll-linked motion: the frame slides in from its side and grows
 * as it enters the viewport, while the image inside drifts more slowly (parallax).
 */
export default function TrekPhoto({ src, alt, side }: TrekPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the frame's top hits the bottom of the viewport, 1 when its bottom leaves the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const still = reduceMotion ? 0 : 1;

  const fromX = side === "left" ? -80 : 80;
  const x = useTransform(scrollYProgress, [0, 0.35], [fromX * still, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1 - 0.12 * still, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [reduceMotion ? 1 : 0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      style={{ x, scale, opacity }}
      className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-navy/25 lg:max-w-lg"
    >
      {/* Oversized so the parallax drift never exposes the frame's edges */}
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 512px, 90vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
}
