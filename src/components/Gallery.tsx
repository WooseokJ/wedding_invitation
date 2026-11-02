import image1 from "@/assets/paris1.jpeg";
import image2 from "@/assets/paris2.jpeg";
import image3 from "@/assets/paris3.jpeg";
import image4 from "@/assets/paris4.jpeg";
import image5 from "@/assets/paris5.jpeg";
import image6 from "@/assets/paris6.jpeg";
import image7 from "@/assets/paris7.jpeg";
import image8 from "@/assets/paris8.jpeg";

import wedding1 from "@/assets/wedding1-gallery.jpg";
import wedding2 from "@/assets/wedding2-gallery.jpg";
import wedding3 from "@/assets/wedding3-gallery.jpg";
import wedding4 from "@/assets/wedding4-gallery.jpg";
import wedding5 from "@/assets/wedding5-gallery.jpg";
import { ChevronDown, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { wedding } from "@/lib/wedding";

const CUTS_PER_STRIP = 4;
const INITIAL_VISIBLE_STRIPS = 2;

const galleryImages = [
  {
    src: wedding1,
    alt: "결혼식 사진",
    width: 1008,
    height: 752,
  },
  {
    src: wedding2,
    alt: "결혼식 사진",
    width: 1008,
    height: 752,
  },
  {
    src: wedding3,
    alt: "결혼식 사진",
    width: 1008,
    height: 752,
  },
  {
    src: wedding4,
    alt: "결혼식 사진",
    width: 1008,
    height: 752,
  },
  {
    src: wedding5,
    alt: "결혼식 사진",
    width: 1008,
    height: 752,
  },
  {
    src: wedding5,
    alt: "여덟손이 호숫가 버드나무 아래를 걷는 두 사람",
    width: 1008,
    height: 752,
  },
  {
    src: wedding5,
    alt: "손편지에 접어 넣은 은행잎과 반지",
    width: 1008,
    height: 752,
  },
  {
    src: wedding5,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
  {
    src: image1,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
  {
    src: image2,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
    {
    src: image3,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
    {
    src: image4,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
  {
    src: image7,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
  {
    src: image8,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
    {
    src: image5,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
  {
    src: image6,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  }

];

const photoStrips = Array.from(
  { length: Math.ceil(galleryImages.length / CUTS_PER_STRIP) },
  (_, stripIndex) =>
    Array.from({ length: CUTS_PER_STRIP }, (_, cutIndex) => {
      const imageIndex = stripIndex * CUTS_PER_STRIP + cutIndex;
      return galleryImages[imageIndex] ?? galleryImages[imageIndex % galleryImages.length];
    }),
);

export function Gallery() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex === null ? null : galleryImages[selectedIndex];
  const visibleStrips = showAllImages ? photoStrips : photoStrips.slice(0, INITIAL_VISIBLE_STRIPS);

  const showPreviousImage = () => {
    setSelectedIndex((index) =>
      index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setSelectedIndex((index) => (index === null ? null : (index + 1) % galleryImages.length));
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((index) =>
          index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length,
        );
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((index) => (index === null ? null : (index + 1) % galleryImages.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">함께한 순간</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink"></h2>
        </Reveal>

        <Reveal className="mx-auto mt-9 w-full max-w-[900px] sm:mt-14">
          <div
            id="wedding-gallery-more"
            role="group"
            className="grid grid-cols-2 items-start gap-4 sm:grid-cols-3 sm:gap-6"
            aria-label="함께한 순간 사진"
          >
            {visibleStrips.map((strip, stripIndex) => (
              <article key={`strip-${stripIndex}`} className="photo-strip">
                <div className="photo-strip-heading">
                  <span>{wedding.gallery.stripLabel}</span>
                  <span>NO. {String(stripIndex + 1).padStart(2, "0")}</span>
                </div>
                <div className="photo-strip-cuts">
                  {strip.map((image, cutIndex) => {
                    const index = galleryImages.indexOf(image);
                    return (
                      <button
                        key={`${image.src}-${cutIndex}`}
                        type="button"
                        aria-label={`사진 확대: ${image.alt}`}
                        onClick={() => setSelectedIndex(index)}
                        className="photo-strip-cut group"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span aria-hidden="true" className="photo-strip-zoom">
                          <ZoomIn className="size-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="photo-strip-footer" aria-hidden="true">
                  <span>{wedding.gallery.stripFooter}</span>
                  <span>♥</span>
                </div>
              </article>
            ))}
          </div>
          {!showAllImages && photoStrips.length > INITIAL_VISIBLE_STRIPS && (
            <div className="mt-7 text-center">
              <button
                type="button"
                aria-expanded={showAllImages}
                aria-controls="wedding-gallery-more"
                onClick={() => setShowAllImages(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brass/45 px-5 py-2 text-sm text-ink transition-colors hover:border-brass hover:bg-brass hover:text-paper"
              >
                더보기
                <ChevronDown aria-hidden="true" className="size-4" />
              </button>
            </div>
          )}
          <Dialog
            open={selectedIndex !== null}
            onOpenChange={(open) => {
              if (!open) setSelectedIndex(null);
            }}
          >
            <DialogContent className="w-[96vw] max-w-[1100px] border-0 bg-transparent p-0 text-white shadow-none sm:rounded-[8px]">
              <DialogTitle className="sr-only">{selectedImage?.alt} 확대 이미지</DialogTitle>
              {selectedImage && (
                <div className="relative flex flex-col items-center justify-center">
                  <button
                    type="button"
                    aria-label="이전 이미지"
                    onClick={showPreviousImage}
                    className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-soft transition-colors hover:bg-black/70 sm:left-4"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="mx-auto max-h-[80vh] max-w-full rounded-[8px] object-contain"
                  />
                  <p
                    aria-live="polite"
                    aria-atomic="true"
                    className="mt-3 text-xs tabular-nums tracking-[0.18em] text-white/90"
                  >
                    {selectedIndex + 1} / {galleryImages.length}
                  </p>
                  <button
                    type="button"
                    aria-label="다음 이미지"
                    onClick={showNextImage}
                    className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-soft transition-colors hover:bg-black/70 sm:right-4"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </Reveal>
      </div>
    </section>
  );
}
