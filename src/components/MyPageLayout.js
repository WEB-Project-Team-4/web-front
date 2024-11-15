// src/components/MyPageLayout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../assets/styles/My.css'; // My.css 파일 임포트

import profile from '../img/seeProfile.jpg'; // 상대 경로로 이미지 불러오기 -> 나중에 DB에서 가져오기로 수정필요

function MyPageLayout() {
  const navigate = useNavigate();

  return (
    <div className="mypage-container">
      <div className="sidebar">
        {/* 프로필 정보 */}
        <div className="profile-section">

        <a href="http://localhost:3000/my/Group">
          <img 
            src={profile} 
            alt="profile" 
            className="profile-image" 
          />
        </a>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>런닝킹 쥬쓰</div>
          <div>안녕하세요, 슥사대표 런닝킹 주쓰입니다.</div>
          <br></br>
          <br></br>
          <div>관심 카테고리 : #스터디</div>
          <div>만든 그룹 개수 : 3개</div>
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="nav-links">
          <Button onClick={() => navigate('/my/group')} className="nav-link-button">나의 모임</Button>
          <Button onClick={() => navigate('/my/review')} className="nav-link-button">내가 쓴 후기</Button>
          <Button onClick={() => navigate('/my/pwd-check-info')} className="nav-link-button">내 정보 수정</Button>
          <Button onClick={() => navigate('/my/pwd-check-pwdModify')} className="nav-link-button">비밀번호 변경</Button>
          <Button onClick={() => navigate('/my/resign')} className="nav-link-button">회원탈퇴</Button>
        </div>
      </div>

      {/* Outlet으로 그룹 페이지 내용 표시 */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MyPageLayout;
