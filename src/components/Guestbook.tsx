import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";

const GUESTBOOK_AUTHOR_STORAGE_KEY = "wedding_guestbook_author_id";
const GUESTBOOK_STORAGE_KEY = "wedding_guestbook_entries";

function readGuestbookAuthorId() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(GUESTBOOK_AUTHOR_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const nextId = crypto.randomUUID();
  window.localStorage.setItem(GUESTBOOK_AUTHOR_STORAGE_KEY, nextId);
  return nextId;
}

function readGuestbookEntries(): Entry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as Entry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGuestbookEntries(entries: Entry[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(entries));
}

function seedGuestbookEntries(): Entry[] {
  const seededEntries = wedding.guestbookSeed.map((entry, index) => ({
    id: `seed-${index}`,
    name: entry.name,
    author_id: `seed-${index}`,
    message: entry.message,
    attending: entry.attending,
    created_at: new Date(Date.now() - index * 86400000).toISOString(),
  }));

  writeGuestbookEntries(seededEntries);
  return seededEntries;
}

type Entry = {
  id: string;
  name: string;
  author_id: string | null;
  message: string;
  attending: boolean;
  created_at: string;
};

async function fetchEntries(): Promise<Entry[]> {
  const storedEntries = readGuestbookEntries();
  if (storedEntries.length > 0) {
    return storedEntries;
  }

  return seedGuestbookEntries();
}

function when(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

export function Guestbook() {
  const authorId = useMemo(() => readGuestbookAuthorId(), []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState(true);
  const [sending, setSending] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["guestbook"],
    queryFn: fetchEntries,
  });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("이름과 축하의 말을 입력해 주세요.");
      return;
    }

    setSending(true);

    const newEntry: Entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      author_id: authorId,
      message: message.trim(),
      attending,
      created_at: new Date().toISOString(),
    };

    const nextEntries = [newEntry, ...readGuestbookEntries()];
    writeGuestbookEntries(nextEntries);
    setSending(false);

    toast.success("따뜻한 답장을 남겼습니다. 감사합니다.");
    setName("");
    setMessage("");
    setAttending(true);
    void refetch();
  }

  async function deleteEntry(entryId: string) {
    const currentEntries = readGuestbookEntries();
    const target = currentEntries.find((entry) => entry.id === entryId);

    if (!target || target.author_id !== authorId) {
      toast.error("작성자 본인 글만 지울 수 있습니다.");
      return;
    }

    const nextEntries = currentEntries.filter((entry) => entry.id !== entryId);
    writeGuestbookEntries(nextEntries);
    toast.success("방명록을 삭제했어요.");
    void refetch();
  }

  return (
    <section id="guestbook" className="border-t border-hair">
      <div className="mx-auto max-w-[900px] px-6 py-28">
        <Reveal className="text-center">
          <p className="eyebrow">방명록 · 참석</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            함께해 주시겠습니까
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            {wedding.rsvpDeadline.label}까지 답을 기다립니다.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={submit}
            className="mt-12 rounded-[min(1vw,12px)] bg-paper-deep/50 p-7 ring-1 ring-hair sm:p-10"
          >
            <div className="grid gap-7 sm:grid-cols-1">
              <label className="block">
                <span className="mb-1 block text-xs tracking-[0.18em] text-brass-deep">
                  이름
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={20}
                  placeholder="홍길동"
                  className="field-line"
                />
              </label>
            </div>

            <div className="mt-7">
              <span className="mb-3 block text-xs tracking-[0.18em] text-brass-deep">
                참석 여부
              </span>
              <div className="flex gap-3">
                {[
                  { value: true, label: "참석합니다" },
                  { value: false, label: "함께하지 못합니다" },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setAttending(option.value)}
                    className={cn(
                      "flex-1 rounded-[8px] py-3 text-sm transition-colors duration-300",
                      attending === option.value
                        ? "bg-ink text-paper"
                        : "bg-paper text-ink ring-1 ring-hair",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-7 block">
              <span className="mb-1 block text-xs tracking-[0.18em] text-brass-deep">
                축하의 한마디
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={300}
                rows={3}
                placeholder="두 사람에게 전하고 싶은 말을 남겨 주세요."
                className="field-line resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 w-full rounded-[8px] bg-ink py-3.5 text-sm tracking-wide text-paper transition-colors duration-300 hover:bg-brass-deep disabled:opacity-60"
            >
              {sending ? "보내는 중…" : "답장 보내기"}
            </button>
          </form>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {isPending && (
            <p className="text-sm text-ink-soft sm:col-span-3">
              인사를 불러오는 중입니다…
            </p>
          )}

          {isError && (
            <p className="text-sm text-ink-soft sm:col-span-3">
              
            </p>
          )}

          {!isPending && !isError && (data?.length ?? 0) === 0 && (
            <p className="text-sm text-ink-soft sm:col-span-3">
              아직 첫 인사가 없습니다. 가장 먼저 축하를 남겨 주세요.
            </p>
          )}

          {(data ?? []).map((entry, index) => (
            <Reveal key={entry.id} delay={Math.min(index, 5) * 80}>
              <article className="h-full rounded-[min(1vw,12px)] bg-paper p-5 ring-1 ring-hair">
                <header className="flex items-start justify-between gap-3">
                  <span className="font-display text-base font-bold text-ink">
                    {entry.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-ink-soft">
                      {when(entry.created_at)}
                    </span>
                    {entry.author_id === authorId && (
                      <button
                        type="button"
                        aria-label="삭제"
                        onClick={() => void deleteEntry(entry.id)}
                        className="flex size-6 items-center justify-center rounded-full text-sm text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </header>
                <p className="mt-1 text-[11px] text-ink-soft">
                  {entry.attending ? "참석" : "함께하지 못함"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-soft">
                  {entry.message}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
