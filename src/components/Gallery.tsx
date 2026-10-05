import galleryLake from "@/assets/gallery-lake.jpg";
import galleryLeaf from "@/assets/gallery-leaf.jpg";
import heroGinkgo from "@/assets/hero-ginkgo.jpg";
import { Reveal } from "@/components/Reveal";

const frame =
  "w-full rounded-[min(1vw,12px)] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015]";

export function Gallery() {
  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-6 py-28">
        <Reveal className="text-center">
          <p className="eyebrow">함께한 순간</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            여덟손이 호수에서
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Reveal className="sm:row-span-2">
            <div className="overflow-hidden rounded-[min(1vw,12px)] shadow-soft">
              <img
                src={galleryLake}
                alt="여덟손이 호숫가 버드나무 아래를 걷는 두 사람"
                width={912}
                height={1200}
                loading="lazy"
                className={`${frame} aspect-[4/5] sm:aspect-[3/4]`}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[min(1vw,12px)] shadow-soft">
              <img
                src={galleryLeaf}
                alt="손편지에 접어 넣은 은행잎과 반지"
                width={1008}
                height={752}
                loading="lazy"
                className={`${frame} aspect-[4/3]`}
              />
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="overflow-hidden rounded-[min(1vw,12px)] shadow-soft">
              <img
                src={heroGinkgo}
                alt="가로수를 이루는 은행나무 길"
                width={1600}
                height={1120}
                loading="lazy"
                className={`${frame} aspect-[4/3]`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
