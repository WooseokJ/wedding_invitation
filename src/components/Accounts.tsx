import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

const accounts = [wedding.accounts.groom, wedding.accounts.bride];

async function copyAccountNumber(number: string) {
  try {
    await navigator.clipboard.writeText(number);
    toast.success("계좌번호를 복사했습니다.");
  } catch {
    toast.error("계좌번호 복사에 실패했습니다.");
  }
}

export function Accounts() {
  return (
    <section className="border-t border-hair bg-paper-deep/40 paper-fibre">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <p className="eyebrow">마음 전하실 곳</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-pretty text-ink">
            축하의 마음을 전해주세요
          </h2>
          <p className="mt-3 text-xs text-ink-soft">
            현재 계좌번호는 시안 확인용 가상번호입니다.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
          {accounts.map((account, index) => (
            <Reveal key={account.side} delay={index * 100}>
              <article className="h-full rounded-[8px] bg-paper p-5 ring-1 ring-hair sm:p-6">
                <p className="eyebrow">{account.side}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-ink-soft">
                      {account.bank} · {account.holder}
                    </p>
                    <p className="mt-1 break-all font-display text-lg tabular-nums tracking-wide text-ink">
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
        </div>
      </div>
    </section>
  );
}