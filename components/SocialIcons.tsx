import { socialLinks, type SocialLink } from "@/data/site";

// lucide-react no longer ships brand logos, so these are small inline outline icons
// drawn on the same 24px grid with the same stroke so they match the rest of the UI.
const iconPaths: Record<SocialLink["name"], React.ReactNode> = {
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  X: (
    <>
      <path d="M4 4l11.7 16H20L8.3 4z" />
      <path d="M4 20l6.8-7.2M20 4l-6.8 7.2" />
    </>
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  WhatsApp: (
    <>
      <path d="M3 21l1.65-4.6A9 9 0 1 1 7.7 19.6z" />
      <path d="M9 9.2c.2 2.6 2.2 4.6 4.8 4.8l1-1.2-1.6-.9-.8.6a4 4 0 0 1-1.9-1.9l.6-.8-.9-1.6z" />
    </>
  ),
  YouTube: (
    <>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

export function SocialIcon({ name, className = "h-4 w-4" }: { name: SocialLink["name"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

type SocialIconsProps = {
  className?: string;
  /** Classes for each circular link */
  itemClassName?: string;
};

/** Vertical or horizontal list of circular social links (layout set via className). */
export default function SocialIcons({ className = "flex flex-col gap-3", itemClassName = "" }: SocialIconsProps) {
  return (
    <ul className={className}>
      {socialLinks.map(({ name, href }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Himalayan Discovery Trek on ${name}`}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-primary hover:text-white ${itemClassName}`}
          >
            <SocialIcon name={name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
