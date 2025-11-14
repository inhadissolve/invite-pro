import React, { useState, useEffect, useRef } from 'react';
import GameCard from '../GameCard/GameCard';
import styles from './Leaderboard.module.css';
import { calculateLeaderboards } from '../../utils/leaderboardCalculator';
import { GAME_LIST } from '../../data/gameList';
import { db } from '../../api/firebase';
import { collection, onSnapshot } from 'firebase/firestore'; 
import { LayoutGroup } from 'framer-motion';

function Leaderboard() {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const prevCalculatedDataRef = useRef(null);
  const isFirstLoadRef = useRef(true); 

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'students'), 
      (querySnapshot) => {
        const studentsList = querySnapshot.docs.map(doc => doc.data());
        setStudentData(studentsList); 
        
        const newCalculatedGameData = calculateLeaderboards(studentsList, GAME_LIST);

        if (isFirstLoadRef.current) {
          isFirstLoadRef.current = false; 
          setIsLoading(false); 
        }
        
        prevCalculatedDataRef.current = newCalculatedGameData;
      }, 
      (error) => {
        console.error("Error listening to student data: ", error);
        setIsLoading(false);
      }
    );
    return () => unsubscribe(); 
  }, []); 

  const calculatedGameData = calculateLeaderboards(studentData, GAME_LIST);
  const prevData = prevCalculatedDataRef.current;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>순위표를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      {/* ⭐️ 여기가 핵심! styles.leaderboardGrid -> styles.leaderboard 로 수정 */}
      <div className={styles.leaderboard}>
        {calculatedGameData.map((game) => {
          const prevGameRanks = prevData?.find(p => p.id === game.id)?.ranks || [];
          return (
            <GameCard
              key={game.id}
              gameTitle={game.title}
              ranks={game.ranks} 
              prevRanks={prevGameRanks} 
              unit={game.unit}
            />
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export default Leaderboard;