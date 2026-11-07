import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";

export type CardMeta = { icon: LucideIcon; label: string };

type ImageCardProps = {
  title: string;
  description?: string;
  image: string;
  alt: string;
  href: string;
  /** Icon + label pairs shown along the bottom edge */
  meta?: CardMeta[];
  /** `sizes` hint for next/image, matching the grid the card sits in */
  sizes: string;
  /** Tailwind aspect class; tall portrait by default */
  aspect?: string;
};

/**
 * Full-bleed photo card: image fills the card, a dark gradient rises from the bottom,
 * and the title, description and meta row sit on top in white. The whole card is clickable.
 */
export default function ImageCard({
  title,
  description,
  image,
  alt,
  href,
  meta = [],
  sizes,
  aspect = "aspect-[3/4]",
}: ImageCardProps) {
  return (
    <article
      className={`group relative isolate h-full ${aspect} overflow-hidden rounded-3xl bg-navy shadow-xl shadow-navy/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/30`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Darkens the lower half so the white text stays readable on any photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 via-45% to-transparent" />

      <BookmarkButton label={title} />

      <div className="flex h-full flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold leading-tight">
          {/* Stretched link: its ::after covers the card so the whole card is one click target */}
          <a href={href} className="after:absolute after:inset-0 after:z-10 after:rounded-3xl focus-visible:ring-0 focus-visible:after:ring-2 focus-visible:after:ring-accent">
            {title}
          </a>
        </h3>

        {description && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/80">{description}</p>}

        {meta.length > 0 && (
          <ul className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-white/90">
            {meta.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
