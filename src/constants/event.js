const SPEAKER_PORTRAIT = "/images/event-2026-09/speaker-jo-minsu.png";

export const EVENT = {
  year: 2026,
  church: "대한예수교침례회 인천교회",
  organization: "인천교회 농인선교부",
  title: "전도집회",
  invitation: "당신을 초대합니다",
  message: "손끝으로 전해지는 사랑, 함께 나누고 싶습니다",
  speaker: {
    name: "조민수",
    role: "목사",
    photo: SPEAKER_PORTRAIT,
  },
  dateRange: "2026년 9월 3일(목) ~ 9월 6일(일)",
  dateRangeShort: "9월 3일(목) ~ 9월 6일(일)",
  startISO: "2026-09-03T19:30:00+09:00",
  sessions: [
    {
      id: "thu",
      date: "9월 3일",
      weekday: "목요일",
      time: "오후 7시 30분",
      iso: "2026-09-03T19:30:00+09:00",
    },
    {
      id: "fri",
      date: "9월 4일",
      weekday: "금요일",
      time: "오후 7시 30분",
      iso: "2026-09-04T19:30:00+09:00",
    },
    {
      id: "sat",
      date: "9월 5일",
      weekday: "토요일",
      time: "오후 7시",
      iso: "2026-09-05T19:00:00+09:00",
    },
    {
      id: "sun",
      date: "9월 6일",
      weekday: "일요일",
      time: "오전 11시",
      iso: "2026-09-06T11:00:00+09:00",
    },
  ],
  venue: {
    name: "인천교회 교육원 농선부실",
    destinationName: "인천교회 교육원",
    address: "인천 미추홀구 매소홀로418번길 34",
  },
  contacts: [
    {
      id: "contact-1",
      label: "문의 1",
      display: "010-6422-1908",
      phone: "01064221908",
      name: "공명옥",
    },
    {
      id: "contact-2",
      label: "문의 2",
      display: "010-2440-0261",
      phone: "01024400261",
      name: "곽보경",
    },
  ],
  routes: [
    {
      id: "juan",
      title: "주안역에서 오시는 길",
      tone: "green",
      steps: [
        "주안역에서 출발",
        "주안역 인근 정류장에서 버스 518번 탑승",
        "하나아파트 정류장 하차",
        "도보 약 3~5분",
        "인천교회 교육원 도착",
      ],
    },
    {
      id: "inha",
      title: "인하대역(7번 출구)에서 오시는 길",
      tone: "teal",
      steps: [
        "인하대역 7번 출구에서 출발",
        "인하대역 7번 출구 정류장에서 버스 518번 탑승",
        "인천교회 교육원 인근 하차",
        "도보 후 도착",
      ],
    },
  ],
  assets: {
    posterFront: "/images/event-2026-09/postcard-front.jpg",
    directions: "/images/event-2026-09/postcard-directions.jpg",
    speakerPortrait: SPEAKER_PORTRAIT,
    logo: "/images/logo_dove.png",
  },
  optionalSlots: [
    {
      id: "sign-video",
      eyebrow: "선택 자료",
      title: "수어 안내 영상",
      description: "영상 자료를 사용하기로 하면 이 자리에 큰 재생 화면이 들어갑니다.",
      icon: "video",
    },
    {
      id: "speaker-photo",
      eyebrow: "준비된 자료",
      title: "강사 사진",
      description: "조민수 목사님의 강사 사진입니다.",
      icon: "person",
      image: SPEAKER_PORTRAIT,
      imageAlt: "조민수 목사 강사 사진",
    },
    {
      id: "event-gallery",
      eyebrow: "선택 자료",
      title: "집회 사진",
      description: "행사 분위기를 보여 줄 사진은 최대 3장까지 편하게 추가할 수 있습니다.",
      icon: "image",
    },
  ],
};

export const FULL_ADDRESS = `${EVENT.venue.address} ${EVENT.venue.name}`;

export const MAP_LINKS = {
  kakao:
    process.env.NEXT_PUBLIC_KAKAO_MAP_SHARE_LINK ||
    `https://map.kakao.com/link/search/${encodeURIComponent(FULL_ADDRESS)}`,
  naver:
    process.env.NEXT_PUBLIC_NAVER_MAP_SHARE_LINK ||
    `https://map.naver.com/p/search/${encodeURIComponent(FULL_ADDRESS)}`,
};

export const KAKAO_SHARE_INFO = {
  title: `${EVENT.organization} ${EVENT.title}`,
  description: `${EVENT.dateRangeShort}\n${EVENT.venue.name}`,
  image: EVENT.assets.posterFront,
};
