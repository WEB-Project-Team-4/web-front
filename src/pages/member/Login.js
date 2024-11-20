import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, TextField, Button, Typography, Link, Divider, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../../assets/styles/Member.css';
import '../../assets/styles/General.css'; // 스타일 적용

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  
  // 아이디와 비밀번호 상태 관리
  const [credentials, setCredentials] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post( process.env.REACT_APP_API_BASE_URL + 'member/login', {
        id: credentials.id,
        password: credentials.password,
      });

      if (response.status === 200) {
        const userData = response.data; // 서버에서 받은 데이터
        login(userData); // Context에 유저 정보 저장
        alert('로그인 성공');
        setTimeout(() => {
          // navigate('/'); // 페이지 이동
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/member/register';
  };

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
        name="id"
        value={credentials.id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        className="form-input"
      />

      <TextField
        variant="outlined"
        label="비밀번호를 입력해주세요"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        type={showPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
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
