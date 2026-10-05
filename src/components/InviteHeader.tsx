import { wedding } from "@/lib/wedding";

const links = [
  { href: "#when", label: "예식" },
  { href: "#venue", label: "장소" },
  { href: "#guestbook", label: "방명록" },
];

export function InviteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-hair bg-paper/92 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-6">
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-[0.2em] text-ink"
        >
          {wedding.groom.first} · {wedding.bride.first}
        </a>

        <nav className="flex items-center gap-5 text-xs tracking-wide text-ink-soft">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden transition-colors duration-300 hover:text-brass-deep sm:inline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#guestbook"
            className="rounded-full border border-brass/45 px-3 py-1.5 text-ink transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-paper"
          >
            참석
          </a>
        </nav>
      </div>
    </header>
  );
}
