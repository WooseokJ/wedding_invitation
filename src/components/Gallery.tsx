import image1 from "@/assets/image10.jpg";
import image2 from "@/assets/image20.jpg";
import image3 from "@/assets/image30.jpg";



import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
];

export function Gallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateCurrentSlide();
    carouselApi.on("select", updateCurrentSlide);

    return () => {
      carouselApi.off("select", updateCurrentSlide);
    };
  }, [carouselApi]);

  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">함께한 순간</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-9 max-w-[720px] sm:mt-14">
          <Carousel
            opts={{ loop: true }}
            setApi={setCarouselApi}
            aria-label="함께한 순간 사진"
          >
            <CarouselContent className="ml-0">
              {galleryImages.map((image) => (
                <CarouselItem key={image.src} className="pl-0">
                  <div className="overflow-hidden rounded-[min(1vw,12px)] bg-paper-deep/30 shadow-soft">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      className="photo-parallax mx-auto h-auto max-h-[min(70svh,680px)] w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 size-10 border-hair bg-paper/90 text-ink hover:bg-paper" />
            <CarouselNext className="right-3 size-10 border-hair bg-paper/90 text-ink hover:bg-paper" />
          </Carousel>
        </Reveal>

        <Reveal delay={220} className="mt-4 text-center">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-xs tabular-nums tracking-[0.18em] text-ink-soft"
          >
            {currentSlide + 1} / {galleryImages.length}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
