// 80명의 학생 데이터 (일단 10명만 예시로 만듭니다)
// scores 객체에 8개 게임의 점수를 모두 저장합니다.
export const INITIAL_STUDENT_DATA = [
  {
    id: 's1',
    name: '김철수',
    // 'https://i.pravatar.cc/150?img=1' 대신
    profileImage: '/images/students/s1.png', // 1. public 폴더 기준 경로
    scores: { game1: 1250, game2: 980, /* ... */ },
  },
  {
    id: 's2',
    name: '이영희',
    profileImage: '/images/students/s2.png', // 2.
    scores: { game1: 1200, game2: 950, /* ... */ },
  },
  {
    id: 's3',
    name: '박민준',
    profileImage: '/images/students/s3.png', // 3.
    scores: { game1: 1180, game2: 920, /* ... */ },
  },
  // ... (다른 학생들도 마찬가지)
];