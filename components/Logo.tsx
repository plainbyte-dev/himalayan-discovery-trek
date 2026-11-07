import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/** Brand mark (mountain icon + "HIMALAYAN Discovery Trek") linking back to the top. */
export default function Logo({ className = "h-12 w-auto", priority = false }: LogoProps) {
  return (
    <a href="#top" className="inline-block rounded-lg" aria-label="Himalayan Discovery Trek, back to top">
      <Image
        src="/images/logo.png"
        alt="Himalayan Discovery Trek"
        width={716}
        height={487}
        priority={priority}
        className={className}
      />
    </a>
  );
}
