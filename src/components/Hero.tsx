import { useEffect, useState } from "react";
import heroLoneTree from "@/assets/hero-lone-tree-sunny.jpg";
import { daysLeft } from "@/lib/ics";
import { wedding } from "@/lib/wedding";

function DayCounter() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysLeft());
  }, []);

  if (days === null) return null;

  return (
    <p className="mt-8 text-[11px] tabular-nums tracking-[0.3em] text-brass-deep">
      D-{days}
    </p>
  );
}

export function Hero() {
  const { date, venue } = wedding;

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroLoneTree}
          alt="맑은 날 올림픽공원 언덕, 그 위에 홀로 서 있는 나무"
          width={1600}
          height={1120}
          className="drift size-full object-cover"
        />
      </div>

      {/* blends the photograph into the paper of the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-paper" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[900px] flex-col px-6 pt-[16vh] pb-28">
        <div className="mx-auto w-full max-w-[19ch] text-center sm:mx-0 sm:ml-auto sm:mr-[7%] sm:max-w-[24ch]">
          <p className="rise eyebrow [animation-delay:80ms]">초대합니다</p>

          <h1 className="rise mt-6 font-display text-[2.75rem] leading-[1.08] font-extrabold tracking-tight text-balance text-ink sm:text-6xl [animation-delay:180ms]">
            {wedding.groom.first}
            <span className="mx-2 font-normal text-brass">·</span>
            {wedding.bride.first}
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

          <DayCounter />
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
