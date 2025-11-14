import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import StudentScoreEditor from '../../components/StudentScoreEditor/StudentScoreEditor';

import { db, auth } from '../../api/firebase'; 
import { signOut } from 'firebase/auth';
// 1. ⭐️ DB에 데이터를 쓰고(writeBatch, doc, setDoc), 읽어오는(collection, getDocs) 함수
import { collection, getDocs, doc, writeBatch, setDoc } from 'firebase/firestore'; 

// 2. ⭐️⭐️ (중요!) ⭐️⭐️
// 이 파일은 제가 "최종 학생 명단"을 받은 뒤 새로 만들어 드릴 겁니다!
// 일단 이 import 라인을 추가해 두세요.
import { NEW_STUDENT_DATA } from '../../data/uploadStudents.js';

function AdminPage() {
  const [studentData, setStudentData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // 3. ⭐️ 업로드용 로딩 state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const navigate = useNavigate();

  // DB에서 데이터 불러오기 (동일)
  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true); 
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentsList = querySnapshot.docs.map(doc => doc.data());
        setStudentData(studentsList); 
      } catch (error) {
        console.error("Error fetching student data: ", error);
        alert("학생 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false); 
      }
    };
    fetchStudentData();
  }, []); 

  // 점수 변경 핸들러 (동일)
  const handleScoreChange = (studentId, gameId, newScore) => {
    setStudentData((prevData) => 
      prevData.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            scores: {
              ...student.scores,
              [gameId]: newScore,
            },
          };
        }
        return student;
      })
    );
  };

  // DB에 저장하기 (동일)
  const handleSave = async () => {
    if (isSaving) return; 
    if (!window.confirm('현재 변경된 내용을 전체 DB에 저장하시겠습니까?')) {
      return;
    }
    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      studentData.forEach((student) => {
        const docRef = doc(db, 'students', student.id); 
        batch.set(docRef, student); 
      });
      await batch.commit();
      alert('성공! 모든 학생 점수가 DB에 저장되었습니다.');
      navigate('/'); 
    } catch (error) {
      console.error("Error saving student data: ", error);
      alert(`저장 실패: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 로그아웃 (동일)
  const handleLogout = async () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    try {
      await signOut(auth); 
      navigate('/login'); 
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };


  // 4. ⭐️ 새 학생 명단 DB에 업로드하는 임시 함수 ⭐️
  const handleUploadNewStudents = async () => {
    if (isUploading) return;
    if (!NEW_STUDENT_DATA || NEW_STUDENT_DATA.length === 0) {
      alert("업로드할 학생 데이터가 없습니다. (uploadStudents.js 확인)");
      return;
    }

    if (!window.confirm(`정말로 ${NEW_STUDENT_DATA.length}명의 학생 데이터를 DB에 업로드하시겠습니까? 기존 'students' 컬렉션의 데이터는 모두 덮어쓰기 됩니다!`)) {
      return;
    }

    setIsUploading(true);
    console.log('Firestore 신규 학생 업로드를 시작합니다...');

    try {
      const batch = writeBatch(db);

      NEW_STUDENT_DATA.forEach((student) => {
        const docRef = doc(db, 'students', student.id);
        batch.set(docRef, student);
      });

      await batch.commit();

      alert(`성공! ${NEW_STUDENT_DATA.length}명의 학생 데이터가 Firestore에 업로드되었습니다.`);
      // 데이터를 업로드했으니, 화면의 state도 새로고침합니다.
      setStudentData(NEW_STUDENT_DATA);

    } catch (error) {
      console.error("Firestore 업로드 중 오류 발생:", error);
      alert(`업로드 실패: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const filteredStudents = studentData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const selectedStudent = studentData.find(s => s.id === selectedStudentId);

  // 로딩 UI (동일)
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>학생 데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>관리자 페이지: 학생 점수 수정</h1>

        <div className={styles.headerButtons}>
          {/* 5. ⭐️ 임시 업로드 버튼 추가 ⭐️ */}
          <button 
            onClick={handleUploadNewStudents} 
            className={styles.uploadButton}
            disabled={isUploading}
          >
            {isUploading ? '업로드 중...' : '!! 학생 DB 덮어쓰기 !!'}
          </button>

          <button 
            onClick={handleSave} 
            className={styles.saveButton}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '전체 저장하기'}
          </button>

          <button 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className={styles.container}>
         {/* ... (main 내용 동일) ... */}
        <div className={styles.studentListSection}>
          <h2>학생 목록</h2>
          <input
            type="text"
            placeholder="학생 이름으로 검색..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className={styles.studentList}>
            {filteredStudents.map((student) => (
              <li 
                key={student.id} 
                className={styles.studentListItem}
                onClick={() => setSelectedStudentId(student.id)} 
              >
                <img src={student.profileImage} alt={student.name} />
                <span>{student.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <StudentScoreEditor 
        student={selectedStudent}
        onScoreChange={handleScoreChange}
        onClose={() => setSelectedStudentId(null)} 
      />
    </div>
  );
}

export default AdminPage;