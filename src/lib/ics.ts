import { dateLine, wedding } from "./wedding";

function stamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const seoulDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

function seoulDay(date: Date) {
  const parts = Object.fromEntries(
    seoulDateFormatter
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );
  return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}

/** Data URL for a calendar file so guests can save the day with one tap. */
export function invitationIcsHref() {
  const start = new Date(wedding.date.iso);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//invitation//KR//KO",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@invitation`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${wedding.groom.first} · ${wedding.bride.first}의 혼례`,
    `LOCATION:${wedding.venue.park} ${wedding.venue.hall} (${wedding.venue.address})`,
    `DESCRIPTION:${dateLine} — ${wedding.venue.note}`,
    "BEGIN:VALARM",
    "TRIGGER:-P3D",
    "ACTION:DISPLAY",
    "DESCRIPTION:혼례가 3일 앞으로 다가왔습니다",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

/** Days remaining until the ceremony, for the quiet D-day line in the hero. */
export function daysLeft(now = new Date()) {
  const target = seoulDay(new Date(wedding.date.iso));
  const today = seoulDay(now);
  return Math.max(0, (target - today) / 86400000);
}

export function timeUntilWedding(now = new Date()) {
  const remainingSeconds = Math.max(
    0,
    Math.floor((new Date(wedding.date.iso).getTime() - now.getTime()) / 1000),
  );

  return {
    days: daysLeft(now),
    hours: Math.floor(remainingSeconds / 3600) % 24,
    minutes: Math.floor(remainingSeconds / 60) % 60,
    seconds: remainingSeconds % 60,
  };
}
