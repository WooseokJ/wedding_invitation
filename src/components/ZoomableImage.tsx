import type { ImgHTMLAttributes } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ZoomableImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ZoomableImage({
  alt,
  className,
  src,
  ...imageProps
}: ZoomableImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`이미지 확대: ${alt}`}
          className="group relative block h-full w-full cursor-zoom-in"
        >
          <img
            {...imageProps}
            src={src}
            alt={alt}
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.02]",
              className,
            )}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-hair bg-paper/90 text-ink shadow-soft"
          >
            <ZoomIn className="size-4" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[96vw] max-w-[1100px] border-0 bg-transparent p-0 text-white shadow-none sm:rounded-[8px]">
        <DialogTitle className="sr-only">{alt} 확대 이미지</DialogTitle>
        <img
          src={src}
          alt={alt}
          className="mx-auto max-h-[85vh] max-w-full rounded-[8px] object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}