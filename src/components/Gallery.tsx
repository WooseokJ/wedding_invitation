import galleryLake from "@/assets/gallery-lake.jpg";
import galleryLeaf from "@/assets/gallery-leaf.jpg";
import heroGinkgo from "@/assets/hero-ginkgo.jpg";
import { Images } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const galleryImages = [
  {
    src: galleryLake,
    alt: "여덟손이 호숫가 버드나무 아래를 걷는 두 사람",
    width: 912,
    height: 1200,
  },
  {
    src: galleryLeaf,
    alt: "손편지에 접어 넣은 은행잎과 반지",
    width: 1008,
    height: 752,
  },
  {
    src: heroGinkgo,
    alt: "가로수를 이루는 은행나무 길",
    width: 1600,
    height: 1120,
  },
];

export function Gallery() {
  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">함께한 순간</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            여덟손이 호수에서
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-9 max-w-[720px] sm:mt-14">
          <Carousel opts={{ loop: true }} aria-label="함께한 순간 사진">
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
                      className="mx-auto h-auto max-h-[min(70svh,680px)] w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 size-10 border-hair bg-paper/90 text-ink hover:bg-paper" />
            <CarouselNext className="right-3 size-10 border-hair bg-paper/90 text-ink hover:bg-paper" />
          </Carousel>
        </Reveal>

        <div className="mt-5 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-brass/45 px-4 py-2.5 text-sm text-ink transition-colors hover:border-brass hover:bg-brass hover:text-paper"
              >
                <Images aria-hidden="true" className="size-4" />
                모든 사진 보기
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto border-hair bg-paper p-4 sm:p-7">
              <div className="pr-8">
                <DialogTitle className="font-display text-xl text-ink">
                  함께한 순간
                </DialogTitle>
                <DialogDescription className="sr-only">
                  갤러리 사진 전체
                </DialogDescription>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {galleryImages.map((image) => (
                  <figure
                    key={image.src}
                    className="aspect-[4/3] overflow-hidden rounded-[8px] bg-paper-deep/40"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-full w-full object-contain"
                    />
                  </figure>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
