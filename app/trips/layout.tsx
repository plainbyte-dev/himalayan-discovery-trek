import SiteShell from "@/components/SiteShell";

export default function TripsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteShell>{children}</SiteShell>
      {/* Keeps the footer clear of the fixed mobile booking bar */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  );
}
