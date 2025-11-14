import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; // 1. useAuth 훅

function PrivateRoute() {
  // 2. ⭐️ 'loading' 상태도 함께 가져옵니다.
  const { currentUser, loading } = useAuth();

  // 3. ⭐️ 로딩 중일 때의 처리 (중요!)
  if (loading) {
    // AuthContext가 로그인 상태를 확인 중일 때는, 
    // "로딩 중"이라는 화면을 보여주거나, 혹은 잠시 'null'을 반환
    return <div>로그인 상태를 확인 중입니다...</div>; // 또는 null
  }

  // 4. 로딩이 끝난 후 (loading === false)
  // currentUser가 있으면 -> <Outlet /> (자식 페이지, 즉 AdminPage)
  // currentUser가 없으면 -> <Navigate to="/login" /> (로그인 페이지로)
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;