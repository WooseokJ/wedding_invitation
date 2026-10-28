import { Utensils } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function BuffetRecommendations() {
  const { buffet } = wedding;

  if (buffet.recommendations.length === 0) return null;

  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-24">
        <Reveal className="text-center">
          <p className="eyebrow">{buffet.eyebrow}</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            {buffet.title}
          </h2>
        </Reveal>

        <div className="mx-auto mt-9 grid max-w-[700px] gap-3 sm:mt-12 sm:grid-cols-2">
          {buffet.recommendations.map((dish, index) => (
            <Reveal key={dish} delay={index * 80}>
              <article className="flex h-full gap-4 rounded-[min(1vw,12px)] bg-paper p-5 ring-1 ring-hair sm:p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper-deep text-brass-deep">
                  <Utensils aria-hidden="true" className="size-4" />
                </span>
                <h3 className="self-center font-display text-lg font-bold text-ink">{dish}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
