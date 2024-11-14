// src/pages/PasswordCheckPage.js
import React, { useState } from 'react';
import { Box,Button, TextField,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/My.css'; // 스타일 적용
import '../../assets/styles/General.css'; // 스타일 적용

function PwdCheckPwdModify() {
  const navigate = useNavigate();

  // 비밀번호 상태 관리 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 비밀번호 입력 값 변경 처리
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 확인 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 비밀번호가 맞는지 확인하는 로직 (여기서는 예시로 간단한 조건만 사용)
    if (password === 'test') { // 예시: 'test'이 비밀번호라고 가정
      navigate('/my/pwd-modify'); // 비밀번호가 맞으면 회원정보 수정 페이지로 이동
    } else {
      setError('비밀번호가 틀렸습니다. 다시 시도해주세요.');
    }
  };

  return (
    
    <Box className="my-form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
        비밀번호 확인
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box className="my-form-row">
        <Typography variant="body1" className="general-form-label">비밀번호</Typography>
        <TextField
          label="비밀번호를 입력해 주세요"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
          className="general-form-input"
          error={!!error}
          helperText={error}
          />
          </Box>
        
        <Button type="submit" variant="contained" color="primary" className="button-general">
          확인
        </Button>
      </form>
    </Box>
  );
}

export default PwdCheckPwdModify;
