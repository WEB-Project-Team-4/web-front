import React from 'react';
import { Box, TextField, Button, Typography, Link, Divider } from '@mui/material';
import '../../assets/styles/Member.css';
import '../../assets/styles/General.css'; // 스타일 적용


function Login() {
  const handleRegisterRedirect = () => {
    window.location.href = '/member/register';
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
        type="password"
        fullWidth
        margin="normal"
        className="form-input"
      />

      <Box className="link-box">
        <Link href="/member/id-search" underline="hover" className="link-text">
          아이디 찾기
        </Link>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20 }} />

        <Link href="/member/pwd-search" underline="hover" className="link-text">
          비밀번호 찾기
        </Link>
      </Box>

      <Button variant="contained" color="primary" fullWidth className="button-general">
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
