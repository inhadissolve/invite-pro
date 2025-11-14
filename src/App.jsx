import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import AdminPage from './pages/AdminPage/AdminPage'; 
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // 1. PrivateRoute import

function App() {
  return (
    <Routes>
      {/* 1. 공개 경로 */}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 2. ⭐️ 보호된 경로 ⭐️ */}
      <Route element={<PrivateRoute />}>
        {/* PrivateRoute의 자식으로 배치된 모든 경로는 보호됨 */}
        <Route path="/admin" element={<AdminPage />} />
        {/* 나중에 /admin/settings, /admin/users 등 추가해도 다 보호됨 */}
      </Route>
    </Routes>
  );
}

export default App;