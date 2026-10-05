import { useEffect, useState } from "react";
import { toast } from "sonner";
import { invitationIcsHref } from "@/lib/ics";
import { dateLine, wedding } from "@/lib/wedding";

async function shareInvitation() {
  const url = window.location.href;
  const payload = {
    title: `${wedding.groom.first} · ${wedding.bride.first}의 혼례`,
    text: `${dateLine} — ${wedding.venue.park} ${wedding.venue.hall}`,
    url,
  };

  if (typeof navigator.share === "function") {
    try {
      await navigator.share(payload);
    } catch {
      /* the guest dismissed the share sheet */
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    toast.success("초대장 주소가 복사되었습니다.");
  } catch {
    toast.error("복사에 실패했습니다. 주소창의 주소를 직접 복사해 주세요.");
  }
}

export function InviteFooter() {
  // Built on the client only: the calendar stamp changes every render, so
  // generating it during SSR would mismatch on hydration.
  const [icsHref, setIcsHref] = useState("");
  useEffect(() => {
    setIcsHref(invitationIcsHref());
  }, []);

  return (
    <footer className="border-t border-hair bg-paper-deep/50 paper-fibre">
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center">
        <p className="font-display text-3xl font-extrabold tracking-tight text-ink">
          {wedding.groom.first}
          <span className="mx-2 font-normal text-brass">·</span>
          {wedding.bride.first}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {dateLine} · {wedding.venue.park} {wedding.venue.hall}
        </p>
        <p className="mt-1 text-xs text-ink-faint">{wedding.venue.address}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={shareInvitation}
            className="rounded-full border border-hair-strong px-5 py-2.5 text-sm text-ink transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-paper"
          >
            초대장 공유
          </button>
        </div>

        <p className="mt-14 text-[11px] tracking-[0.3em] text-ink-faint">
          {wedding.venue.park} · 서울 송파구
        </p>
      </div>
    </footer>
  );
}
