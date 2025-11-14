import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import styles from './MainPage.module.css';

function MainPage() {
  const { currentUser } = useAuth(); 

  return (
    <div className={styles.mainPage}>
      <header className={styles.header}>
        {/* 1. ⭐️ 제목 변경 ⭐️ */}
        <h1>🏆 인천교회 초등부 달란트 게임 순위표 🏆</h1>
        {/* 2. ⭐️ 소제목 변경 ⭐️ */}
        <p className={styles.subtitle}>게임의 주인공은 누구?!</p>
        
        {currentUser && (
          <div className={styles.adminNav}>
            <Link to="/admin" className={styles.adminLink}>
              관리자 페이지로
            </Link>
          </div>
        )}
        
      </header>
      <main>
        <Leaderboard />
      </main>
    </div>
  );
}

export default MainPage;