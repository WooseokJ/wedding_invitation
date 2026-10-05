/**
 * Single source of truth for the invitation content.
 * Everything the couple needs to change lives here.
 */

export const wedding = {
  groom: { first: "우석", full: "조우석", family: "영철 · 미영의 아들" },
  bride: { first: "소현", full: "심소현", family: "재호 · 지원의 딸" },

  /** Displayed date parts. `iso` drives the countdown + .ics export. */
  date: {
    iso: "2027-02-14T12:00:00+09:00",
    year: 2027,
    month: 2,
    day: 14,
    weekday: "일요일",
    hourLabel: "낮 12시",
    hangul: "",
    numeric: "2027. 02. 14",
  },

  rsvpDeadline: { iso: "2027-04-30T23:59:00+09:00", label: "4월 30일" },

  venue: {
    park: "올림픽공원",
    hall: "올림픽홀",
    address: "서울특별시 송파구 올림픽로 424",
    mapUrl:
      "https://map.naver.com/p/search/%EB%8D%94%EB%B2%A0%EB%84%A4%EC%B9%98%EC%95%84%20%EC%9B%A8%EB%94%A9?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202610051616%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%8D%94%EB%B2%A0%EB%84%A4%EC%B9%98%EC%95%84%20%EC%9B%A8%EB%94%A9",
    note: "몽촌토성 언덕 아래, 은행나무 길이 가장 아름다운 계절에 두 사람을 모십니다.",
    transit: [
      {
        kind: "지하철",
        detail: "9호선 올림픽공원역 3번 출구 도보 8분 · 8호선 몽촌토성역 1번 출구 도보 12분",
      },
      { kind: "버스", detail: "올림픽공원 하차 · 지선 3315, 3412, 3416" },
      { kind: "주차", detail: "88문 주차장 이용 · 예식 2시간 전 도착 권장" },
    ],
  },

  timeline: [
    {
      time: "11:00",
      title: "하객 안내",
      body: "88문 안내 데스크에서 이름을 확인하고 자리를 안내합니다. 예식 전까지 언덕 산책로를 함께 걸어보세요.",
      accent: "sage" as const,
    },
    {
      time: "11:40",
      title: "착석",
      body: "잔디마당 앞쪽부터 착석이 시작됩니다. 늦게 오시는 분은 뒤쪽 자리로 안내해 드립니다.",
      accent: "brass" as const,
    },
    {
      time: "12:00",
      title: "예식",
      body: "올림픽홀 본식. 두 사람의 서약과 반지, 그리고 혼주의 덕이 이어집니다.",
      accent: "sage" as const,
    },
    {
      time: "13:10",
      title: "사진",
      body: "은행나무 길과 호숫가에서 하객과 함께 사진을 남깁니다.",
      accent: "brass" as const,
    },
    {
      time: "14:00",
      title: "피로연",
      body: "근처 연회장 따뜻한 저녁으로 인사를 이어갑니다.",
      accent: "sage" as const,
    },
  ],

  guestbookSeed: [
    {
      name: "김하늘",
      relation: "신부 친구",
      attending: true,
      message:
        "은행잎 편지처럼 오래 간직할 하루 되세요. 두 사람, 정말 축하해요.",
    }
  ],
} as const;

export type Wedding = typeof wedding;

/** Short Korean date line used in several places. */
export const dateLine = `${wedding.date.numeric} (${wedding.date.weekday}) ${wedding.date.hourLabel}`;
