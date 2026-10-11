import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { ko } from "date-fns/locale";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { timeUntilWedding } from "@/lib/ics";
import { wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";

const ceremonyDate = new Date(
  wedding.date.year,
  wedding.date.month - 1,
  wedding.date.day,
);

function WeddingDayButton(props: ComponentProps<typeof CalendarDayButton>) {
  if (!props.modifiers["valentines"]) {
    return <CalendarDayButton {...props} />;
  }

  return (
    <CalendarDayButton
      {...props}
      className={cn(
        props.className,
        "data-[selected-single=true]:bg-transparent data-[selected-single=true]:text-ink",
      )}
    >
      <span className="relative grid size-full place-items-center">
        <Heart
          aria-hidden="true"
          className="absolute !size-8 fill-[var(--sakura)] text-[var(--sakura)]"
        />
        <span className="relative z-10 text-xs font-semibold text-ink">
          {props.day.date.getDate()}
        </span>
      </span>
    </CalendarDayButton>
  );
}

function DayCounter() {
  const [countdown, setCountdown] = useState<ReturnType<
    typeof timeUntilWedding
  > | null>(null);

  useEffect(() => {
    const updateCountdown = () => setCountdown(timeUntilWedding());
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  if (countdown === null) return null;

  return (
    <div
      className="mt-4 text-sm tabular-nums tracking-[0.12em] text-brass-deep"
      role="timer"
      aria-label={`${countdown.days}일 ${countdown.hours}시간 ${countdown.minutes}분 ${countdown.seconds}초 남았습니다`}
    >
      <span className="font-display text-lg">D-{countdown.days}</span>
      <span className="ml-2 text-xs">
        {String(countdown.hours).padStart(2, "0")}시간 {String(countdown.minutes).padStart(2, "0")}분 {String(countdown.seconds).padStart(2, "0")}초
      </span>
    </div>
  );
}

export function WeddingCalendar() {
  return (
    <section
      id="calendar"
      className="border-y border-hair bg-paper-deep/70 paper-fibre"
    >
      <div className="mx-auto grid max-w-[900px] items-center gap-8 px-5 py-14 sm:px-6 sm:py-16 md:grid-cols-[1fr_auto] md:gap-12">
        <Reveal>
          <p className="eyebrow">예식 날짜</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink">
            {wedding.date.year}년 {wedding.date.month}월 {wedding.date.day}일 
          </h2>
          <p className="mt-4 font-display text-3xl font-bold text-balance text-ink">
             {wedding.date.weekday} {wedding.date.hourLabel}
          </p>
          <DayCounter />
        </Reveal>

        <Reveal delay={120} className="mx-auto md:mx-0">
          <Calendar
            mode="single"
            selected={ceremonyDate}
            month={ceremonyDate}
            hideNavigation
            locale={ko}
            onSelect={() => undefined}
            modifiers={{ valentines: ceremonyDate }}
            components={{ DayButton: WeddingDayButton }}
            className="w-fit rounded-[8px] border border-hair bg-paper p-3 shadow-soft [--cell-size:2.5rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}