import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

const stanzas = [
  "언덕 위에 나무 한 그루가 서 있습니다.",
  "그 나무가 가장 먼저 가을을 알고, 가장 늦게 밤을 보내는 자리에서\n두 사람이 서로의 편이 되기로 약속합니다.",
  "멀리서 오신 걸음, 그 무게를 오래 기억하겠습니다.\n오셔서, 그 언덕의 바람을 함께 맡아 주세요.",
];

export function Invitation() {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-28">
      <Reveal className="text-center">
        <p className="eyebrow">인사 드립니다</p>
      </Reveal>

      <div className="mx-auto mt-12 max-w-[34ch] space-y-10 text-center">
        {stanzas.map((stanza, index) => (
          <Reveal key={stanza} delay={index * 140}>
            <p className="font-display text-xl leading-[1.9] text-pretty whitespace-pre-line text-ink">
              {stanza}
            </p>
          </Reveal>
        ))}

        <Reveal delay={420}>
          <p className="pt-4 text-sm text-ink-soft">
            {wedding.groom.full} · {wedding.bride.full}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
