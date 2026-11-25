import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  /**
   * "center": homepage hero style (centred text, gradient rising from the bottom).
   * "banner": photo-banner style (left-aligned, navy gradient from the left).
   */
  variant?: "center" | "banner";
  /** Height classes, e.g. "h-[70vh] min-h-[520px]" */
  heightClass?: string;
  /** White breadcrumb shown above the eyebrow */
  crumbs?: Crumb[];
  /** Anchor the down-chevron scroll cue points at */
  scrollTo?: string;
  /** Meta row, buttons, badges */
  children?: React.ReactNode;
};

/** Full-bleed photo hero shared by the destination, region and trip pages. */
export default function PageHero({
  image,
  alt,
  eyebrow,
  title,
  intro,
  variant = "banner",
  heightClass = "h-[70vh] min-h-[520px]",
  crumbs,
  scrollTo,
  children,
}: PageHeroProps) {
  const centered = variant === "center";

  return (
    <section id="top" className={`relative flex items-end overflow-hidden ${heightClass}`}>
      <div className="hero-zoom absolute inset-0">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover object-[center_35%]" />
      </div>

      {/* Navbar shade, main navy gradient (85% → transparent), fade into the snow page */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/50 to-transparent" />
      {centered ? (
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/55 via-45% to-transparent to-80%" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-transparent" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-snow" />

      <div className={`container-page relative pb-32 sm:pb-36 ${centered ? "text-center" : ""}`}>
        <Reveal className={centered ? "mx-auto flex max-w-3xl flex-col items-center" : "max-w-3xl"}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-white/80">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                    {c.href ? (
                      <Link href={c.href} className="rounded hover:text-saffron">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <p className="eyebrow text-saffron drop-shadow-[0_1px_6px_rgba(14,42,71,0.9)]">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[56px] leading-none text-white drop-shadow-lg sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{intro}</p>}
          {children}
        </Reveal>
      </div>

      {scrollTo && (
        <a
          href={scrollTo}
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-navy/60 transition hover:text-navy"
        >
          <ChevronDown className="h-7 w-7 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
        </a>
      )}
    </section>
  );
}

/** Meta row with saffron icons, used inside heroes. */
export function HeroMeta({ items }: { items: { icon: React.ElementType; label: string }[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-saffron" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}
