import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext'; // 1. import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. App을 AuthProvider로 감싸기 */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);