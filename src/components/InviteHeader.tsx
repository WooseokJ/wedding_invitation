import { wedding } from "@/lib/wedding";

const links = [
  { href: "#when", label: "예식" },
  { href: "#venue", label: "장소" },
  { href: "#guestbook", label: "방명록" },
];

export function InviteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-hair bg-paper/92 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="shrink-0 font-display text-xs font-bold tracking-[0.12em] text-ink sm:text-sm sm:tracking-[0.2em]"
        >
          {wedding.groom.first} · {wedding.bride.first}
        </a>

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
          <a
            href="#guestbook"
            className="shrink-0 rounded-full border border-brass/45 px-2.5 py-1.5 text-ink transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-paper sm:px-3"
          >
            참석
          </a>
        </nav>
      </div>
    </header>
  );
}
