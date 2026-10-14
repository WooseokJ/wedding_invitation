import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";

const GUESTBOOK_AUTHOR_STORAGE_KEY = "wedding_guestbook_author_id";

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

type Entry = {
  id: string;
  name: string;
  author_id: string | null;
  message: string;
  attending: boolean;
  created_at: string;
};

async function fetchEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, author_id, message, attending, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;
  return (data ?? []) as Entry[];
}

function when(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

const PREVIEW_COUNT = 5;

function EntryCard({
  entry,
  canDelete,
  onDelete,
}: {
  entry: Entry;
  canDelete: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="h-full rounded-[min(1vw,12px)] bg-paper p-5 ring-1 ring-hair">
      <header className="flex items-start justify-between gap-3">
        <span className="font-display text-base font-bold text-ink">
          {entry.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-ink-soft">
            {when(entry.created_at)}
          </span>
          {canDelete && (
            <button
              type="button"
              aria-label="삭제"
              onClick={() => onDelete(entry.id)}
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
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-pretty text-ink-soft">
        {entry.message}
      </p>
    </article>
  );
}

function EntriesModal({
  open,
  onClose,
  entries,
  authorId,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  entries: Entry[];
  authorId: string;
  onDelete: (id: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="전체 방명록"
    >
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-2xl bg-paper-deep shadow-xl sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hair px-5 py-4">
          <h3 className="font-display text-base font-bold text-ink">
            전체 방명록{" "}
            <span className="font-normal text-ink-soft">({entries.length})</span>
          </h3>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-lg text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto overscroll-contain p-5">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              canDelete={entry.author_id === authorId}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Guestbook() {
  const authorId = useMemo(() => readGuestbookAuthorId(), []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState(true);
  const [sending, setSending] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["guestbook"],
    queryFn: fetchEntries,
  });

  // 서버에서 created_at 내림차순(최신순)으로 가져옵니다.
  const entries = data ?? [];
  const preview = entries.slice(0, PREVIEW_COUNT);

  // 삭제 등으로 5개 이하가 되면 모달을 자동으로 닫습니다.
  useEffect(() => {
    if (entries.length <= PREVIEW_COUNT) setModalOpen(false);
  }, [entries.length]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("이름과 축하의 말을 입력해 주세요.");
      return;
    }

    setSending(true);
    const { error } = await supabase.from("guestbook").insert({
      name: name.trim(),
      author_id: authorId,
      message: message.trim(),
      attending,
    });
    setSending(false);

    if (error) {
      toast.error("답장이 닿지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    toast.success("따뜻한 답장을 남겼습니다. 감사합니다.");
    setName("");
    setMessage("");
    setAttending(true);
    void refetch();
  }

  async function deleteEntry(entryId: string) {
    const { error } = await supabase
      .from("guestbook")
      .delete()
      .eq("id", entryId)
      .eq("author_id", authorId);

    if (error) {
      toast.error("작성자 본인 글만 지울 수 있습니다.");
      return;
    }

    toast.success("방명록을 삭제했어요.");
    void refetch();
  }

  return (
    <section id="guestbook" className="border-t border-hair">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">방명록 · 참석</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            함께해 주시겠습니까
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            참석 여부와 두 사람에게 전하는 축하의 말을 남겨 주세요.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={submit}
            className="mt-9 rounded-[min(1vw,12px)] bg-paper-deep/50 p-5 ring-1 ring-hair sm:mt-12 sm:p-10"
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
                  required
                  autoComplete="name"
                  placeholder="이름을 입력해 주세요."
                  className="field-line"
                />
              </label>
            </div>

            <div className="mt-7">
              <span className="mb-3 block text-xs tracking-[0.18em] text-brass-deep">
                참석 여부
              </span>
              <div className="flex flex-col gap-2 min-[360px]:flex-row min-[360px]:gap-3">
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
                required
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
              방명록을 불러오고 있습니다.
            </p>
          )}

          {isError && (
            <div className="text-center text-sm text-ink-soft sm:col-span-3">
              <p role="alert">방명록을 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-3 underline underline-offset-4 transition-colors hover:text-ink"
              >
                다시 불러오기
              </button>
            </div>
          )}

          {!isPending && !isError && (data?.length ?? 0) > 0 && (
            <p className="text-xs text-ink-soft sm:col-span-3">
              최근 인사 {Math.min(entries.length, PREVIEW_COUNT)}개를 보여 드립니다.
            </p>
          )}

          {!isPending && !isError && (data?.length ?? 0) === 0 && (
            <p className="text-sm text-ink-soft sm:col-span-3">
              아직 첫 인사가 없습니다. 가장 먼저 축하를 남겨 주세요.
            </p>
          )}

          {preview.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 80}>
              <EntryCard
                entry={entry}
                canDelete={entry.author_id === authorId}
                onDelete={(id) => void deleteEntry(id)}
              />
            </Reveal>
          ))}

          {entries.length > PREVIEW_COUNT && (
            <div className="mt-2 text-center sm:col-span-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-paper px-5 py-2.5 text-sm text-ink ring-1 ring-hair transition-colors hover:bg-paper-deep"
              >
                전체 메시지 보기 ({entries.length})
              </button>
            </div>
          )}
        </div>

        <EntriesModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          entries={entries}
          authorId={authorId}
          onDelete={(id) => void deleteEntry(id)}
        />
      </div>
    </section>
  );
}
