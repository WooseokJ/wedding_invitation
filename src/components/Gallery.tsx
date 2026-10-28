import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import { ChevronDown, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const INITIAL_VISIBLE_IMAGES = 3;

const galleryImages = [
  {
    src: image1,
    alt: "여덟손이 호숫가 버드나무 아래를 걷는 두 사람",
    width: 1008,
    height: 752,
  },
  {
    src: image2,
    alt: "손편지에 접어 넣은 은행잎과 반지",
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
    src: image5,
    alt: "가로수를 이루는 은행나무 길",
    width: 1008,
    height: 752,
  },
];

export function Gallery() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex === null ? null : galleryImages[selectedIndex];
  const visibleImages = showAllImages
    ? galleryImages
    : galleryImages.slice(0, INITIAL_VISIBLE_IMAGES);

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
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
            aria-label="함께한 순간 사진"
          >
            {visibleImages.map((image) => {
              const index = galleryImages.indexOf(image);

              return (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`사진 확대: ${image.alt}`}
                  onClick={() => setSelectedIndex(index)}
                  className="group relative aspect-[1008/752] cursor-zoom-in overflow-hidden rounded-[min(1vw,12px)] bg-paper-deep/30 shadow-soft focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-2 grid size-8 place-items-center rounded-full border border-hair bg-paper/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <ZoomIn className="size-4" />
                  </span>
                </button>
              );
            })}
          </div>
          {!showAllImages && galleryImages.length > INITIAL_VISIBLE_IMAGES && (
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
                <div className="relative flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="이전 이미지"
                    onClick={showPreviousImage}
                    className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-soft transition-colors hover:bg-black/70 sm:left-4"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="mx-auto max-h-[85vh] max-w-full rounded-[8px] object-contain"
                  />
                  <button
                    type="button"
                    aria-label="다음 이미지"
                    onClick={showNextImage}
                    className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-soft transition-colors hover:bg-black/70 sm:right-4"
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
