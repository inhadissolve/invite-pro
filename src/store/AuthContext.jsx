import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../api/firebase'; 
import { onAuthStateChanged } from 'firebase/auth'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); 
      setLoading(false); 
    });
    return unsubscribe;
  }, []); 

  const value = {
    currentUser,
    loading, // ⭐️ 'loading' 상태를 밖으로 내보내줍니다.
  };

  // ⭐️⭐️ 수정된 부분 ⭐️⭐️
  // !loading && children을 삭제해서, 로딩 중에도 children (App)이
  // 렌더링되도록 허용합니다.
  return (
    <AuthContext.Provider value={value}>
      {children} 
    </AuthContext.Provider>
  );
}