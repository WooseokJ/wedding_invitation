import { Reveal } from "@/components/Reveal";
import foodImage from "@/assets/foodImage.jpg";
import { wedding } from "@/lib/wedding";

export function MealGuide() {
  const { meal } = wedding;

  return (
    <section className="border-t border-hair bg-paper paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <p className="eyebrow">{meal.eyebrow}</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink"></h2>
        </Reveal>

        <Reveal className="text-center mt-9 sm:mt-14">
          <img
            src={foodImage}
            alt="2월 14일 우석과 소현의 결혼을 축하하는 그림"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full rounded-xl border border-hair"
          />

          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{meal.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{meal.description2}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{meal.description3}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{meal.description4}</p>
        </Reveal>
      </div>
    </section>
  );
}
