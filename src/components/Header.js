import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar"; // Avatar 컴포넌트 추가
import { UserContext } from "../context/UserContext";
import Logo from "../img/Logo.png"; // 상대 경로로 이미지 불러오기
import { Box, Menu, MenuItem, Typography } from "@mui/material"; // Menu와 MenuItem 추가
import NotificationsIcon from "@mui/icons-material/Notifications"; // 알람 아이콘 추가

function Header() {
  const [anchorEl, setAnchorEl] = useState(null); // 메뉴 열기/닫기 상태 관리
  const [activeLink, setActiveLink] = useState(""); // 현재 활성화된 링크
  const { user, logout } = useContext(UserContext); // UserContext에서 user state를 가져옴

  useEffect(() => {
    // 현재 URL에 따라 기본 색상을 설정
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      setActiveLink("모임찾기");
    } else if (currentPath.startsWith("/review")) {
      setActiveLink("모임후기");
    } else if (currentPath.startsWith("/group/regist")) {
      setActiveLink("모임등록");
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 메뉴를 열 때 호출되는 함수
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 메뉴를 닫을 때 호출되는 함수
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 로그인 클릭 시 호출되는 함수
  const handleLoginClick = () => {
    window.location.href = "http://localhost:3000/member/login";
  };

  // 마이페이지 클릭 시 호출되는 함수
  const handleMyClick = () => {
    window.location.href = "http://localhost:3000/my/Group";
  };

  // 로그아웃 처리
  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    localStorage.removeItem("token");
    setAnchorEl(null); // 메뉴 닫기
    window.location.href = "/"; // 메인 페이지로 이동
  };

  // 로고 클릭 시 메인 페이지로 이동
  const handleLogoClick = () => {
    window.location.href = "http://localhost:3000/";
  };

  // 각 항목 클릭 시 해당 페이지로 이동
  const handleNavigation = (page) => {
    if (page === "모임찾기") {
      window.location.href = "http://localhost:3000/";
    } else if (page === "모임후기") {
      window.location.href = "http://localhost:3000/review/main";
    } else if (page === "모임등록") {
      window.location.href = "http://localhost:3000/group/regist";
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "none",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Toolbar>
        {/* 로고 이미지 클릭 시 메인 페이지로 이동 */}
        <img
          src={Logo}
          alt="Logo"
          style={{ height: 60, cursor: "pointer" }}
          onClick={handleLogoClick}
        />

        {/* 오른쪽 정렬을 위한 Box */}
        <Box sx={{ flexGrow: 1 }} />

        {/* '모임찾기', '모임후기', '모임등록' 글자 추가 */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          {["모임찾기", "모임후기", "모임등록"].map((text, index) => (
            <Typography
              key={index}
              variant="h7"
              sx={{
                marginRight: index < 2 ? 3 : 1, // 마지막 항목은 marginRight 제거
                cursor: "pointer",
                color: activeLink === text ? "#7F86EC" : "black", // active link URL의 경우에는 해당 글씨의 색상 변경
                transition: "all 0.3s ease", // 부드러운 전환 효과
                "&:hover": {
                  background: "#7F86EC",
                  color: "white", // 글씨 색상 변경
                  borderRadius: "5px", // 모서리 둥글게
                  padding: "5px 10px", // 약간의 여백 추가
                },
              }}
              onClick={() => handleNavigation(text)} // 클릭 시 해당 페이지로 이동
            >
              {text}
            </Typography>
          ))}
        </Box>

        {/* 알람 아이콘 */}
        {/* <IconButton color="inherit" sx={{ color: "black" }}>
          <NotificationsIcon />
        </IconButton> */}

        {/* 사람 프로필 아이콘 */}
        <Avatar
          alt="Profile"
          src={user?.profileUrl || "/path/to/default-avatar.png"} // user가 null이면 기본 아바타 사용
          sx={{ width: 30, height: 30, marginLeft: 3 }}
          onClick={handleMenuOpen}
        />

        {/* 드롭다운 메뉴 */}
        <Menu
          anchorEl={anchorEl} // 메뉴를 열 때 사용할 앵커 엘리먼트
          open={Boolean(anchorEl)} // 메뉴 열기 여부
          onClose={handleMenuClose} // 메뉴 닫기
        >
          {localStorage.getItem("token") ? (
            <>
              <MenuItem onClick={handleMyClick}>마이페이지</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLoginClick}>로그인</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
