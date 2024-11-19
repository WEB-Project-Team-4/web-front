import React, { useState,useContext  } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Link, Divider, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../../assets/styles/Member.css';
import '../../assets/styles/General.css'; // 스타일 적용

function Login() {
  // 비밀번호 보이기/숨기기 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      nickname: "user123",
      profileUrl: "https://example.com/profile.jpg",
      favCategoryName: "스터디",
      madeGroupNumber: 0
    };
    login(userData); // Context에 유저 정보 저장
    // console.log(userData);
    navigate("/"); // 프로필 페이지로 이동
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/member/register';
  };

  // 비밀번호 보이기/숨기기 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="form-container">
      <Typography variant="h4" component="h1" className="form-title">
        로그인
      </Typography>

      <TextField
        variant="outlined"
        label="아이디를 입력해주세요"
        fullWidth
        margin="normal"
        className="form-input"
      />

      <TextField
        variant="outlined"
        label="비밀번호를 입력해주세요"
        type={showPassword ? "text" : "password"}  // 비밀번호 보이기/숨기기
        fullWidth
        margin="normal"
        className="form-input"
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
              sx={{
                marginRight: -40
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>

          ),
        }}
      />

      <Box className="link-box">
        <Link href="/member/id-search" underline="hover" className="link-text">
          아이디 찾기
        </Link>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20 }} />

        <Link href="/member/pwd-search" underline="hover" className="link-text">
          비밀번호 변경
        </Link>
      </Box>

      <Button variant="contained" color="primary" fullWidth className="button-general" onClick={handleLogin}>
        로그인
      </Button>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className="button-general2"
        onClick={handleRegisterRedirect}
      >
        회원가입
      </Button>
    </Box>
  );
}

export default Login;
