import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { wedding } from "@/lib/wedding";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const links = [
  { href: "#calendar", label: "예식 날짜" },
  { href: "#venue", label: "장소" },
  { href: "#guestbook", label: "방명록" },
];

export function InviteHeader() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fortuneClickCount = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fortuneOpen, setFortuneOpen] = useState(false);
  const [fortuneMessage, setFortuneMessage] = useState<string | null>(null);

  function handleFortuneClick() {
    fortuneClickCount.current += 1;
    if (fortuneClickCount.current < 5) return;

    fortuneClickCount.current = 0;
    const messages = wedding.fortunePocket.messages;

    const message = messages[Math.floor(Math.random() * messages.length)];
    setFortuneMessage(message);

    setFortuneOpen(true);
  }

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 0.4;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-hair bg-paper/92 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          onClick={handleFortuneClick}
          title={wedding.fortunePocket.hint}
          className="shrink-0 font-display text-xs font-bold tracking-[0.12em] text-ink sm:text-sm sm:tracking-[0.2em]"
        >
          Wedding of {wedding.groom.first} · {wedding.bride.first}
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="flex items-center gap-2 text-[11px] tracking-wide text-ink-soft sm:gap-5 sm:text-xs">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 hover:text-brass-deep"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => void toggleMusic()}
            aria-label={isPlaying ? "배경 음악 끄기" : "배경 음악 켜기"}
            aria-pressed={isPlaying}
            title={isPlaying ? "배경 음악 끄기" : "배경 음악 켜기"}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-hair text-ink-soft transition-colors hover:border-brass hover:text-brass-deep"
          >
            {isPlaying ? (
              <Volume2 aria-hidden="true" className="size-4" />
            ) : (
              <VolumeX aria-hidden="true" className="size-4" />
            )}
          </button>
          <audio
            ref={audioRef}
            src="/backgroundMusic2.m4a"
            loop
            preload="none"
            onError={() => setIsPlaying(false)}
          />
        </div>
      </div>
      <Dialog open={fortuneOpen} onOpenChange={setFortuneOpen}>
        <DialogContent className="max-w-sm overflow-hidden rounded-2xl border-hair bg-paper p-8 text-center text-ink shadow-lg">
          <div className="fortune-burst-stage" aria-hidden="true">
            <span className="fortune-spark fortune-spark-one">✦</span>
            <span className="fortune-spark fortune-spark-two">✧</span>
            <span className="fortune-spark fortune-spark-three">✦</span>
            <span className="fortune-spark fortune-spark-four">✧</span>
            <span className="fortune-spark fortune-spark-five">✦</span>
            <span className="fortune-spark fortune-spark-six">✧</span>
            <span className="fortune-spark fortune-spark-seven">✦</span>
            <span className="fortune-spark fortune-spark-eight">✧</span>
            <div className="fortune-pocket">
              <span className="fortune-pocket-mark">✦</span>
            </div>
          </div>
          <p className="eyebrow">{wedding.fortunePocket.eyebrow}</p>
          <DialogTitle className="font-display text-2xl font-bold text-ink">
            {wedding.fortunePocket.title}
          </DialogTitle>
          {fortuneMessage && (
            <DialogDescription className="text-base leading-relaxed text-ink-soft">
              {fortuneMessage}
            </DialogDescription>
          )}
          {wedding.fortunePocket.messages2.map((message, index) => (
            <p key={`${message}-${index}`} className="text-sm leading-relaxed text-brass-deep">
              {message}
            </p>
          ))}
        </DialogContent>
      </Dialog>
    </header>
  );
}
