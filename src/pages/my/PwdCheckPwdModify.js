// src/pages/PasswordCheckPage.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../../assets/styles/My.css'; // 스타일 적용
import '../../assets/styles/General.css'; // 스타일 적용
import axios from 'axios';

function PwdCheckPwdModify() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 로그인 상태 체크 (localStorage에서 토큰 확인)
  const token = localStorage.getItem('token');

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    alert('로그인 후 이용해 주세요.');
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = async () => {
    try {
      // 비밀번호와 로그인 ID를 서버에 전송하여 인증 요청
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + 'my/pwd-check', // 백엔드 URL
        { 
          password    // 비밀번호
        }, 
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate('/my/pwd-modify'); // 비밀번호 확인 후 다음 페이지로 이동
      }
    } catch (error) {
      console.error(error);
      setError('비밀번호가 올바르지 않습니다. 다시 시도해주세요.'); // 오류 메시지 설정
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="my-form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
      비밀번호 변경 - 비밀번호 확인
      </Typography>
      <Box className="my-form-row">
        <Typography variant="body1" className="general-form-label">비밀번호</Typography>
        <TextField
          label="비밀번호를 입력해 주세요"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="general-form-input"
          error={!!error} // error 상태에 따라 필드에 오류 표시
          helperText={error} // 오류 메시지를 helperText로 표시
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      </Box>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        className="button-general"
        onClick={handlePasswordCheck} // 비밀번호 확인 버튼 클릭 시 호출
      >
        비밀번호 변경하기
      </Button>
    </Box>
  );
}

export default PwdCheckPwdModify;
