import venueStone from "@/assets/venue-stone.jpg";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function Venue() {
  const { venue } = wedding;

  return (
    <section id="venue" className="border-t border-hair">
      <div className="mx-auto grid max-w-[900px] items-center gap-10 px-6 py-28 md:grid-cols-2">
        <Reveal>
          <img
            src={venueStone}
            alt="올림픽공원 올림픽홀 앞 백석 광장과 은행나무 길"
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square w-full rounded-[min(1vw,12px)] object-cover shadow-soft"
          />
        </Reveal>

        <Reveal delay={140}>
          <p className="eyebrow">장소</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-balance text-ink">
            {venue.park} {venue.hall}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-pretty text-ink-soft">
            {venue.address}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-soft">
            {venue.note}
          </p>

          <dl className="mt-8 space-y-3 border-t border-hair pt-6 text-sm">
            {venue.transit.map((row) => (
              <div key={row.kind} className="flex gap-4">
                <dt className="w-12 shrink-0 text-xs tracking-[0.18em] text-brass-deep">
                  {row.kind}
                </dt>
                <dd className="text-pretty text-ink">{row.detail}</dd>
              </div>
            ))}
          </dl>

          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-brass/45 px-5 py-2.5 text-sm text-ink transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-paper"
          >
            지도 열기
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
