type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  /** "light" for white backgrounds, "dark" for text over photos */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/** Small uppercase eyebrow label + hand-drawn display heading. */
export default function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <p className={`eyebrow ${isDark ? "text-accent" : "text-gray-500"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
