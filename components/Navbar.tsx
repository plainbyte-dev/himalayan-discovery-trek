"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import { navLinks } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // While the drawer is open: lock page scroll, focus the close button, close on Escape
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30">
        <nav aria-label="Main" className="container-page flex items-center justify-between py-5">
          {/* White card keeps the blue logo legible over any photo */}
          <div className="rounded-xl bg-white/90 px-2 py-1 shadow-sm backdrop-blur">
            <Logo className="h-10 w-auto sm:h-12" priority />
          </div>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded text-sm font-medium text-white/90 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-navy md:inline-block"
          >
            Enquire
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full p-2 text-white md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </nav>
      </header>

      {/* Fixed vertical social rail on the right edge (desktop) */}
      <SocialIcons className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex" />

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white p-6 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="self-end rounded-full p-2 text-ink"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>

              <ul className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-lg font-medium text-ink hover:bg-mist hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-6 justify-center">
                Enquire
              </a>

              <SocialIcons className="mt-auto flex gap-3" itemClassName="ring-mist" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
