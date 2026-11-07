import Image from "next/image";
import Reveal from "@/components/Reveal";
import { affiliations } from "@/data/site";

/** Row of official bodies the company is registered with, shown just above the footer. */
export default function Affiliations() {
  return (
    <section aria-labelledby="affiliations-heading" className="bg-gradient-to-b from-white to-[#DCEBF3] py-16 lg:py-20">
      <Reveal className="container-page text-center">
        <h2 id="affiliations-heading" className="text-2xl font-medium text-primary sm:text-3xl">
          We are affiliated to
        </h2>

        <ul className="mt-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-16">
          {affiliations.map(({ name, short, logo }) => (
            <li key={name} className="flex w-24 flex-col items-center sm:w-28" title={name}>
              {logo ? (
                <Image src={logo} alt={name} width={112} height={112} className="h-20 w-full object-contain sm:h-24" />
              ) : (
                // Placeholder until the official logo file is added in data/site.ts
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 bg-white text-sm font-bold text-primary shadow-sm sm:h-24 sm:w-24">
                  {short}
                </span>
              )}
              <span className="mt-3 text-[11px] leading-tight text-gray-600">{name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
