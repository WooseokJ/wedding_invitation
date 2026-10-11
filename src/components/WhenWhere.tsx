import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function WhenWhere() {
  const { date, venue } = wedding;

  const cells = [
    {
      label: "일시",
      lines: [
        `${date.month}월 ${date.day}일 ${date.weekday}`,
        date.hourLabel,
      ],
    },
    {
      label: "장소",
      lines: [venue.park, venue.hall],
    },
  ];

  return (
    <section id="when" className="border-y border-hair bg-paper-deep/70 paper-fibre">
      <div className="mx-auto grid max-w-[900px] gap-8 px-6 py-12 sm:grid-cols-2 sm:divide-x sm:divide-hair sm:gap-0">
        {cells.map((cell, index) => (
          <Reveal
            key={cell.label}
            delay={index * 120}
            className="sm:px-8 sm:first:pl-0 sm:last:pr-0"
          >
            <p className="eyebrow">{cell.label}</p>
            {cell.lines.map((line) => (
              <p key={line} className="mt-2 font-display text-lg text-pretty text-ink">
                {line}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
