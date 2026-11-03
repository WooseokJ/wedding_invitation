import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function CoupleIntroduction() {
  const { familyIntroduction, groom, bride } = wedding;
  const couple = [
    { label: familyIntroduction.groomLabel, family: groom.family, name: groom.full },
    { label: familyIntroduction.brideLabel, family: bride.family, name: bride.full },
  ];

  return (
    <section aria-labelledby="couple-introduction-title" className="border-b border-hair">
      <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-6 sm:py-16">
        <Reveal className="text-center">
          <p className="eyebrow">{familyIntroduction.eyebrow}</p>

          <p className="mx-auto mt-7 max-w-[38ch] text-base leading-8 text-pretty text-ink-soft sm:mt-8 sm:text-lg">
            {familyIntroduction.description}
          </p>
          <p className="mx-auto mt-7 max-w-[38ch] text-base leading-8 text-pretty text-ink-soft sm:mt-8 sm:text-lg">
            {familyIntroduction.description2}
          </p>
            <p className="mx-auto mt-7 max-w-[38ch] text-base leading-8 text-pretty text-ink-soft sm:mt-8 sm:text-lg">
            {familyIntroduction.description3}
          </p>
            <p className="mx-auto mt-7 max-w-[38ch] text-base leading-8 text-pretty text-ink-soft sm:mt-8 sm:text-lg">
            {familyIntroduction.description4}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[660px] sm:mt-16 sm:grid-cols-2">
          {couple.map((person, index) => (
            <Reveal key={person.label} delay={index * 100}>
              <div
                className={`px-4 py-5 text-center sm:px-8 ${index === 1 ? "border-t border-hair sm:border-t-0 sm:border-l" : ""}`}
              >
                <p className="font-display text-xs leading-snug font-bold tracking-[0.04em] text-brass-deep">
                  {person.label}
                </p>
                <p className="mt-4 font-display text-base leading-relaxed font-bold text-ink sm:text-lg">
                  {person.family}
                </p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{person.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
