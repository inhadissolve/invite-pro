export function calculateLeaderboards(studentData, gameList) {
  
  const leaderboards = gameList.map((game) => {
    
    // ⭐️ [Case 1] 카운터 게임 처리
    if (game.type === 'counter') {
      const winnerCount = studentData.filter(s => s.scores[game.id] > 0).length;
      
      const target = game.target || 30;
      // "남은 인원" 계산
      const remainingCount = Math.max(0, target - winnerCount); 

      return {
        id: game.id,
        title: game.title,
        ranks: [ 
          { type: 'counter', current: remainingCount, target: target }
        ],
        unit: '명 남음',
      };
    }

    // ⭐️ [Case 2] 일반 순위 게임 처리
    const scoresForGame = studentData
      .map((student) => ({
        id: student.id,
        name: student.name,
        score: student.scores[game.id] || 0,
        profileImage: student.profileImage,
      }))
      .filter(student => {
        if (student.score <= 0) return false; 
        return true;
      });
      
    // ⭐️⭐️ [핵심] 이 정렬 로직이 올바르게 적용되어야 합니다.
    if (game.sort === 'target') {
      // 목표값(10)과의 차이가 작은 순서
      const target = game.target || 0;
      scoresForGame.sort((a, b) => {
        const diffA = Math.abs(a.score - target);
        const diffB = Math.abs(b.score - target);
        return diffA - diffB;
      });
    } else if (game.sort === 'asc') {
      // 낮은 점수 순서 (현재 사용 안 함)
      scoresForGame.sort((a, b) => a.score - b.score);
    } else {
      // (기본값 'desc') 높은 점수 순서
      scoresForGame.sort((a, b) => b.score - a.score);
    }

    const top3Ranks = scoresForGame.slice(0, 3);

    return {
      id: game.id,
      title: game.title,
      ranks: top3Ranks,
      unit: game.unit || '점', 
    };
  });

  return leaderboards;
}