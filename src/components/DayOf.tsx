import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";

export function DayOf() {
  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-6 py-28">
        <Reveal className="text-center">
          <p className="eyebrow">당일의 순서</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            접수에서 피로연까지
          </h2>
        </Reveal>

        <ol className="mt-16 space-y-12 border-l border-hair pl-8 sm:pl-12">
          {wedding.timeline.map((item, index) => (
            <li key={item.time} className="relative">
              <span
                className={cn(
                  "absolute top-2 size-2.5 rounded-full ring-4 ring-paper-deep -left-[38px] sm:-left-[54px]",
                  item.accent === "sage" ? "bg-sage" : "bg-brass",
                )}
              />
              <Reveal delay={index * 90}>
                <span className="text-xs tabular-nums tracking-[0.22em] text-ink-soft">
                  {item.time}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-pretty text-ink-soft">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
