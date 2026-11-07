import Image from "next/image";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcons";
import { contactDetails, socialLinks, tripadvisor } from "@/data/site";

// Social profiles shown in the footer's "Follow Us" column
const footerSocials = socialLinks.filter(({ name }) => name !== "YouTube");

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Continues the affiliations band, then reaches the sky colour well before the illustration starts, so they blend seamlessly */}
      <div className="bg-gradient-to-b from-[#DCEBF3] to-[#CFEBFA] to-60% pb-px">
        <Reveal className="container-page relative z-10 grid gap-12 pt-16 text-center lg:grid-cols-[1fr_1.4fr_1fr] lg:items-start lg:text-left">
          {/* Left: logo */}
          <div className="flex justify-center lg:justify-start lg:pt-8">
            <Logo className="h-28 w-auto" />
          </div>

          {/* Centre: tagline */}
          <div className="text-center font-script lg:pt-24">
            <p className="text-2xl uppercase tracking-wide text-accent-dark sm:text-3xl">Himalayan Discovery Trek</p>
            <p className="mt-1 text-4xl text-ink sm:text-5xl">Beyond the Trails,</p>
            <p className="mt-3 text-xl text-accent-dark sm:text-2xl">Into the Extraordinary.</p>
            <p className="mt-1 text-2xl text-ink sm:text-3xl">Discover your next adventure in the Himalayas.</p>
          </div>
  
          {/* Right: Tripadvisor + follow + contact */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-ink">Recommended On</p>
              <a
                href={tripadvisor.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-left shadow-lg shadow-navy/10 backdrop-blur transition hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#34E0A1] text-xs font-bold text-ink" aria-hidden="true">
                  TA
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Tripadvisor</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#00AA6C]">
                    {tripadvisor.rating}
                    <span className="flex gap-0.5" aria-label={`Rated ${tripadvisor.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className="h-3 w-3 rounded-full bg-[#00AA6C]" />
                      ))}
                    </span>
                  </span>
                  <span className="block text-[10px] text-gray-500">{tripadvisor.reviewsLabel}</span>
                </span>
              </a>
            </div>
  
            <div className="mt-8 grid grid-cols-[auto_auto] gap-x-10 text-left">
              <div>
                <p className="text-sm font-medium text-ink">Follow Us</p>
                <ul className="mt-3 space-y-3">
                  {footerSocials.map(({ name, href }) => (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Himalayan Discovery Trek on ${name}`}
                        className="flex h-6 w-6 items-center justify-center rounded text-ink transition-colors hover:text-primary"
                      >
                        <SocialIcon name={name} className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-ink">Get in Touch</p>
                <ul className="mt-3 space-y-3 text-xs text-ink">
                  {contactDetails.map(({ label, href }, i) => (
                    <li key={i} className="flex h-6 items-center">
                      {href ? (
                        <a href={href} className="rounded hover:text-primary">
                          {label}
                        </a>
                      ) : (
                        label
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Mountain illustration; overlaps the content above on large screens */}
      <div className="relative -mt-8 lg:-mt-[10vw]">
        <Image
          src="/images/footer-mountains.jpg"
          alt=""
          aria-hidden="true"
          width={2400}
          height={775}
          sizes="100vw"
          className="h-48 w-full object-cover object-bottom sm:h-auto"
        />
        {/* Blend the illustration's sky into the footer background */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#CFEBFA] to-transparent" />
        <p className="absolute inset-x-0 bottom-3 text-center text-xs text-navy">
          © {new Date().getFullYear()} Himalayan Discovery Trek. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
