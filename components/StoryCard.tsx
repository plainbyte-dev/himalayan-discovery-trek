import { BookOpen } from "lucide-react";
import ImageCard from "@/components/ImageCard";
import type { Story } from "@/data/stories";

export default function StoryCard({ story }: { story: Story }) {
  const { title, excerpt, readTime, image, alt, href } = story;

  return (
    <ImageCard
      title={title}
      description={excerpt}
      image={image}
      alt={alt}
      href={href}
      aspect="aspect-[4/5]"
      sizes="(min-width: 768px) 33vw, 100vw"
      meta={[{ icon: BookOpen, label: readTime }]}
    />
  );
}
