import { experiences } from "@/lib/data";
import SectionTitle from "./SectionTitle";
import TimelineItem from "./TimelineItem";

/** Timeline verticale des expériences et formations. */
export default function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <SectionTitle id="experience-title">Expérience</SectionTitle>
      <ol data-reveal className="relative mt-6 ml-1.5 space-y-4 border-l border-dashed border-neutral-800">
        {experiences.map((item) => (
          <TimelineItem key={item.organization} item={item} />
        ))}
      </ol>
    </section>
  );
}
