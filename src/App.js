import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // react-router-dom에서 필요한 컴포넌트 가져오기
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/member/Login'; // Login 컴포넌트 가져오기
import Register from './pages/member/Register';
import IdSearch from './pages/member/IdSearch';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<h1>Welcome to My Website</h1>} /> {/* 기본 페이지 */}
            <Route path="/member/login" element={<Login />} /> {/* 로그인 페이지 */}
            <Route path="/member/register" element={<Register />} /> {/* 회원가입 페이지 */}
            <Route path="/member/id-search" element={<IdSearch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
