// src/components/GameCard/GameCard.jsx
import React, { useState, useEffect } from 'react';
import RankItem from '../RankItem/RankItem';
import styles from './GameCard.module.css';
import { motion, LayoutGroup } from 'framer-motion';

function GameCard({ gameTitle, ranks, prevRanks, unit, isPopped }) {

  // ⭐ 1. 카운터 게임인지 확인
  const isCounter = ranks[0]?.type === 'counter';
  const counterData = isCounter ? ranks[0] : null;

  const displayRanks = [
    ranks[0] || null,
    ranks[1] || null,
    ranks[2] || null,
  ];

  // ⭐ 2. 카드 자체 팝 효과(이미 있던 것)
  const cardVariants = {
    idle: { scale: 1, zIndex: 1, boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)" },
    popped: { 
      scale: 1.1, zIndex: 10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  // ⭐ 3. 카운터 숫자가 바뀔 때마다 키를 바꿔서 바운스 애니메이션 트리거
  const [counterBounceKey, setCounterBounceKey] = useState(0);

  useEffect(() => {
    if (isCounter && counterData) {
      setCounterBounceKey((k) => k + 1);
    }
  }, [isCounter, counterData?.current]);

  return (
    <motion.div
      variants={cardVariants}
      animate={isPopped ? "popped" : "idle"}
      className={styles.gameCard}
    >
      <h3 className={styles.title}>{gameTitle}</h3>
      
      {/* ⭐ 4. 카운터 게임이면 바운스 애니메이션 */}
      {isCounter ? (
  <motion.div
    key={counterBounceKey}
    className={styles.counterWrapper}
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <span className={styles.counterCurrent}>
      {counterData.current}
      {unit && <span className={styles.counterUnit}> {unit}</span>}
    </span>
  </motion.div>
) : (
  <LayoutGroup id={gameTitle}>
    <div className={styles.rankList}>
      {displayRanks.map((rank, index) => {
        let prevRank = null;
        if (rank && prevRanks) {
          const prevRankIndex = prevRanks.findIndex(p => p.id === rank.id);
          if (prevRankIndex !== -1) prevRank = prevRankIndex + 1; 
        }
        return (
          <RankItem
            key={rank?.id || `empty-${index}`} 
            rank={index + 1} 
            prevRank={prevRank}
            name={rank?.name}
            score={rank?.score}
            profileImage={rank?.profileImage}
            unit={unit}
          />
        );
      })}
    </div>
  </LayoutGroup>
)}

    </motion.div>
  );
}

export default GameCard;
