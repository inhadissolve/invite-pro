export const GAME_LIST = [
  // 1. 카운터 (정상)
  { 
    id: 'game1', 
    title: '선생님을 이겨라', 
    type: 'counter', 
    target: 30,      
    unit: '명'       
  },
  // 2~8. ⭐️ 게임 제목들을 올바르게 수정했습니다.
  { id: 'game2', title: '여기여기 붙어라', sort: 'desc', unit: '점' },
  { id: 'game3', title: '핑퐁 스나이퍼', sort: 'desc', unit: '점' },
  { id: 'game4', title: '병뚜껑 날리기', sort: 'desc', unit: '점' },
  { id: 'game5', title: '주님의 소방관', sort: 'desc', unit: '개' },
  { id: 'game6', title: '라이트 캐치', sort: 'desc', unit: '점' },
  { 
    id: 'game7', 
    title: '타이머 맞추기', 
    sort: 'target',
    target: 10,
    unit: '초',
  },
  { id: 'game8', title: '뒤집개', sort: 'desc', unit: '점' },
];