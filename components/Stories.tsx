import Reveal from "@/components/Reveal";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";

export default function Stories() {
  return (
    <section id="stories" className="py-20 lg:py-28">
      <div className="container-page">
        {/* Heading kept for screen readers only */}
        <h2 className="sr-only">Travel Stories</h2>

        <ul className="grid gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <li key={story.slug}>
              <Reveal delay={i * 0.1} className="h-full">
                <StoryCard story={story} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
