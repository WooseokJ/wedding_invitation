import venueStone from "@/assets/venue-stone.jpg";
import heroLoneTree from "@/assets/hero-lone-tree.jpg";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { wedding } from "@/lib/wedding";

const venueImages = [
  { src: venueStone, alt: "예식장 위치 안내 지도" },
  { src: heroLoneTree, alt: "언덕 위 나무와 도시 풍경" },
];

export function Venue() {
  const { venue } = wedding;

  return (
    <section id="venue" className="border-t border-hair">
      <div className="mx-auto grid max-w-[900px] items-center gap-8 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-10 md:py-28">
        <Reveal>
          <Carousel opts={{ loop: true }} aria-label="장소 이미지">
            <CarouselContent className="ml-0">
              {venueImages.map((image) => (
                <CarouselItem key={image.src} className="pl-0">
                  <div className="aspect-[590/401] overflow-hidden rounded-[min(1vw,12px)] bg-paper-deep/30 shadow-soft">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 size-10 border-hair bg-paper/90 text-ink hover:bg-paper" />
            <CarouselNext className="right-3 size-10 border-hair bg-paper/90 text-ink hover:bg-paper" />
          </Carousel>
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
