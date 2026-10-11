import heroLoneTree from "@/assets/image10.jpg";
import { wedding } from "@/lib/wedding";

export function Hero() {
  const { date, venue } = wedding;

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-image-intro absolute inset-0 overflow-hidden">
        <img
          src={heroLoneTree}
          alt="맑은 날 올림픽공원 언덕, 그 위에 홀로 서 있는 나무"
          className="photo-parallax h-full w-full object-cover object-[center_22%] sm:object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/75 to-transparent sm:bg-gradient-to-l sm:from-paper/90 sm:via-paper/55 sm:to-transparent"
      />

      {/* blends the photograph into the paper of the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-paper" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[900px] flex-col px-6 pt-[16vh] pb-28">
        <div className="mx-auto w-full max-w-full text-center sm:mx-0 sm:ml-auto sm:mr-[7%] sm:max-w-[24ch]">
          <p className="rise eyebrow [animation-delay:80ms]"></p>

          <h1 className="rise mt-6 whitespace-nowrap font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-6xl [animation-delay:180ms]">
            초대합니다
          </h1>

          <span className="draw-rule mx-auto mt-8 block h-px w-16 bg-brass/60 [animation-delay:520ms]" />

          <p className="rise mt-8 font-display text-lg text-pretty text-ink [animation-delay:320ms]">
            {date.hangul}
          </p>
          <p className="rise mt-3 text-sm tabular-nums text-ink-soft [animation-delay:400ms]">
            {date.numeric} ({date.weekday}) {date.hourLabel}
          </p>
          <p className="rise mt-2 text-sm text-ink-soft [animation-delay:460ms]">
            서울 잠실 · {venue.park} {venue.hall}
          </p>
        </div>

        <div className="mt-auto flex justify-center">
          <span className="relative block h-16 w-px overflow-hidden bg-hair">
            <span className="thread absolute inset-x-0 top-0 h-6 bg-brass" />
          </span>
        </div>
      </div>
    </section>
  );
}
