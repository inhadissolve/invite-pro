import React from 'react';
import styles from './AdminGameCard.module.css';

// game: 게임 정보 (id, title, ranks)
// onDataChange: 입력값이 바뀔 때마다 AdminPage의 상태를 업데이트하는 함수
function AdminGameCard({ game, onDataChange }) {

  // 입력 필드 값이 변경될 때 호출되는 함수
  const handleChange = (e, rankIndex, field) => {
    // e.target.name, e.target.value
    const { value } = e.target;
    onDataChange(game.id, rankIndex, field, value);
  };

  // 1, 2, 3위 순위 배열 (데이터가 없으면 빈 객체로)
  const ranks = [
    game.ranks[0] || {},
    game.ranks[1] || {},
    game.ranks[2] || {},
  ];

  return (
    <div className={styles.adminCard}>
      <h3 className={styles.title}>{game.title}</h3>

      {ranks.map((rank, index) => (
        <div key={index} className={styles.rankEditor}>
          <span className={styles.rankLabel}>{index + 1}위</span>
          <div className={styles.inputGrid}>
            <input
              type="text"
              placeholder="학생 이름"
              value={rank.name || ''}
              onChange={(e) => handleChange(e, index, 'name')}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="점수"
              value={rank.score || ''}
              onChange={(e) => handleChange(e, index, 'score')}
              className={styles.inputScore}
            />
            <input
              type="text"
              placeholder="프로필 사진 URL"
              value={rank.profileImage || ''}
              onChange={(e) => handleChange(e, index, 'profileImage')}
              className={styles.inputUrl}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminGameCard;