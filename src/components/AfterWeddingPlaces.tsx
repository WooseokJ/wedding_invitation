import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function AfterWeddingPlaces() {
  const { afterPartyPlaces } = wedding;

  return (
    <section id="after-wedding" className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-24">
        <Reveal className="text-center">
          <p className="eyebrow">{afterPartyPlaces.eyebrow}</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink sm:text-3xl">
            {afterPartyPlaces.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {afterPartyPlaces.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-9 grid max-w-[720px] gap-3 sm:mt-12 sm:grid-cols-3">
          {afterPartyPlaces.places.map((place, index) => (
            <Reveal key={place.name} delay={index * 70}>
              <a
                href={place.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group block h-full rounded-xl border border-hair bg-paper/65 p-4 transition-colors hover:bg-paper hover:shadow-soft sm:p-5"
              >
                <span className="text-xs tracking-wide text-brass-deep">{place.category}</span>
                <span className="mt-1 flex items-center justify-between gap-3 font-display text-base font-bold text-ink">
                  {place.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-2 block text-xs leading-relaxed text-ink-soft">
                  {place.description}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brass-deep">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  카카오 지도에서 보기
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
