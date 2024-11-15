// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components : 헤더, 푸터, 마이페이지네비게이션
import Header from './components/Header';
import Footer from './components/Footer';
import MyPageLayout from './components/MyPageLayout';

// pages
//member : 로그인 전반
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import IdSearch from './pages/member/IdSearch';
import PwdSearch from './pages/member/PwdSearch';
import PwdModify from './pages/member/PwdModify';

//group : 모임
import Main from './pages/group/Main';
import GroupDetail from './pages/group/Detail';
import GroupRegist from './pages/group/Regist';
import GroupModify from './pages/group/Modify';

//my : 마이페이지
import Group from './pages/my/Group';
import Review from './pages/my/Review';
import InfoModify from './pages/my/InfoModify';
//마이페이지 - 비밀번호 확인
import PwdCheckInfo from './pages/my/PwdCheckInfo';
import PwdCheckPwdModify from './pages/my/PwdCheckPwdModify';
import PwdModifyMy from './pages/my/PwdModify';
import Resign from './pages/my/Resign'; //탈퇴


//review리뷰
import ReviewMain from './pages/review/Main';
import ReviewDetail from './pages/review/Detail';
import ReviewRegist from './pages/review/Regist';
import ReviewWrite from './pages/review/WriteReview';

import ReviewModify from './pages/review/Modify';



import AxiosErrorHandler from './pages/error/AxiosErrorHandler';


function App() {
  return (
    <Router>
      <AxiosErrorHandler>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <main style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/group/detail/:reviewId" element={<GroupDetail/>}/> 
            <Route path="/group/regist" element={<GroupRegist/>}/> 
            <Route path="/group/modify" element={<GroupModify/>}/> 

            <Route path="/member/login" element={<Login />} />
            <Route path="/member/register" element={<Register />} />
            <Route path="/member/id-search" element={<IdSearch />} />
            <Route path="/member/pwd-search" element={<PwdSearch />} />
            <Route path="/member/pwd-modify" element={<PwdModify />} />

            {/* /my 경로 내에서 공통 레이아웃을 적용 */}
            <Route path="/my" element={<MyPageLayout />}>
              <Route path="group" element={<Group />} />
              <Route path="review" element={<Review />} />
              <Route path="pwd-check-info" element={<PwdCheckInfo />} />
              <Route path="pwd-check-pwdModify" element={<PwdCheckPwdModify />} />
              <Route path="info-modify" element={<InfoModify />} />
              <Route path="pwd-modify" element={<PwdModifyMy />} />
              <Route path="resign" element={<Resign />} />
            </Route>

            <Route path="/review/main" element={<ReviewMain />} />
            <Route path="/review/detail/:reviewId" element={<ReviewDetail />} />
            <Route path="/review/regist" element={<ReviewRegist />} />
            <Route path="/review/write" element={<ReviewWrite />} />
            <Route path="/review/modify" element={<ReviewModify />} />

          </Routes>
        </main>
        <Footer />
      </div>
      </AxiosErrorHandler>
    </Router>
  );
}

export default App;
