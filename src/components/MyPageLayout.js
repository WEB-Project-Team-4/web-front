// src/components/MyPageLayout.js
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Button, Divider } from "@mui/material";
import "../assets/styles/My.css"; // My.css 파일 임포트

import profile from "../img/Logo.png"; // 상대 경로로 이미지 불러오기 -> 나중에 DB에서 가져오기로 수정필요

function MyPageLayout() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <div className="mypage-container">
      <div className="sidebar">
        {/* 프로필 정보 */}
        <div className="profile-section">
          <a href="/my/Group">
            {/* <img src={profile} alt="profile" className="profile-image" /> */}
            <Avatar
              alt="Profile"
              className="profile-image"
              // src={user?.profileUrl || "/path/to/default-avatar.png"} // user가 null이면 기본 아바타 사용
              // src={"/path/to/default-avatar.png"} // user가 null이면 기본 아바타 사용
              sx={{ marginLeft: 6 }}
            />
          </a>
          <div className="my-nickname"> {user.nickname}</div>
          {/* <div className='my-nickname'> 아이디 </div> */}
          <div className="my-info">
            <div className="my-info-item">
              <span className="my-info-label">관심 카테고리 :</span>
              <span className="my-info-value">#{user.favCategoryName}</span>
              {/* <span className="my-info-value">#스포츠</span> */}
            </div>
            <div className="my-info-item">
              <span className="my-info-label">만든 그룹 개수 :</span>
              <span className="my-info-value">{user.madeGroupNumber}개</span>
              {/* <span className="my-info-value">3개</span> */}
            </div>
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="nav-links">
          <Button
            onClick={() => navigate("/my/group")}
            className="nav-link-button"
            color="dark"
          >
            나의 모임
          </Button>
          <Divider className="id-navigation-divider" flexItem />
          <Button
            onClick={() => navigate("/my/review")}
            className="nav-link-button"
            color="dark"
          >
            내가 쓴 후기
          </Button>
          <Divider className="id-navigation-divider" flexItem />
          <Button
            onClick={() => navigate("/my/pwd-check-info")}
            className="nav-link-button"
            color="dark"
          >
            내 정보 수정
          </Button>
          <Divider className="id-navigation-divider" flexItem />
          <Button
            onClick={() => navigate("/my/pwd-check-pwdModify")}
            className="nav-link-button"
            color="dark"
          >
            비밀번호 변경
          </Button>
          <Divider className="id-navigation-divider" flexItem />
          <Button
            onClick={() => navigate("/my/resign")}
            className="nav-link-button"
            color="dark"
          >
            회원탈퇴
          </Button>
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
