/**
 * Single source of truth for the invitation content.
 * Everything the couple needs to change lives here.
 */

export const wedding = {
  groom: { first: "우석", full: "조우석", family: "조형곤 · 이미송의 아들" },
  bride: { first: "소현", full: "심소현", family: "심영하 · 김은순의 딸" },

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
    park: "더베네치아",
    hall: "웨딩홀 3층",
    address: "서울 송파구 올림픽로35다길 42",
    mapUrl:
      "https://map.naver.com/p/search/%EB%8D%94%EB%B2%A0%EB%84%A4%EC%B9%98%EC%95%84%20%EC%9B%A8%EB%94%A9?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202610051616%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%8D%94%EB%B2%A0%EB%84%A4%EC%B9%98%EC%95%84%20%EC%9B%A8%EB%94%A9",
    note: "",
    transit: [
      {
        kind: "지하철",
        detail: "2호선 잠실역 8번 출구, 도보 4분\n 8호선 잠실역 9번 출구, 도보 3분",
      },
      { kind: "시외버스", detail: "추천-잠실행: 잠실역 6번 출구 앞 하차, 도보 9분" },
      { kind: "주차", detail: "웨딩홀 지하주차장 2시간 무료(추가 천원/30분)\n주차 부족 시 옆건물(대한제당) 안내 받아 주차 가능" },
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

  ],
} as const;

export type Wedding = typeof wedding;

/** Short Korean date line used in several places. */
export const dateLine = `${wedding.date.numeric} (${wedding.date.weekday}) ${wedding.date.hourLabel}`;
