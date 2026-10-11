import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { wedding } from "@/lib/wedding";

export function OpeningScreen({ onEnter }: { onEnter: () => void }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const enterInvitation = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    window.setTimeout(onEnter, 650);
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-screen-title"
      className={`fixed inset-0 z-[100] grid min-h-svh place-items-center overflow-hidden transition-opacity duration-[650ms] ${isLeaving ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <div
        aria-hidden="true"
        className="opening-screen-backdrop absolute inset-0 bg-paper/45 backdrop-blur-xl"
      />

      <div className="relative mx-6 flex w-full max-w-xl flex-col items-center text-center">
        <p className="opening-screen-label eyebrow">{wedding.invitation.label}</p>
        <h1
          id="opening-screen-title"
          className="opening-screen-title mt-7 font-display text-5xl leading-tight font-medium text-ink sm:text-7xl"
        >
          {wedding.invitation.title}
        </h1>
        <span className="opening-screen-rule mt-8 block h-px w-14 bg-brass/70" />
        <p className="opening-screen-names mt-7 font-display text-lg text-ink sm:text-xl">
          {wedding.groom.first} ♡ {wedding.bride.first}
        </p>
        <button
          type="button"
          onClick={enterInvitation}
          className="opening-screen-action mt-12 inline-flex min-h-12 items-center gap-3 border-b border-brass/55 px-1 pb-2 text-sm text-ink transition-colors hover:border-brass hover:text-brass-deep"
        >
          {wedding.invitation.enterLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </section>
  );
}