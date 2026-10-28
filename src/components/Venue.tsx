import venueStone from "@/assets/venue-stone.jpg";
import heroLoneTree from "@/assets/hero-lone-tree.png";
import tmapIcon from "@/assets/tmap-icon.svg";
// import parking2 from "@/assets/parking2.png"
import {
  BusFront,
  Banknote,
  ChevronLeft,
  ChevronRight,
  CircleParking,
  ExternalLink,
  MessageCircle,
  TrainFront,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { wedding } from "@/lib/wedding";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const venueImages = [
  {
    src: venueStone,
    alt: "예식장 위치 안내 지도",
    caption: wedding.venue.imageCaptions.map,
    parallax: false,
  },
  {
    src: heroLoneTree,
    alt: "언덕 위 나무와 도시 풍경",
    caption: wedding.venue.imageCaptions.surroundings,
    parallax: true,
  },
  /*
  {
    src: parking2,
    alt: "주차장 안내",
    caption: wedding.venue.imageCaptions.parking,
    parallax: false,
  },
  */
];

const transitIcons = {
  지하철: TrainFront,
  시외버스: BusFront,
  주차: CircleParking,
  ATM: Banknote,
};

const subwayLineStyles = {
  "2": "bg-[var(--subway-line-2)]",
  "8": "bg-[var(--subway-line-8)]",
};

export function Venue() {
  const { venue } = wedding;
  const [selectedVenueImageIndex, setSelectedVenueImageIndex] = useState<number | null>(null);
  const selectedVenueImage =
    selectedVenueImageIndex === null ? null : venueImages[selectedVenueImageIndex];
  const searchQuery = `${venue.park} ${venue.hall} ${venue.address}`;
  const searchQuery2 = `${venue.park} ${venue.hall}`;
  const mapLinks = [
    { label: "네이버지도", href: venue.mapUrl, brand: "naver" },
    {
      label: "카카오맵",
      href: `https://map.kakao.com/link/search/${encodeURIComponent(searchQuery)}`,
      brand: "kakao",
    },
    {
      label: "티맵",
      href: `tmap://search?name=${encodeURIComponent(searchQuery2)}`,
      brand: "tmap",
    },
  ];

  const showPreviousVenueImage = () => {
    setSelectedVenueImageIndex((index) =>
      index === null ? null : (index - 1 + venueImages.length) % venueImages.length,
    );
  };

  const showNextVenueImage = () => {
    setSelectedVenueImageIndex((index) =>
      index === null ? null : (index + 1) % venueImages.length,
    );
  };

  useEffect(() => {
    if (selectedVenueImageIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedVenueImageIndex((index) =>
          index === null ? null : (index - 1 + venueImages.length) % venueImages.length,
        );
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedVenueImageIndex((index) =>
          index === null ? null : (index + 1) % venueImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVenueImageIndex]);

  return (
    <section id="venue" className="border-t border-hair">
      <div className="mx-auto grid max-w-[900px] items-center gap-8 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-10 md:py-28">
        <Reveal>
          <Carousel opts={{ loop: true }} aria-label="장소 이미지">
            <CarouselContent className="ml-0">
              {venueImages.map((image, index) => (
                <CarouselItem key={image.src} className="pl-0">
                  <div className="aspect-[590/401] overflow-hidden rounded-[min(1vw,12px)] bg-paper-deep/30 shadow-soft">
                    <button
                      type="button"
                      aria-label={`이미지 확대: ${image.caption}`}
                      onClick={() => setSelectedVenueImageIndex(index)}
                      className="group relative block h-full w-full cursor-zoom-in"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className={`${image.parallax ? "photo-parallax" : ""} h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
                      />
                    </button>
                  </div>
                  <p className="mt-3 text-center font-display text-sm text-ink-soft">
                    {image.caption}
                  </p>
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
          <p className="mt-4 text-sm leading-relaxed text-pretty text-ink-soft">{venue.address}</p>
          {venue.note && (
            <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-soft">{venue.note}</p>
          )}

          <dl className="mt-8 space-y-3 border-t border-hair pt-6 text-sm">
            {venue.transit.map((row) => {
              const TransitIcon = transitIcons[row.kind];

              return (
                <div key={row.kind} className="flex gap-4">
                  <dt className="flex w-[5.5rem] shrink-0 items-center gap-1.5 text-xs tracking-[0.18em] text-brass-deep">
                    <TransitIcon aria-hidden="true" className="size-4 shrink-0" />
                    {row.kind}
                  </dt>
                  <dd className="text-pretty text-ink">
                    {row.kind === "지하철" ? (
                      <div className="space-y-2">
                        {row.detail.split("\n").map((line, lineIndex) => {
                          const lineMatch = line.trim().match(/^([28])호선\s*(.*)$/);
                          if (!lineMatch) {
                            return <p key={`${line}-${lineIndex}`}>{line.trim()}</p>;
                          }

                          const lineNumber = lineMatch[1] as keyof typeof subwayLineStyles;

                          return (
                            <p key={`${line}-${lineIndex}`} className="flex items-center gap-2">
                              <span
                                role="img"
                                aria-label={`${lineNumber}호선`}
                                className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ${subwayLineStyles[lineNumber]}`}
                              >
                                {lineNumber}
                              </span>
                              <span>{lineMatch[2]}</span>
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="whitespace-pre-line">
                        {row.kind === "주차"
                          ? row.detail.split(/(안내 받아)/g).map((part, index) =>
                              part === "안내 받아" ? (
                                <u key={index} className="underline underline-offset-2">
                                  {part}
                                </u>
                              ) : (
                                part
                              ),
                            )
                          : row.detail}
                      </span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {mapLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full border border-brass/45 px-2 py-2.5 text-xs text-ink transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-paper sm:gap-2 sm:px-4 sm:text-sm"
              >
                {link.brand === "naver" ? (
                  <span
                    aria-hidden="true"
                    className="grid size-[18px] shrink-0 place-items-center rounded-[4px] bg-[var(--naver-green)] text-[11px] font-black leading-none text-white"
                  >
                    N
                  </span>
                ) : link.brand === "kakao" ? (
                  <span
                    className="relative grid size-[18px] shrink-0 place-items-center"
                    aria-hidden="true"
                  >
                    <MessageCircle className="absolute size-[18px] fill-[var(--kakao-yellow)] text-[var(--kakao-yellow)]" />
                    <span className="relative z-10 text-[9px] font-bold leading-none text-[var(--kakao-ink)]">
                      K
                    </span>
                  </span>
                ) : (
                  <img
                    src={tmapIcon}
                    alt=""
                    aria-hidden="true"
                    className="size-[18px] shrink-0 rounded-[4px]"
                  />
                )}
                {link.label}
                <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <Dialog
        open={selectedVenueImageIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedVenueImageIndex(null);
        }}
      >
        <DialogContent className="w-[96vw] max-w-[1100px] border-0 bg-transparent p-0 text-white shadow-none sm:rounded-[8px]">
          <DialogTitle className="sr-only">{selectedVenueImage?.caption} 확대 이미지</DialogTitle>
          {selectedVenueImage && (
            <div className="relative flex items-center justify-center">
              <button
                type="button"
                aria-label="이전 장소 이미지"
                onClick={showPreviousVenueImage}
                className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-soft transition-colors hover:bg-black/70 sm:left-4"
              >
                <ChevronLeft className="size-6" />
              </button>
              <div className="text-center">
                <img
                  src={selectedVenueImage.src}
                  alt={selectedVenueImage.alt}
                  className="mx-auto max-h-[80vh] max-w-full rounded-[8px] object-contain"
                />
                <p className="mt-3 text-sm text-white">{selectedVenueImage.caption}</p>
              </div>
              <button
                type="button"
                aria-label="다음 장소 이미지"
                onClick={showNextVenueImage}
                className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-soft transition-colors hover:bg-black/70 sm:right-4"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
