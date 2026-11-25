"use client";

import { useEffect, useState } from "react";

type SectionNavProps = { links: { id: string; label: string }[] };

/** White bar that sticks to the top while scrolling; the section in view is underlined. */
export default function SectionNav({ links }: SectionNavProps) {
  const [active, setActive] = useState(links[0]?.id);

  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => Boolean(el));
    // A thin band across the upper middle of the viewport decides which section is "current"
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav aria-label="On this page" className="sticky top-0 z-30 border-b border-line bg-white">
      <ul className="container-page flex gap-6 overflow-x-auto whitespace-nowrap sm:gap-10 [scrollbar-width:none]">
        {links.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block border-b-2 py-4 text-sm font-semibold transition-colors ${
                  isActive ? "border-saffron-text text-navy" : "border-transparent text-muted hover:text-navy"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
