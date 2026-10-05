import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/Gallery";
import { Guestbook } from "@/components/Guestbook";
import { Hero } from "@/components/Hero";
import { Invitation } from "@/components/Invitation";
import { InviteFooter } from "@/components/InviteFooter";
import { InviteHeader } from "@/components/InviteHeader";
import { Venue } from "@/components/Venue";
import { WhenWhere } from "@/components/WhenWhere";
import { dateLine, wedding } from "@/lib/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${wedding.groom.first} · ${wedding.bride.first}의 혼례 — ${wedding.venue.park} ${wedding.venue.hall}`,
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
  return (
    <div className="bg-paper">
      <InviteHeader />
      <main>
        <Hero />
        <WhenWhere />
        <Invitation />
        <Venue />
        <Gallery />
        <Guestbook />
      </main>
      <InviteFooter />
    </div>
  );
}
