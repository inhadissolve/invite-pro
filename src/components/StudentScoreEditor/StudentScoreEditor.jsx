import React from 'react';
import styles from './StudentScoreEditor.module.css';
import { GAME_LIST } from '../../data/gameList'; 

function StudentScoreEditor({ student, onScoreChange, onClose }) {
  if (!student) return null; 

  const handleChange = (e, gameId) => {
    const newScore = e.target.value === '' ? 0 : parseFloat(e.target.value);
    onScoreChange(student.id, gameId, newScore);
  };

  return (
    <div className={styles.editorOverlay}>
      <div className={styles.editorCard}>
        <div className={styles.header}>
          <img src={student.profileImage} alt={student.name} className={styles.profileImage} />
          <h3>{student.name} 학생 점수 수정</h3>
          <button onClick={onClose} className={styles.closeButton}>X</button>
        </div>

        <div className={styles.scoreGrid}>
          {GAME_LIST.map((game) => {
            // ⭐️ 1. 카운터 게임인지 확인
            const isCounterGame = game.type === 'counter';

            return (
              <div key={game.id} className={styles.scoreInputGroup}>
                <label htmlFor={`${student.id}-${game.id}`}>
                  {game.title} ({game.unit})
                  {/* ⭐️ 2. 카운터 게임이면 안내 문구 추가 */}
                  {isCounterGame && (
                    <span className={styles.counterGuide}> (성공 시 '1' 입력)</span>
                  )}
                </label>
                <input
                  type="number" 
                  step={game.unit === '초' ? "0.01" : "1"}
                  id={`${student.id}-${game.id}`}
                  value={student.scores[game.id] || 0}
                  onChange={(e) => handleChange(e, game.id)}
                  className={styles.scoreInput}
                  placeholder={game.filterMax ? `(최대 ${game.filterMax}${game.unit})` : ''}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StudentScoreEditor;