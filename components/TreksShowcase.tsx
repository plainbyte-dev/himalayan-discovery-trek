import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TrekPhoto from "@/components/TrekPhoto";

export type ShowcaseItem = {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Optional small line under the description, e.g. "3 treks · 10–18 days" */
  detail?: string;
  href: string;
  linkLabel: string;
  image: string;
  alt: string;
};

type TreksShowcaseProps = {
  id?: string;
  eyebrow: string;
  /** Optional H2 under the eyebrow */
  title?: string;
  items: ShowcaseItem[];
};

/** Numbered, alternating image/text rows on a glacier band, each with line-art mountains behind the text. */
export default function TreksShowcase({ id, eyebrow, title, items }: TreksShowcaseProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-glacier py-20 lg:py-28">
      {/* Soft fades into the white sections above and below */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-snow to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-snow to-transparent" />

      <div className="container-page relative">
        <Reveal>
          {title ? <SectionHeading eyebrow={eyebrow} title={title} /> : <p className="eyebrow text-muted">{eyebrow}</p>}
        </Reveal>

        <ol className="mt-10 space-y-20 lg:space-y-28">
          {items.map((trek, i) => {
            const imageFirst = i % 2 === 1;
            const number = String(i + 1).padStart(2, "0");

            return (
              <li key={trek.key} className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Line-art range behind the text, tucked partly under the photo */}
                <Image
                  src="/images/mountain-line-art-white.png"
                  alt=""
                  aria-hidden="true"
                  width={1600}
                  height={798}
                  className={`pointer-events-none absolute top-1/2 hidden w-[75%] max-w-none -translate-y-1/2 select-none opacity-60 lg:block ${
                    imageFirst ? "right-[-8%]" : "left-[-8%]"
                  }`}
                />

                {/* Text */}
                <Reveal className={`relative ${imageFirst ? "lg:order-2" : ""}`}>
                  <div className="relative">
                    <div className="flex items-end gap-3">
                      <span className="select-none font-display text-7xl leading-none text-white sm:text-8xl" aria-hidden="true">
                        {number}
                      </span>
                      <p className="eyebrow mb-2 text-[10px] text-saffron-text sm:text-xs">{trek.eyebrow}</p>
                    </div>
                    <h3 className="mt-3 max-w-sm font-display text-4xl leading-tight text-ink sm:text-5xl">
                      {trek.title}
                    </h3>
                    <p className="mt-5 max-w-md leading-relaxed text-slate">{trek.description}</p>
                    {trek.detail && <p className="mt-3 text-sm font-medium text-navy">{trek.detail}</p>}
                    <a href={trek.href} className="link-arrow mt-6">
                      {trek.linkLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Hand-drawn trekkers beside the first row */}
                  {i === 0 && (
                    <Image
                      src="/images/trekkers-line-art.png"
                      alt=""
                      aria-hidden="true"
                      width={1000}
                      height={395}
                      className="pointer-events-none absolute -right-24 top-4 hidden w-72 select-none opacity-70 xl:block"
                    />
                  )}
                </Reveal>

                {/* Photo: slides in from its own side with a parallax drift */}
                <div
                  className={`flex ${imageFirst ? "lg:order-1 lg:justify-start" : "lg:justify-end"} justify-center`}
                >
                  <TrekPhoto src={trek.image} alt={trek.alt} side={imageFirst ? "left" : "right"} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
