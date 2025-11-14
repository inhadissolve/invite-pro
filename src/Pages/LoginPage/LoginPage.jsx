import React, { useState } from 'react'; // 1. useState import
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

// 2. Firebase 인증 관련 함수 import
import { auth } from '../../api/firebase'; // firebase.js에서 auth 가져오기
import { signInWithEmailAndPassword } from 'firebase/auth'; 

function LoginPage() {
  const navigate = useNavigate();

  // 3. 이메일, 비밀번호, 에러, 로딩 state 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    setError(null); // 이전 에러 초기화
    setIsLoading(true); // 로딩 시작

    try {
      // 4. ⭐️ Firebase 로그인 함수 호출 ⭐️
      await signInWithEmailAndPassword(auth, email, password);

      // 5. 로그인 성공 시
      setIsLoading(false);
      navigate('/admin'); // '/admin' 경로로 이동

    } catch (error) {
      // 6. 로그인 실패 시
      setIsLoading(false);
      console.error("로그인 실패:", error.code, error.message);
      if (error.code === 'auth/invalid-credential') {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>관리자 로그인</h2>

        {/* 7. 에러 메시지 표시 */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">이메일</label>
          <input 
            type="email" 
            id="email" 
            placeholder="admin@school.com" 
            value={email} // 8. state와 연결
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            placeholder="비밀번호" 
            value={password} // 8. state와 연결
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={isLoading} // 9. 로딩 중 비활성화
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;