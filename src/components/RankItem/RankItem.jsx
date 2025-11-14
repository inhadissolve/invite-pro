  // src/components/RankItem/RankItem.jsx
  import React, { useState, useEffect, useRef } from 'react';
  import styles from './RankItem.module.css';
  import { motion } from 'framer-motion';

  const medalIcons = {
    1: '/images/gold-medal.png',
    2: '/images/silver-medal.png',
    3: '/images/bronze-medal.png',
  };

  // 순위 카드 애니메이션(살짝 커졌다가/작아졌다가 원래대로)
  const rankVariants = {
    idle: { scale: 1 },
    up: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    down: {
      scale: 0.97,
      transition: { duration: 0.3 },
    },
  };

  // ⭐ studentId 로 “같은 학생인지” 추적
  function RankItem({ rank, studentId, name, score, profileImage, unit }) {
    const [rankChange, setRankChange] = useState(null); // 'up' | 'down' | null
    const prevRankRef = useRef(rank);
    const prevStudentIdRef = useRef(studentId);

    useEffect(() => {
      let changeType = null;

      if (studentId && prevStudentIdRef.current === studentId) {
        // 같은 학생이 순위만 바뀐 경우
        if (prevRankRef.current > rank) {
          changeType = 'up';    // 예: 3위 → 1위
        } else if (prevRankRef.current < rank) {
          changeType = 'down';  // 예: 1위 → 2위
        }
      } else if (studentId && prevStudentIdRef.current !== studentId) {
        // 다른 학생이 새로 이 순위에 진입한 경우
        changeType = 'up';
      }

      if (changeType) {
        setRankChange(changeType);
        const timer = setTimeout(() => {
          setRankChange(null);
        }, 1500); // CSS flashGreen/flashRed와 맞춰서 1.5초

        // 이전 값 업데이트
        prevRankRef.current = rank;
        prevStudentIdRef.current = studentId;

        return () => clearTimeout(timer);
      }

      // 변화 없을 때도 이전 값 업데이트
      prevRankRef.current = rank;
      prevStudentIdRef.current = studentId;
    }, [rank, studentId]);

    // up / down 에 따른 배경 플래시 클래스
    const changeClass =
      rankChange === 'up'
        ? styles.rankUp
        : rankChange === 'down'
        ? styles.rankDown
        : '';

    // 1등 골드 강조: .rank1 클래스 사용
    const rankClass = styles[`rank${rank}`] || '';

    return (
  <motion.div
    layout
    initial={{ opacity: 0, height: 0, scale: 1 }}
    animate={{
      opacity: 1,
      height: 'auto',
      scale:
        rankChange === 'up'
          ? 1.05          // 순위 상승: 살짝 확대
          : rankChange === 'down'
          ? 0.97          // 순위 하락: 살짝 축소
          : 1,            // 변화 없을 때
    }}
    exit={{ opacity: 0, height: 0, scale: 1 }}
    transition={{
      duration: 0.7,      // 🔸 여기로 “스르륵” 속도 조절 (지금보다 살짝 느리게)
      ease: 'easeInOut',
      layout: { duration: 0.7, ease: 'easeInOut' },
    }}
    className={`${styles.rankItem} ${rankClass} ${changeClass}`}
  >
    {/* 이하 내부 내용은 그대로 */}
    <div className={styles.rankInfo}>
      {rank <= 3 && medalIcons[rank] ? (
        <img
          src={medalIcons[rank]}
          alt={`${rank}위 메달`}
          className={styles.medalIcon}
        />
      ) : (
        <span className={styles.rankNumber}>{rank}</span>
      )}
    </div>

    <div className={styles.playerInfo}>
      {profileImage && (
        <img
          src={profileImage}
          alt={`${name}의 프로필 사진`}
          className={styles.profileImage}
        />
      )}
      <span className={styles.name}>{name || '...'}</span>
    </div>

    <span className={styles.score}>
      {score || 0}
      {unit || '점'}
    </span>
  </motion.div>
);

  }

  export default RankItem;
