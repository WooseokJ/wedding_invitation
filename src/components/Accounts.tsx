import { useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { wedding } from "@/lib/wedding";

const accountGroups = [
  { side: "신랑측", accounts: wedding.accounts.groom },
  { side: "신부측", accounts: wedding.accounts.bride },
];

async function copyAccountNumber(number: string) {
  try {
    await navigator.clipboard.writeText(number);
    toast.success("계좌번호를 복사했습니다.");
  } catch {
    toast.error("계좌번호 복사에 실패했습니다.");
  }
}

export function Accounts() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set());

  function toggleGroup(side: string, open: boolean) {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (open) next.add(side);
      else next.delete(side);
      return next;
    });
  }

  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <p className="eyebrow">마음 전하실 곳</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            축하의 마음을 전해주세요
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-2 md:gap-6">
          {accountGroups.map((group, groupIndex) => (
            <section key={group.side} aria-label={`${group.side} 계좌`}>
              <Reveal delay={groupIndex * 100}>
                <Collapsible
                  open={openGroups.has(group.side)}
                  onOpenChange={(open) => toggleGroup(group.side, open)}
                >
                  <CollapsibleTrigger className="group flex w-full items-center justify-between border-b border-hair pb-3 text-left">
                    <span className="eyebrow">{group.side}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-5 text-brass-deep transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-3 overflow-hidden">
                    {group.accounts.map((account, accountIndex) => (
                      <Reveal key={account.role} delay={accountIndex * 70}>
                        <article className="rounded-[8px] bg-paper p-4 ring-1 ring-hair sm:p-5">
                          <p className="text-xs text-brass-deep">{account.role}</p>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm text-ink-soft">
                                {account.bank} · {account.holder}
                              </p>
                              <p className="mt-1 break-all font-display text-base tabular-nums tracking-wide text-ink">
                                {account.number}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void copyAccountNumber(account.number)}
                              className="flex shrink-0 items-center gap-1.5 rounded-[6px] border border-hair px-3 py-2 text-xs text-ink transition-colors hover:border-brass hover:bg-brass hover:text-paper"
                            >
                              <Copy aria-hidden="true" className="size-3.5" />
                              복사
                            </button>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
