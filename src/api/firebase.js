import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore DB
import { getAuth } from "firebase/auth";       // 인증 (로그인)
import { getStorage } from "firebase/storage"; // 스토리지 (사진 업로드)

// 2단계에서 복사한 본인의 firebaseConfig 객체
const firebaseConfig = {
  apiKey: "AIzaSyBlnDHeF17Ckf9fjhNWyIbcs_xHOr-DN8Q",
  authDomain: "game-leaderboard-12b20.firebaseapp.com",
  projectId: "game-leaderboard-12b20",
  storageBucket: "game-leaderboard-12b20.firebasestorage.app",
  messagingSenderId: "258101355017",
  appId: "1:258101355017:web:8dbe7c2b6ea707cc24ced8",
  measurementId: "G-7PN2J17ZMK"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 각 서비스들을 초기화하고 export (다른 파일에서 가져다 쓸 수 있도록)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // 사진 업로드를 위해 storage도 추가