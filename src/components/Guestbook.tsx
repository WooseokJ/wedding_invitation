import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";

type Entry = {
  id: string;
  name: string;
  relation: string | null;
  message: string;
  attending: boolean;
  created_at: string;
};

async function fetchEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, relation, message, attending, created_at")
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) throw error;
  return (data ?? []) as Entry[];
}

function when(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

export function Guestbook() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
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
    const { error } = await supabase.from("guestbook").insert({
      name: name.trim(),
      relation: relation.trim() || null,
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
    setRelation("");
    setMessage("");
    setAttending(true);
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
            <div className="grid gap-7 sm:grid-cols-2">
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
              <label className="block">
                <span className="mb-1 block text-xs tracking-[0.18em] text-brass-deep">
                  관계
                </span>
                <input
                  value={relation}
                  onChange={(event) => setRelation(event.target.value)}
                  maxLength={20}
                  placeholder="신부 친구"
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
              방명록을 불러오지 못했습니다. 새로고침하면 다시 시도합니다.
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
                <header className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-base font-bold text-ink">
                    {entry.name}
                  </span>
                  <span className="text-[11px] text-ink-soft">
                    {when(entry.created_at)}
                  </span>
                </header>
                <p className="mt-1 text-[11px] text-ink-soft">
                  {entry.relation ? `${entry.relation} · ` : ""}
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
