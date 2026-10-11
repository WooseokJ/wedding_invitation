import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Accounts } from "@/components/Accounts";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { InviteFooter } from "@/components/InviteFooter";
import { InviteHeader } from "@/components/InviteHeader";
import { OpeningScreen } from "@/components/OpeningScreen";
import { SakuraPetals } from "@/components/SakuraPetals";
import { Venue } from "@/components/Venue";
import { WeddingCalendar } from "@/components/WeddingCalendar";
import { dateLine, wedding } from "@/lib/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: ``,
      },
      {
        name: "description",
        content: `${dateLine}, 서울 잠실 ${wedding.venue.park} ${wedding.venue.hall}. 언덕 위의 나무처럼 한자리에 서서 두 사람이 시작합니다.`,
      },
      { property: "og:title", content: `${wedding.groom.first} · ${wedding.bride.first}의 혼례` },
      {
        property: "og:description",
        content: `${dateLine} · 서울 잠실 ${wedding.venue.park} ${wedding.venue.hall}`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className={hasEntered ? "bg-paper" : "h-svh overflow-hidden bg-paper"}>
      <div inert={!hasEntered} aria-hidden={!hasEntered}>
        <InviteHeader />
        <SakuraPetals />
        <main>
          <Hero />
          <WeddingCalendar />
          <Venue />
          <Gallery />
          <Accounts />
        </main>
        <InviteFooter />
      </div>
      {!hasEntered && <OpeningScreen onEnter={() => setHasEntered(true)} />}
    </div>
  );
}
