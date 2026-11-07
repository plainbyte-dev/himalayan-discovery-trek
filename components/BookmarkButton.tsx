"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

/** Frosted round toggle shown in the top-right corner of an ImageCard. */
export default function BookmarkButton({ label }: { label: string }) {
  // TODO: persist saved items once there is a wishlist/account feature
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Save"} ${label}`}
      onClick={() => setSaved((s) => !s)}
      className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/40"
    >
      <Bookmark className={`h-5 w-5 transition ${saved ? "fill-accent text-accent" : ""}`} aria-hidden="true" />
    </button>
  );
}
